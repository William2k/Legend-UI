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
import { Likes } from "../../../_Shared/miniComponents";
import Axios, { AxiosResponse } from "axios";

interface Props {
  comment: CommentResponse;
  addComment: (comment: AddComment) => void;
  getChildComments: (parent: number, maxLevel?: number) => void;
  updateComments: (comment: CommentResponse) => void;
}

const CommentListItem: React.FC<Props> = ({
  comment,
  addComment,
  getChildComments,
  updateComments,
  ...props
}) => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [fetchingChildComments, setFetchingChildComments] = useState(false);
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

  const getPostDateLabel = () => {
    if (dateCreated.years) {
      return `${dateCreated.years} ${
        dateCreated.years === 1 ? "year" : "years"
      } ago`;
    } else if (dateCreated.months) {
      return `${dateCreated.months} ${
        dateCreated.months === 1 ? "month" : "months"
      } ago`;
    } else if (dateCreated.weeks) {
      return `${dateCreated.weeks} ${
        dateCreated.weeks === 1 ? "week" : "weeks"
      } ago`;
    } else if (dateCreated.days) {
      return `${dateCreated.days} ${
        dateCreated.days === 1 ? "day" : "days"
      } ago`;
    } else if (dateCreated.hours) {
      return `${dateCreated.hours} ${
        dateCreated.hours === 1 ? "hour" : "hours"
      } ago`;
    } else if (dateCreated.minutes) {
      return `${dateCreated.minutes} ${
        dateCreated.minutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "now";
    }
  };

  const handleShowComments = () => {
    if (fetchingChildComments) {
      return;
    }

    setFetchingChildComments(true);

    getChildComments(comment.id);
  };

  const handleLikeIncreaseClick = () => commentLiked(true);
  const handleLikeDecreaseClick = () => commentLiked(false);

  const handleRemoveLikeClick = async () => {
    const response = (await Axios.delete(
      `comment/${comment.id}/likes`
    )) as AxiosResponse<number>;

    comment.likes = response.data;
    comment.liked = null;
    updateComments(comment);
  };

  const commentLiked = async (liked: boolean) => {
    const response = (await Axios.post(`comment/${comment.id}/likes`, null, {
      params: { liked }
    })) as AxiosResponse<number>;

    comment.likes = response.data;
    comment.liked = liked;
    updateComments(comment);
  };

  return (
    <li className={styles.item}>
      <div className={styles.commentHeader}>
        <Likes
          liked={comment.liked}
          likes={comment.likes}
          increaseClick={handleLikeIncreaseClick}
          decreaseClick={handleLikeDecreaseClick}
          clickedAgain={handleRemoveLikeClick}
        />{" "}
        <h6 className={styles.commentCreator}>{comment.creator}</h6>
        <sub>Posted </sub>
        <sub> {getPostDateLabel()}</sub>
      </div>

      <div className={styles.commentContent}>{comment.content}</div>

      {currentUser.isLoggedIn && (
        <div className={styles.reply}>
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
      {comment.comments ? (
        <CommentList
          comments={comment.comments}
          addComment={addComment}
          getChildComments={getChildComments}
          updateComments={updateComments}
        />
      ) : (
        <div>
          <div className={styles.showComments} onClick={handleShowComments}>
            {fetchingChildComments
              ? "Loading more comments..."
              : "Show more comments"}
          </div>
        </div>
      )}
    </li>
  );
};

export default CommentListItem;
