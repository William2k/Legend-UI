import React, { useEffect, useState } from "react";
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

interface Props {
  postId: number;
  groupName: string;
  showPost: boolean;
  toggleShowPost: () => void;
}

const PostModal = styled(Modal)`
  max-width: 90%;

  .modal-content {
    padding: 10px;
    border-radius: 15px;
    background-color: ${backgroundColours.blue};
  }
`;

const Post: React.FC<Props> = ({
  postId,
  groupName,
  showPost,
  toggleShowPost,
  ...props
}) => {
  const currentUser = useSelector(getCurrentUserSelector);

  const [elems, setElems] = useState({
    scrollElem: {} as HTMLElement,
    contentElem: {} as HTMLElement
  });

  useEffect(() => {
    setTimeout(() => updateElems(), 1);
  }, []);

  const updateElems = () => {
    const scrollElem = document.querySelector(".modal") as HTMLElement;

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
    fetchingComments
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

  return (
    <PostModal isOpen={showPost} toggle={toggleShowPost}>
      <ModalHeader toggle={toggleShowPost}>{post.content}</ModalHeader>
      <ModalBody>
        <div className={styles.postContainer}>
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
              />
            </div>
          </main>
          <article>
            <PostPane post={fullPost} />
          </article>
        </div>
      </ModalBody>
    </PostModal>
  );
};

export default Post;
