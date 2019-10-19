import React, { useState } from "react";
import { useSelector } from "react-redux";

import AddGroupModal from "../_Shared/groups";
import { getCurrentUserSelector } from "../../store/currentUser/selectors";

const MainPane: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const toggleShowAddGroup = () => {
    setShowAddGroup(!showAddGroup);
  };

  const handleAddGroupClick = (e: React.MouseEvent) => {
    setShowAddGroup(true);
  };

  return (
    <React.Fragment>
      <h2>Home</h2>

      {currentUser.isLoggedIn && (
        <React.Fragment>
          <button
            className="btn-dark btn"
            type="button"
            onClick={handleAddGroupClick}
          >
            Create Group
          </button>
          <AddGroupModal toggle={toggleShowAddGroup} showModal={showAddGroup} />{" "}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MainPane;
