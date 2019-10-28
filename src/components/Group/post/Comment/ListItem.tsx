import React, { useState, useMemo } from "react";

import {
  CommentResponse,
  AddComment
} from "../../../../global/models/comment-models";
import styles from "./list-item.module.scss";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../../store/currentUser/selectors";
import { dateDiff } from "../../../../global/helpers";
import CommentList from "./List";

interface Props {
  comment: CommentResponse;
  addComment: (comment: AddComment) => void;
}

const CommentListItem: React.FC<Props> = ({
  comment,
  addComment,
  ...props
}) => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { ...dateCreated } = useMemo(
    () => dateDiff(new Date(comment.dateCreated)),
    [comment.dateCreated]
  );

  const currentUser = useSelector(getCurrentUserSelector);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e: React.MouseEvent) => {
    const newComment = {
      content: commentText,
      parentCommentId: comment.id
    } as AddComment;

    addComment(newComment);

    setShowMessageBox(false);
    setCommentText("");
  };

  const toggleShowMessageBox = () => {
    setShowMessageBox(!showMessageBox);
  };

  return (
    <li className={styles.item}>
      <div>
        <h6 className={styles.commentCreator}>{comment.creator}</h6>
        <sub>Posted </sub>
        {!!dateCreated.days && (
          <sub>
            {dateCreated.days} {dateCreated.days === 1 ? "day" : "days"} ago
          </sub>
        )}
        {!dateCreated.days && !!dateCreated.hours && (
          <sub>
            {dateCreated.hours} {dateCreated.hours === 1 ? "Hour" : "Hours"} ago
          </sub>
        )}
        {!dateCreated.days && !dateCreated.hours && !!dateCreated.minutes && (
          <sub>
            {dateCreated.minutes}{" "}
            {dateCreated.minutes === 1 ? "minute" : "minutes"} ago
          </sub>
        )}
        {!dateCreated.days && !dateCreated.hours && !dateCreated.minutes && (
          <sub> now</sub>
        )}
      </div>

      {comment.content}
      {currentUser.isLoggedIn && (
        <div>
          <button className="btn btn-dark" onClick={toggleShowMessageBox}>
            Reply
          </button>
        </div>
      )}

      {showMessageBox && (
        <div className={styles.textBox}>
          <textarea
            className="w-100"
            value={commentText}
            onChange={handleCommentChange}
          />
          <button className="btn btn-light w-100" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>
      )}
      <CommentList comments={comment.comments} addComment={addComment} />
    </li>
  );
};

export default CommentListItem;
