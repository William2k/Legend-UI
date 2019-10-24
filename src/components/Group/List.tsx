import React from "react";

import { GroupResponse } from "../../global/models/group-models";
import GroupListItem from "./ListItem";
import styles from "./list.module.scss";

interface Props {
  groups: GroupResponse[];
}

const GroupList: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <ul className={styles.item}>
        {props.groups.map((group, i) => (
          <GroupListItem key={i} group={group} />
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
