import React, { useState } from "react";
import { useSelector } from "react-redux";

import AddGroupModal from "../_Shared/modals/addGroup";
import { getCurrentUserSelector } from "../../store/currentUser/selectors";

const MainPane: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const toggleShowAddGroup = () => {
    setShowAddGroup(!showAddGroup);
  };

  const openAddGroup = () => setShowAddGroup(true);
  const closeAddGroup = () => setShowAddGroup(false);

  const handleAddGroupClick = (e: React.MouseEvent) => {
    setShowAddGroup(true);
  };

  return (
    <>
      <h2>Home</h2>

      {currentUser.isLoggedIn && (
        <>
          <button
            className="btn-dark btn"
            type="button"
            onClick={handleAddGroupClick}
          >
            Create Group
          </button>
          <AddGroupModal openModal={openAddGroup} closeModal={closeAddGroup} toggle={toggleShowAddGroup} showModal={showAddGroup} />{" "}
        </>
      )}
    </>
  );
};

export default MainPane;
