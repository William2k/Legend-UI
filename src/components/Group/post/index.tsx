import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";
import { AddComment } from "../../../global/models/comment-models";
import CommentList from "./Comment/List";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";
import useCommentApi from "./Comment/useCommentApi";
import PostPane from "./Pane";
import { FullPost } from "../../../global/models/post-models";
import styled from "styled-components";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { backgroundColours } from "../../../global/colours";
import Likes from "../../_Shared/components/Likes";
import Axios, { AxiosResponse } from "axios";

interface Props {
  postId: number;
  groupName: string;
  showPost: boolean;
  toggleShowPost: () => void;
  updatePosts: (post: FullPost) => void;
}

const PostModal = styled(Modal)`
  margin-top: 50px;
  max-width: 90%;

  .modal-header {
    position: fixed;
    width: 100%;
    background-color: black;
    top: 0;
    left: 0;
    z-index: 1;
    padding-right: 35px;
    animation: customFadeIn 1s;
  }

  .modal-content {
    border-radius: 15px;
    background-color: ${backgroundColours.blue};
  }

  .close {
    color: bisque;
  }

  @keyframes customFadeIn {
    0% {
      opacity: 0;
    }
    60% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Post: React.FC<Props> = ({
  postId,
  groupName,
  showPost,
  toggleShowPost,
  updatePosts,
  ...props
}) => {
  const currentUser = useSelector(getCurrentUserSelector);
  const postContainer = useRef({} as HTMLDivElement);
  const [elems, setElems] = useState({
    scrollElem: {} as HTMLElement,
    contentElem: {} as HTMLElement
  });

  useEffect(() => {
    updateElems();
  }, [postContainer.current]);

  const updateElems = () => {
    if (!postContainer.current.closest) {
      return;
    }

    const scrollElem = postContainer.current.closest(".modal") as HTMLElement;

    if (!scrollElem) {
      return;
    }

    const contentElem = scrollElem.querySelector(
      ".modal-content"
    ) as HTMLElement;

    setElems({ scrollElem, contentElem });
  };

  const {
    postComment,
    getChildComments,
    setCommentText,
    commentText,
    comments,
    post,
    showMessageBox,
    fetchingComments,
    updateApiPost,
    updateComments
  } = useCommentApi(
    postId,
    elems && elems.scrollElem,
    elems && elems.contentElem
  );

  const fullPost = { ...post, groupName } as FullPost;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e: React.MouseEvent) => {
    const addComment = {
      content: commentText,
      postId,
      parentCommentId: 0
    } as AddComment;

    postComment(addComment);
  };

  const handleAddComment = (comment: AddComment) => {
    comment.postId = postId;

    postComment(comment);
  };

  const updatePostData = (post: FullPost) => {
    updateApiPost({ ...post });
    updatePosts(post);
  };

  const handleLikeIncreaseClick = () => postLiked(true);
  const handleLikeDecreaseClick = () => postLiked(false);

  const postLiked = async (liked: boolean) => {
    const response = (await Axios.post(`post/${post.id}/likes`, null, {
      params: { liked }
    })) as AxiosResponse<number>;

    post.likes = response.data;
    post.liked = liked;
    updatePosts({ ...post, groupName });
  };

  const handleRemoveLikeClick = async () => {
    const response = (await Axios.delete(
      `post/${post.id}/likes`
    )) as AxiosResponse<number>;

    post.likes = response.data;
    post.liked = null;
    updatePosts({ ...post, groupName });
  };

  return (
    <PostModal isOpen={showPost} toggle={toggleShowPost}>
      <ModalHeader toggle={toggleShowPost}>
        <Likes
          showLikeButtons={currentUser.isLoggedIn}
          liked={post.liked}
          likes={post.likes}
          increaseClick={handleLikeIncreaseClick}
          decreaseClick={handleLikeDecreaseClick}
          clickedAgain={handleRemoveLikeClick}
        />{" "}
        {post.name}
      </ModalHeader>
      <ModalBody>
        <div className={styles.postContainer} ref={postContainer}>
          <main>
            <h1>{post.name}</h1>
            <p>{post.content}</p>
            {showMessageBox && currentUser.isLoggedIn && (
              <div className={styles.textBox}>
                <textarea
                  className="w-100"
                  value={commentText}
                  onChange={handleCommentChange}
                />
                <button
                  className="btn btn-light w-100"
                  onClick={handleCommentSubmit}
                >
                  {fetchingComments ? "Loading Comments" : "Submit"}
                </button>
              </div>
            )}
            <div className={styles.commentsContainer}>
              <CommentList
                comments={comments}
                addComment={handleAddComment}
                getChildComments={getChildComments}
                updateComments={updateComments}
              />
            </div>
          </main>
          <article>
            <PostPane post={fullPost} updatePosts={updatePostData} />
          </article>
        </div>
      </ModalBody>
    </PostModal>
  );
};

export default Post;
