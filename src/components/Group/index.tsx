import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Modal } from "reactstrap";

import { GroupResponse } from "../../global/models/group-models";
import { PostResponse, PostPagination, FullPost } from "../../global/models/post-models";
import PostList from "./Post/List";
import { pageActions } from "../../store/page/actions";
import { CurrentPage, PageEnum } from "../../store/page/types";
import Post from "./Post";
import { getCurrentUserSelector } from "../../store/currentUser/selectors";
import { backgroundColours } from "../../global/colours";

interface MatchParams {
  groupName: string;
  postId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Group: React.FC<Props> = props => {
  const groupName = props.match.params.groupName;
  const [postId, setPostId] = useState(
    Number(props.match.params.postId) || undefined
  );

  const currentUser = useSelector(getCurrentUserSelector);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([] as PostResponse[]);
  const [pagination, setPagination] = useState({
    group: groupName,
    limit: 10,
    lastCount: 0,
    initial: true,
    asc: false
  } as PostPagination);

  const [group, setGroup] = useState({
    name: "",
    description: "",
    isActive: false,
    postCount: 0,
    dateCreated: "",
    subscriberCount: 0,
    tags: []
  } as GroupResponse);

  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    if (postId && currentUser.loginAttempts) {
      setShowPost(true);
    }
  }, [groupName, postId, currentUser.loginAttempts]);

  useEffect(() => {
    Axios.get(`group/${groupName}`).then(
      (response: AxiosResponse<GroupResponse>) => {
        const currentPage = {
          page: PageEnum.Group,
          obj: response.data,
          navText: `g/${groupName}`
        } as CurrentPage;
        dispatch(pageActions.setCurrentPage(currentPage));

        setGroup(response.data);
      }
    );

    Axios.get(`post`, {
      params: pagination
    }).then((response: AxiosResponse<PostResponse[]>) =>
      setPosts(response.data)
    );
  }, [groupName]);

  const openPost = (postId: number) => {
    setPostId(postId);
    setShowPost(true);
    window.history.pushState(null, "Post", `${groupName}/${postId}`);
  };

  const toggleShowPost = () => {
    if (showPost) {
      setPostId(undefined);
      window.history.pushState(null, "Group", `/g/${groupName}`);
    }

    setShowPost(!showPost);
  };

  const updatePosts = (post: FullPost) => {
    const currentPost = posts.find(p => p.id === post.id) as FullPost;
    
    currentPost.commentsCount = post.commentsCount;
    currentPost.commentsTodayCount = post.commentsTodayCount;
    currentPost.subscriberCount = post.subscriberCount;

    setPosts([...posts]);
  }

  return (
    <div>
      <div>
        <h1>{group.name}</h1>
        <p>{group.description}</p>
      </div>

      <PostList groupName={groupName} posts={posts} openPost={openPost} />

      {showPost && postId && (
        <Post
          postId={postId}
          groupName={groupName}
          updatePosts={updatePosts}
          showPost={showPost}
          toggleShowPost={toggleShowPost}
        />
      )}
    </div>
  );
};

export default Group;
