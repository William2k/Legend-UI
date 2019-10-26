import React from "react";

import { CommentResponse } from "../../../../global/models/comment-models";
import styles from "./list-item.module.scss";

interface Props {
  comment: CommentResponse;
}

const CommentListItem: React.FC<Props> = ({ comment, ...props }) => {
  return (
    <li className={styles.item}>
      <h6>{comment.creator}</h6>
      {comment.content}
      <div>{new Date(comment.dateCreated).toLocaleString()}</div>
    </li>
  );
};

export default CommentListItem;
