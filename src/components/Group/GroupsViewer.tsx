import React, { useState, useEffect } from "react";
import { GroupResponse, GroupPagination } from "../../global/models/group-models";
import GroupList from "./List";
import Axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page/actions";

const GroupsViewer: React.FC = () => {
  const [groups, setGroups] = useState([] as GroupResponse[]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({limit: 30, lastCount: 0, initial: true, asc: false} as GroupPagination);

  useEffect(() => {
        dispatch(pageActions.removeCurrentPage());
  }, [])

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
