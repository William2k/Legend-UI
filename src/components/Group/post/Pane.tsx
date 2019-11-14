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
import useNotification from "../../_Shared/notifications";
import { NotificationType } from "../../_Shared/notifications/types";

interface Props {
  post: FullPost;
}

const PostPane: React.FC<Props> = ({ post, ...props }) => {
  const currentUser = useSelector(getCurrentUserSelector);
  const userSubs = useSelector(getUserSubsSelector);
  const { notify } = useNotification();
  const [subbed, setSubbed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubbed(userSubs.posts.hasOwnProperty(post.id));
  }, [userSubs.posts, post.id]);

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
      notify("Post Error", "Failed to follow post", NotificationType.Danger);
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
            {subbed ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPane;
