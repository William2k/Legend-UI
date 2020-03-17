import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "reactstrap";

import styles from "./index.module.scss";
import { PageEnum } from "../../../../store/page/types";
import { PostResponse } from "../../../../global/models/post-models";
import { GroupResponse } from "../../../../global/models/group-models";

interface Props {
  showModal: boolean;
  toggle: () => void;
  results: SearchModel[];
}

export interface SearchModel {
  page: PageEnum;
  obj: {};
}

const SearchResults: React.FC<Props> = props => {
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
                  const post = v.obj as PostResponse;
                  return <li key={i}> {post.name}</li>;
                case PageEnum.Group:
                  const group = v.obj as GroupResponse;
                  return <li key={i}> {group.name}</li>;
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
