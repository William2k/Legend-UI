import React from "react";

import { CommentResponse, AddComment } from "../../../../global/models/comment-models";
import CommentListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  comments: CommentResponse[];
  addComment: (comment: AddComment) => void;
  getChildComments: (parent: number, maxLevel?: number) => void;
}

const CommentList: React.FC<Props> = ({ comments, addComment, getChildComments, ...props }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {comments.map((comment, i) => (
          <CommentListItem key={i} comment={comment} addComment={addComment} getChildComments={getChildComments}/>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
