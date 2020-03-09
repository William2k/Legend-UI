import React, { useState, useEffect } from "react";
import {
  GroupResponse,
  GroupPagination
} from "../../global/models/group-models";
import GroupList from "./List";
import Axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { pageActions } from "../../store/page/actions";
import { PageEnum, CurrentPage } from "../../store/page/types";

const GroupsViewer: React.FC = () => {
  const [groups, setGroups] = useState([] as GroupResponse[]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    limit: 30,
    lastCount: 0,
    initial: true,
    asc: false
  } as GroupPagination);

  useEffect(() => {
    const currentPage = {
      page: PageEnum.Groups,
      navText: ``
    } as CurrentPage;

    dispatch(pageActions.setCurrentPage(currentPage));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const response = (await Axios.get("group", {
        params: pagination
      })) as AxiosResponse<GroupResponse[]>;

      setGroups(response.data);
    })();
  }, [pagination]);

  return (
    <div>
      <GroupList groups={groups} />
    </div>
  );
};

export default GroupsViewer;
