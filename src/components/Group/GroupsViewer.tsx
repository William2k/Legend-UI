import React, { useState, useEffect } from "react";
import { GroupResponse, GroupPagination } from "../../global/models/group-models";
import GroupList from "./List";
import Axios, { AxiosResponse } from "axios";

const GroupsViewer: React.FC = () => {
  const [groups, setGroups] = useState([] as GroupResponse[]);
  const [pagination, setPagination] = useState({limit: 30, subset: 1} as GroupPagination);

  useEffect(() => {
    (async() => {
        const response = await Axios.get("group", {params: pagination}) as AxiosResponse<GroupResponse[]>;

        setGroups(response.data);
    })();
  }, [pagination])

  return (
    <div>
      <GroupList groups={groups} />
    </div>
  );
};

export default GroupsViewer;
