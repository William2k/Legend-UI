import React from "react";
import { GroupResponse } from "../../global/models/group-models";

interface Props {
  groups: GroupResponse[];
}

const GroupList: React.FC<Props> = props => {
  return (
    <div>
      <ul>
        {props.groups.map(group => (
          <li>
            <h3>{group.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
