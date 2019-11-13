import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

import { GroupResponse } from "../../global/models/group-models";
import { PostResponse, PostPagination } from "../../global/models/post-models";
import PostList from "./Post/List";
import { pageActions } from "../../store/page/actions";
import { CurrentPage, PageEnum } from "../../store/page/types";

interface MatchParams {
  groupName: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Group: React.FC<Props> = props => {
  const groupName = props.match.params.groupName;

  const dispatch = useDispatch();

  const [posts, setPosts] = useState([] as PostResponse[]);
  const [pagination, setPagination] = useState({
    group: groupName,
    limit: 10,
    lastCount: 0,
    initial: true,
    asc: false
  } as PostPagination);

  const [group, setGroup] = useState({
    name: "",
    description: "",
    isActive: false,
    postCount: 0,
    dateCreated: "",
    subscriberCount: 0,
    tags: []
  } as GroupResponse);

  useEffect(() => {
    Axios.get(`group/${groupName}`).then(
      (response: AxiosResponse<GroupResponse>) => {
        const currentPage = {
          page: PageEnum.Group,
          obj: response.data,
          navText: `g/${groupName}`
        } as CurrentPage;
        dispatch(pageActions.setCurrentPage(currentPage));

        setGroup(response.data);
      }
    );

    Axios.get(`post`, {
      params: pagination
    }).then((response: AxiosResponse<PostResponse[]>) =>
      setPosts(response.data)
    );
  }, [groupName]);

  return (
    <div>
      <div>
        <h1>{group.name}</h1>
        <p>{group.description}</p>
      </div>

      <PostList groupName={groupName} posts={posts} />
    </div>
  );
};

export default Group;
