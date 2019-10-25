import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import PostListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  posts: PostResponse[];
}

const PostList: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {props.posts.map((post, i) => (
          <PostListItem key={i} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
