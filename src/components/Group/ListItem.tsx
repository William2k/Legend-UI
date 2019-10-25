import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { GroupResponse } from "../../global/models/group-models";
import styles from "./list-item.module.scss";

interface Props {
  group: GroupResponse;
}

const GroupListItem: React.FC<Props> = ({ group, ...props }) => {
  const dispatch = useDispatch();

  const openGroup = () => {
    dispatch(push(`/g/${group.name}`));
  };

  return (
    <li className={styles.item} onClick={openGroup}>
      <h3 className="d-inline-block">{group.name}</h3>

      <div className="float-right">
        <div>Posts: {group.postCount}</div>
        <div>Subscribers: {group.subscriberCount}</div>
      </div>
    </li>
  );
};

export default GroupListItem;
