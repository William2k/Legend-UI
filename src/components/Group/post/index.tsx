import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Axios, { AxiosResponse } from "axios";

import styles from "./index.module.scss";
import {
  CommentResponse,
  CommentPagination,
  AddComment
} from "../../../global/models/comment-models";
import { CurrentPage, PageEnum } from "../../../store/page/types";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../../../store/page/actions";
import { PostResponse } from "../../../global/models/post-models";
import CommentList from "./Comment/List";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";

interface MatchParams {
  postId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Post: React.FC<Props> = props => {
  const postId = Number(props.match.params.postId);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

  const [pagination, setPagination] = useState({
    post: postId,
    limit: 10,
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
  const [comment, setComment] = useState("");
  const [fetchingComments, setFetchingComments] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(true);

  useEffect(() => {
    Axios.get(`post/${postId}`).then(
      (response: AxiosResponse<PostResponse>) => {
        const currentPage = {
          page: PageEnum.Post,
          obj: response.data
        } as CurrentPage;
        dispatch(pageActions.setCurrentPage(currentPage));

        setPost(response.data);
      }
    );

    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setFetchingComments(true);

    const response = (await Axios.get(`comment`, {
      params: pagination
    })) as AxiosResponse<CommentResponse[]>;

    setComments(response.data);
    setFetchingComments(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.MouseEvent) => {
    const addComment = {
      content: comment,
      postId,
      parentCommentId: 0
    } as AddComment;

    postComment(addComment);
  };

  const handleAddComment = (comment: AddComment) => {
    comment.postId = postId;

    postComment(comment);
  }

  const postComment = async (comment: AddComment) => {
    try {
      await Axios.post("comment", comment);

      fetchComments();
      setComment("");
    } catch (error) {
      // show errow
      alert("Failed to save comment");
    }
  } 

  return (
    <div>
      <h1>{post.name}</h1>
      <p>{post.content}</p>
      {showMessageBox && currentUser.isLoggedIn && (
        <div className={styles.textBox}>
          <textarea
            className="w-100"
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="btn btn-light w-100" onClick={handleCommentSubmit}>
            {fetchingComments ? "Loading Comments" : "Submit"}
          </button>
        </div>
      )}
      <CommentList comments={comments} addComment={handleAddComment} />
    </div>
  );
};

export default Post;
