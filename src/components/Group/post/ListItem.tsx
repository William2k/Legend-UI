import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import styles from "./list-item.module.scss";

interface Props {
  post: PostResponse;
  groupName: string;
  openPost: (postId: number) => void; 
}

const PostListItem: React.FC<Props> = ({ post, groupName, openPost, ...props }) => {
  const handlePostClick = () => {
    openPost(post.id);
  };

  return (
    <li className={styles.item} onClick={handlePostClick}>
      <h3 className="d-inline-block">{post.name}</h3>

      <div className="float-right">
        <div>Comments: {post.commentsCount}</div>
        <div>Subscribers: {post.subscriberCount}</div>
      </div>
    </li>
  );
};

export default PostListItem;
