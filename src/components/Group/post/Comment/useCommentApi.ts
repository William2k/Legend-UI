import { useState, useEffect, useMemo } from "react";
import Axios, { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import {
  CommentResponse,
  CommentPagination,
  AddComment
} from "../../../../global/models/comment-models";
import { PostResponse, FullPost } from "../../../../global/models/post-models";
import { CurrentPage, PageEnum } from "../../../../store/page/types";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../../../store/page/actions";
import { getUserSelector } from "../../../../store/currentUser/selectors";
import { NotificationType } from "../../../_Shared/notifications/types";
import useNotification from "../../../_Shared/notifications";

const useCommentApi = (groupName: string, postId: number) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);
  const { notify } = useNotification();

  const [pagination, setPagination] = useState({
    post: postId,
    limit: 4,
    lastDateCreated: new Date(),
    initial: true,
    asc: false
  } as CommentPagination);

  const [post, setPost] = useState({
    id: 0,
    name: "",
    isActive: false,
    commentsCount: 0,
    subscriberCount: 0,
    commentsTodayCount: 0
  } as PostResponse);
  const [comments, setComments] = useState([] as CommentResponse[]);
  const [flatComments, setFlatComments] = useState([] as CommentResponse[]);
  const [commentText, setCommentText] = useState("");
  const [fetchingComments, setFetchingComments] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(true);

  useEffect(() => {
    window.onscroll = debounce(scrollLoadComments, 1000);
  }, []);

  const scrollLoadComments = () => {
    if (
      !allCommentsLoaded &&
      window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight * 0.8
    ) {
      fetchComments();
    }
  };

  useEffect(() => {
    fetchComments();

    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const response = (await Axios.get(`post/${postId}`)) as AxiosResponse<
      PostResponse
    >;

    const currentPage = {
      page: PageEnum.Post,
      obj: { ...response.data, groupName } as FullPost
    } as CurrentPage;
    dispatch(pageActions.setCurrentPage(currentPage));

    setPost(response.data);
  };

  const fetchComments = async () => {
    let fetching = false;

    setFetchingComments(current => {
      fetching = current;
      return current;
    });

    if (fetching) {
      return;
    }

    setFetchingComments(true);

    const response = (await Axios.get(`comment`, {
      params: pagination
    })) as AxiosResponse<CommentResponse[]>;

    setComments(stateComments => [...stateComments, ...response.data]);
    setFetchingComments(false);

    if (!response.data.length) {
      setAllCommentsLoaded(true);
      return;
    }

    pagination.initial = false;

    pagination.lastDateCreated = new Date(
      response.data.map(comment => comment.dateCreated).sort()[0]
    );

    setPagination(pagination);
    scrollLoadComments();

    generateFlattenedComments(response.data);
  };

  const postComment = async (comment: AddComment) => {
    try {
      const response = (await Axios.post("comment", comment)) as AxiosResponse<
        number
      >;

      addToComments(response.data, comment);

      fetchComments();
      fetchPost();
      setCommentText("");
    } catch (error) {
      notify("Error saving", "Failed to save comment", NotificationType.Danger);
    }
  };

  const flattenComments = (
    currentComments: CommentResponse[],
    arr: CommentResponse[]
  ) => {
    for (const comment of currentComments) {
      arr.push(comment);
      flattenComments(comment.comments, arr);
    }
  };

  const generateFlattenedComments = (
    newComments: CommentResponse[] = comments
  ) => {
    const newArr = [] as CommentResponse[];

    flattenComments(newComments, newArr);

    setFlatComments(flat => [...flat, ...newArr]);
  };

  const addToComments = (id: number, addComment: AddComment) => {
    const comment = {
      id,
      content: addComment.content,
      isActive: true,
      dateCreated: new Date().toISOString(),
      creator: user.username,
      dateModified: "",
      comments: []
    } as CommentResponse;

    if (!addComment.parentCommentId) {
      setComments([comment, ...comments]);
      flatComments.push(comment);
      return;
    }

    const parentComment = flatComments.find(
      com => com.id === addComment.parentCommentId
    );

    if (parentComment) {
      parentComment.comments.unshift(comment);
      flatComments.push(comment);
      return;
    }

    notify(
      "Error loading",
      "Error loading comments, refresh the page",
      NotificationType.Danger
    );
  };

  return {
    post,
    setCommentText,
    setComments,
    commentText,
    comments,
    postComment,
    fetchingComments,
    showMessageBox
  };
};

export default useCommentApi;