import React from "react";

import { PostResponse } from "../../../global/models/post-models";
import PostListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  posts: PostResponse[];
  groupName: string;
  openPost: (postId: number) => void;
}

const PostList: React.FC<Props> = ({groupName, openPost, ...props}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {props.posts.map((post, i) => (
          <PostListItem key={i} groupName={groupName} post={post} openPost={openPost} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
