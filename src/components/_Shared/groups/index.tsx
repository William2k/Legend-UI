import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";

import { AddGroup } from "../../../global/models/group-models";
import useForm from "../hooks/useForm";
import styles from "./index.module.scss";

interface Props {
  showModal: boolean;
  toggle: () => void;
}

const AddGroupModal: React.FC<Props> = props => {
  const addGroupSubmit = async () => {
    if(!values.name) {
        return;
    }

    try {
      await Axios.post("/group", values);
    } catch (error) {
      console.log("failed to add group");
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    {
      name: "",
      description: ""
    } as AddGroup,
    addGroupSubmit
  );

  return (
    <Modal className={styles.addGroup} isOpen={props.showModal} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Add Group</ModalHeader>
      <ModalBody>
        <form id="add-group-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="col-form-label" htmlFor="name">
              Group Name
            </label>
            <input
              id="name"
              className="form-control"
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
            />
          </div>

          <div className="form-group">
            <label className="col-form-label" htmlFor="description">
              Group Description
            </label>
            <input
              id="description"
              className="form-control"
              name="description"
              type="text"
              onChange={handleChange}
              value={values.description}
            />
          </div>

          <div className="form-group">
            <label className="col-form-label" htmlFor="tags">
              Group Tags
            </label>
            <input id="tags" className="form-control" type="text" />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button form="add-group-form" color="primary" type="submit">
          Create Group
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddGroupModal;
