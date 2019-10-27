import React from "react";

import { CommentResponse, AddComment } from "../../../../global/models/comment-models";
import CommentListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  comments: CommentResponse[];
  addComment: (comment: AddComment) => void;
}

const CommentList: React.FC<Props> = ({ comments, addComment, ...props }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {comments.map((comment, i) => (
          <CommentListItem key={i} comment={comment} addComment={addComment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
