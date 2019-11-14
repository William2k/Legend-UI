import React, { useRef, useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.scss";
import { AddComment } from "../../../global/models/comment-models";
import CommentList from "./Comment/List";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";
import useCommentApi from "./Comment/useCommentApi";
import PostPane from "./Pane";
import { FullPost } from "../../../global/models/post-models";

interface Props {
  postId: number;
  groupName: string;
}

const Post: React.FC<Props> = ({ postId, groupName, ...props }) => {
  const currentUser = useSelector(getCurrentUserSelector);
  const postContainer = useRef({} as HTMLDivElement);

  const elems = useMemo(() => {
    if (postContainer.current.closest) {
      const scrollElem = postContainer.current.closest(".modal") as HTMLElement;
      const contentElem = scrollElem.querySelector(
        ".modal-content"
      ) as HTMLElement;
      return { scrollElem, contentElem };
    }
  }, [postContainer.current]);

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
    elems && elems.contentElem,
    !!postContainer.current.closest
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
          />
        </div>
      </main>
      <article>
        <PostPane post={fullPost} />
      </article>
    </div>
  );
};

export default Post;
