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
    maxLevel: 4,
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
    window.onscroll = debounce(scrollLoadComments, 1000); // debounce causing state value issues, need to use set methods to get current value
  }, []);

  const scrollLoadComments = () => {
    let allLoaded = false;
    setAllCommentsLoaded(current => {
      allLoaded = current;
      return current;
    });

    if (
      !allLoaded &&
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

  const getChildComments = async (
    parent: number,
    maxLevel: number = pagination.maxLevel
  ) => {
    try {
      const response = (await Axios.get(`comment/${parent}`, {
        params: { maxLevel }
      })) as AxiosResponse<CommentResponse>;

      addChildComments(response.data);
    } catch (error) {
      notify(
        "Error loading",
        "Failed to load comment",
        NotificationType.Danger
      );
    }
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

      comment.comments && flattenComments(comment.comments, arr);
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
      level: 0,
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

  const addChildComments = (parentComment: CommentResponse) => {
    const comment = flatComments.find(com => com.id === parentComment.id);

    if (comment) {
      comment.comments = parentComment.comments;
      generateFlattenedComments(comment.comments);
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
    getChildComments,
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
