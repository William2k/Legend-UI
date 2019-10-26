import React from "react";

import { CommentResponse } from "../../../../global/models/comment-models";
import CommentListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  comments: CommentResponse[];
}

const CommentList: React.FC<Props> = ({ comments, ...props }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {comments.map((comment, i) => (
          <CommentListItem key={i} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
