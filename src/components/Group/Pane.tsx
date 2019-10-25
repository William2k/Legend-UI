import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getCurrentPageSelector } from "../../store/page/selector";
import { GroupResponse } from "../../global/models/group-models";
import AddPostModal from "../_Shared/modals/addPost";

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
      {group && (
        <React.Fragment>
          <AddPostModal
            group={group.name}
            openModal={openAddPost}
            closeModal={closeAddPost}
            toggle={toggleShowAddPost}
            showModal={showAddPost}
          />
          <button className="btn btn-info" onClick={handleAddPostClick}>
            Add Post
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default GroupPane;
