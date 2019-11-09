import React from "react";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";
import {
  AddComment
} from "../../../global/models/comment-models";
import CommentList from "./Comment/List";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";
import useCommentApi from "./Comment/useCommentApi";
import useNotification from "../../_Shared/notifications";

interface MatchParams {
  groupName: string;
  postId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Post: React.FC<Props> = props => {
  const groupName = props.match.params.groupName;
  const postId = Number(props.match.params.postId);
  const currentUser = useSelector(getCurrentUserSelector);
  const { postComment, getChildComments, setCommentText, commentText, comments, post, showMessageBox, fetchingComments } = useCommentApi(groupName, postId);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e: React.MouseEvent) => {
    const addComment = {
      content: commentText,
      postId,
      parentCommentId: 0
    } as AddComment;

    postComment(addComment);
  };

  const handleAddComment = (comment: AddComment) => {
    comment.postId = postId;

    postComment(comment);
  };

  return (
    <div>
      <h1>{post.name}</h1>
      <p>{post.content}</p>
      {showMessageBox && currentUser.isLoggedIn && (
        <div className={styles.textBox}>
          <textarea
            className="w-100"
            value={commentText}
            onChange={handleCommentChange}
          />
          <button className="btn btn-light w-100" onClick={handleCommentSubmit}>
            {fetchingComments ? "Loading Comments" : "Submit"}
          </button>
        </div>
      )}
      <CommentList comments={comments} addComment={handleAddComment} getChildComments={getChildComments} />
    </div>
  );
};

export default Post;
