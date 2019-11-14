import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentPageSelector } from "../../store/page/selector";
import { GroupResponse } from "../../global/models/group-models";
import AddPostModal from "../_Shared/modals/addPost";
import styles from "./pane.module.scss";
import {
  getCurrentUserSelector,
  getUserSubsSelector
} from "../../store/currentUser/selectors";
import Axios from "axios";
import { currentUserActions } from "../../store/currentUser/actions";
import useNotification from "../_Shared/notifications";
import { NotificationType } from "../_Shared/notifications/types";

const GroupPane: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const userSubs = useSelector(getUserSubsSelector);
  const group = useSelector(getCurrentPageSelector).obj as GroupResponse;
  const [subbed, setSubbed] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const dispatch = useDispatch();
  const {notify} = useNotification();

  useEffect(() => {
    setSubbed(userSubs.groups.includes(group.name));
  }, [userSubs.groups, group.name]);

  const toggleShowAddPost = () => {
    setShowAddPost(!showAddPost);
  };

  const openAddPost = () => setShowAddPost(true);
  const closeAddPost = () => setShowAddPost(false);

  const handleAddPostClick = (e: React.MouseEvent) => {
    setShowAddPost(true);
  };

  const handleJoinClick = async () => {
    try {
      await (subbed
        ? Axios.delete(`group/${group.name}/unsubscribe`)
        : Axios.post(`group/${group.name}/subscribe`));

      dispatch(currentUserActions.getSubscribedGroups());
    } catch (error) {
      notify("Group Error", "Failed to subscribe to group", NotificationType.Danger);
    }
  };

  return (
    <div>
      <h2>{group.name}</h2>

      <table className={styles.info}>
        <thead>
          <tr>
            <th>Subscribers</th>
            <th>Posts</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{group.subscriberCount}</td>
            <td>{group.postCount}</td>
            <td>{new Date(group.dateCreated).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>

      <div>
        {group.description}
      </div>

      {group && currentUser.isLoggedIn && (
        <>
          <AddPostModal
            group={group.name}
            openModal={openAddPost}
            closeModal={closeAddPost}
            toggle={toggleShowAddPost}
            showModal={showAddPost}
          />
          <button className="btn btn-info w-100" onClick={handleJoinClick}>
            {subbed ? "Joined" : "Join"}
          </button>
          <button className="btn btn-info w-100" onClick={handleAddPostClick}>
            Add Post
          </button>
        </>
      )}
    </div>
  );
};

export default GroupPane;
