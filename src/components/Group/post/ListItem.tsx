import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import styles from "./list-item.module.scss";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

interface Props {
  post: PostResponse;
  groupName: string;
}

const PostListItem: React.FC<Props> = ({ post, groupName, ...props }) => {
  const dispatch = useDispatch();

  const openPost = () => {
    dispatch(push(`${groupName}/${post.id}`));
  };

  return (
    <li className={styles.item} onClick={openPost}>
      <h3 className="d-inline-block">{post.name}</h3>

      <div className="float-right">
        <div>Comments: {post.commentsCount}</div>
        <div>Subscribers: {post.subscriberCount}</div>
      </div>
    </li>
  );
};

export default PostListItem;
