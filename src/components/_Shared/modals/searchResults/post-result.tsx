import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { FullPost } from "../../../../global/models/post-models";

interface Props {
  post: FullPost;
}

const PostResult: React.FC<Props> = ({ post, ...props }) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(push(`/g/${post.groupName}/${post.id}`));
  };

  return <li onClick={open}> {post.name}</li>;
};

export default PostResult;
