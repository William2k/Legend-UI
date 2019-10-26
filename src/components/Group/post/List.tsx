import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import PostListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  posts: PostResponse[];
  groupName: string;
}

const PostList: React.FC<Props> = ({groupName, ...props}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {props.posts.map((post, i) => (
          <PostListItem key={i} groupName={groupName} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
