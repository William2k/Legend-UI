import React from "react";

import { CommentResponse } from "../../../../global/models/comment-models";
import CommentListItem from "./ListItem";

interface Props {
  comments: CommentResponse[];
}

const CommentList: React.FC<Props> = ({ comments, ...props }) => {
  return (
    <div>
      <ul>
        {comments.map((comment, i) => (
          <CommentListItem key={i} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
