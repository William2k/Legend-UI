import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { FullPost } from "../../../global/models/post-models";
import { getCurrentPageSelector } from "../../../store/page/selector";
import styles from "./pane.module.scss";
import {
  getCurrentUserSelector,
  getUserSubsSelector
} from "../../../store/currentUser/selectors";
import { currentUserActions } from "../../../store/currentUser/actions";

const PostPane: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const userSubs = useSelector(getUserSubsSelector);
  const post = useSelector(getCurrentPageSelector).obj as FullPost;
  const [subbed, setSubbed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubbed(userSubs.posts.hasOwnProperty(post.id));
  }, [userSubs.posts]);

  const handleJoinClick = async () => {
    try {
      await (subbed
        ? Axios.delete(`post/${post.id}/unsubscribe`, {
            params: { group: post.groupName }
          })
        : Axios.post(`post/${post.id}/subscribe`, null, {
            params: { group: post.groupName }
          }));

      dispatch(currentUserActions.getSubscribedPosts());
    } catch (error) {
      alert("Failed to join");
    }
  };

  return (
    <div>
      <h2>{post.name}</h2>

      <table className={styles.info}>
        <thead>
          <tr>
            <th>Subscribers</th>
            <th>Comments</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{post.subscriberCount}</td>
            <td>{post.commentsCount}</td>
            <td>{new Date(post.dateCreated).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>

      {post && currentUser.isLoggedIn && (
        <div>
          <button className="btn btn-info w-100" onClick={handleJoinClick}>
            {subbed ? "Joined" : "Join"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPane;
