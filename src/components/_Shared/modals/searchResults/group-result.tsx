import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { GroupResponse } from "../../../../global/models/group-models";

interface Props {
  group: GroupResponse;
}

const GroupResult: React.FC<Props> = ({ group, ...props }) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(push(`/g/${group.name}`));
  };

  return <li onClick={open}> {group.name}</li>;
};

export default GroupResult;
