import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getCurrentPageSelector } from "../../store/page/selector";
import { GroupResponse } from "../../global/models/group-models";
import AddPostModal from "../_Shared/modals/addPost";
import styles from "./pane.module.scss";

const GroupPane: React.FC = () => {
  const group = useSelector(getCurrentPageSelector).obj as GroupResponse;
  const [showAddPost, setShowAddPost] = useState(false);

  const toggleShowAddPost = () => {
    setShowAddPost(!showAddPost);
  };

  const openAddPost = () => setShowAddPost(true);
  const closeAddPost = () => setShowAddPost(false);

  const handleAddPostClick = (e: React.MouseEvent) => {
    setShowAddPost(true);
  };

  return (
    <div>
      <h2>{group.name}</h2>

      <table className={styles.info}>
        <thead>
          <tr>
            <th>Subscriber Count</th>
            <th>Post Count</th>
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

      {group && (
        <React.Fragment>
          <AddPostModal
            group={group.name}
            openModal={openAddPost}
            closeModal={closeAddPost}
            toggle={toggleShowAddPost}
            showModal={showAddPost}
          />
          <button className="btn btn-info w-100" onClick={handleAddPostClick}>
            Add Post
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default GroupPane;
