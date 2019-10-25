import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import styles from "./list-item.module.scss";

interface Props {
  post: PostResponse;
}

const PostListItem: React.FC<Props> = ({ post, ...props }) => {
  return (
    <li className={styles.item}>
      <h3 className="d-inline-block">{post.name}</h3>

      <div className="float-right">
        <div>Posts: {post.commentsCount}</div>
        <div>Subscribers: {post.subscriberCount}</div>
      </div>
    </li>
  );
};

export default PostListItem;
