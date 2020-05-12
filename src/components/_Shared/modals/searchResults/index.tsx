import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
} from "reactstrap";

import styles from "./index.module.scss";
import { PageEnum } from "../../../../store/page/types";
import { FullPost } from "../../../../global/models/post-models";
import { GroupResponse } from "../../../../global/models/group-models";
import PostResult from "./post-result";
import GroupResult from "./group-result";

interface Props {
  showModal: boolean;
  toggle: () => void;
  results: SearchModel[];
}

export interface SearchModel {
  page: PageEnum;
  obj: {};
}

const SearchResults: React.FC<Props> = (props) => {
  return (
    <Modal
      className={styles.searchContainer}
      isOpen={props.showModal}
      toggle={props.toggle}
    >
      <ModalHeader toggle={props.toggle}>Search Results</ModalHeader>
      <ModalBody>
        {props.results.length ? (
          <ul>
            {props.results.map((v, i) => {
              switch (v.page) {
                case PageEnum.Post:
                  return <PostResult key={i} post={v.obj as FullPost} />;
                case PageEnum.Group:
                  return <GroupResult key={i} group={v.obj as GroupResponse} />;
              }
            })}
          </ul>
        ) : (
          <div> No Results Found </div>
        )}
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default SearchResults;
