import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Axios, { AxiosResponse } from "axios";
import { GroupResponse } from "../../global/models/group-models";

interface MatchParams {
  groupName: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Group: React.FC<Props> = props => {
  const groupName = props.match.params.groupName;

  const [group, setGroup] = useState({
    name: "",
    description: "",
    isActive: false,
    postCount: 0,
    subscriberCount: 0,
    tags: []
  } as GroupResponse);

  useEffect(() => {
    (async () => {
      const response = (await Axios.get(`group/${groupName}`)) as AxiosResponse<
        GroupResponse
      >;

      setGroup(response.data);
    })();
  }, [groupName]);

  return (
    <div>
      <div>
        <h1>{group.name}</h1>
        <p>{group.description}</p>
      </div>
    </div>
  );
};

export default Group;
