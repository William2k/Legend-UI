import { useState, useEffect } from "react";
import Axios, { AxiosResponse } from "axios";
import throttle from "lodash.throttle";
import { useSelector } from "react-redux";

import {
  CommentResponse,
  CommentPagination,
  AddComment
} from "../../../../global/models/comment-models";
import { PostResponse } from "../../../../global/models/post-models";
import { getUserSelector } from "../../../../store/currentUser/selectors";
import { NotificationType } from "../../../_Shared/notifications/types";
import useNotification from "../../../_Shared/notifications";
import { SortType } from "../../../../global/enums";

const useCommentApi = (
  postId: number,
  scrollElem: HTMLElement = document.documentElement,
  contentElem: HTMLElement = document.documentElement,
  initialise = true,
  useScrollLoad = false
) => {
  const user = useSelector(getUserSelector);
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);
  const { notify } = useNotification();

  const [pagination, setPagination] = useState({
    post: postId,
    limit: 4,
    lastDateCreated: new Date(),
    lastLikes: 0,
    initial: true,
    maxLevel: 4,
    asc: false,
    sortType: SortType.Likes
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

  const changeSorting = (
    sortType = pagination.sortType,
    asc = pagination.asc,
    refetch = false
  ) => {
    if (pagination.sortType === sortType && pagination.asc === asc) {
      pagination.asc = !asc;
    } else {
      pagination.asc = asc;
    }

    pagination.initial = true;
    pagination.sortType = sortType;

    setPagination({ ...pagination });

    if (refetch || !allCommentsLoaded) {
      setComments([]);
      setAllCommentsLoaded(false);
      fetchComments();
    } else {
      sortComments();
    }
  };

  const sortComments = () => {
    let sortFunc;

    switch (pagination.sortType) {
      case SortType.Date:
        sortFunc = (a: CommentResponse, b: CommentResponse) => {
          const aDate = new Date(a.dateCreated).valueOf();
          const bDate = new Date(b.dateCreated).valueOf();

          return pagination.asc ? aDate - bDate : bDate - aDate;
        };
        break;
      case SortType.Likes:
        sortFunc = (a: CommentResponse, b: CommentResponse) => {
          return pagination.asc ? a.likes - b.likes : b.likes - a.likes;
        };
        break;
      default:
        return;
    }

    const sortedComments = [...comments].sort(sortFunc);

    setComments(sortedComments);
  };

  const scrollLoadComments = () => {
    let allLoaded = false;
    setAllCommentsLoaded(current => {
      allLoaded = current;
      return current;
    });

    if (
      !allLoaded &&
      window.innerHeight + scrollElem.scrollTop > contentElem.clientHeight * 0.6
    ) {
      fetchComments();
    }
  };

  useEffect(() => {
    if (!initialise || !useScrollLoad || !scrollElem) {
      return;
    }

    scrollElem.onscroll = throttle(scrollLoadComments, 1000, {
      trailing: false
    });
  }, [scrollElem, initialise, useScrollLoad]);

  useEffect(() => {
    if (!initialise) {
      return;
    }
    fetchComments();

    fetchPost();
  }, [postId, initialise]);

  const fetchPost = async () => {
    const response = (await Axios.get(`post/${postId}`)) as AxiosResponse<
      PostResponse
    >;

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

    try {
      setFetchingComments(true);
      const response = (await Axios.get(`comment`, {
        params: pagination
      })) as AxiosResponse<CommentResponse[]>;

      setComments(stateComments => [...stateComments, ...response.data]);

      if (!response.data.length) {
        setAllCommentsLoaded(true);
        return;
      }

      pagination.initial = false;

      const commentDates = response.data.map(comment => comment.dateCreated);
      const commentLikes = response.data.map(comment => comment.likes);

      pagination.lastDateCreated = new Date(commentDates.sort()[0]);
      pagination.lastLikes = commentLikes.sort()[
        pagination.asc ? commentLikes.length - 1 : 0
      ];

      setPagination(pagination);

      generateFlattenedComments(response.data);

      if (useScrollLoad) {
        scrollLoadComments();
      } else {
        setFetchingComments(false);
        fetchComments();
      }
    } catch (error) {
      notify(
        "Error loading",
        "Failed to load comments",
        NotificationType.Danger
      );
    } finally {
      setFetchingComments(false);
    }
  };

  const getChildComments = async (
    parent: number,
    maxLevel: number = pagination.maxLevel,
    asc: boolean = !pagination.asc
  ) => {
    try {
      setFetchingComments(true);
      const response = (await Axios.get(`comment/${parent}`, {
        params: { maxLevel, asc }
      })) as AxiosResponse<CommentResponse>;

      addChildComments(response.data);
    } catch (error) {
      notify(
        "Error loading",
        "Failed to load comments",
        NotificationType.Danger
      );
    } finally {
      setFetchingComments(false);
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

    flattenComments(newComments, newArr); // Should look to sorting these so binary search can be used instead of using "find"
    setFlatComments(flat => [...flat, ...newArr]);
  };

  const addToComments = (id: number, addComment: AddComment) => {
    const comment = {
      id,
      content: addComment.content,
      isActive: true,
      dateCreated: new Date().toISOString(),
      likes: 0,
      liked: null,
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

  const updateApiPost = (post: PostResponse) => {
    setPost({ ...post });
  };

  const updateComments = (comment: CommentResponse) => {
    const currentComment = flatComments.find(c => c.id === comment.id);

    if (!currentComment) {
      return;
    }

    currentComment.likes = comment.likes;

    setComments([...comments]);
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
    showMessageBox,
    updateApiPost,
    updateComments,
    pagination,
    changeSorting
  };
};

export default useCommentApi;
