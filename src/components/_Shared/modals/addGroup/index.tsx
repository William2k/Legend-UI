import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios, {AxiosResponse} from "axios";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { AddGroup } from "../../../../global/models/group-models";
import useForm from "../../hooks/useForm";
import styles from "./index.module.scss";
import { GenericHttpError } from "../../../../global/models/error-models";

interface Props {
  showModal: boolean;
  toggle: () => void;
}

const AddGroupModal: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addGroupSubmit = async () => {
    setErrorMessage("");

    if (!values.name) {
      setErrorMessage("Group Name required");

      return;
    }

    setSubmitting(true);

    try {
      await Axios.post("/group", values);

      dispatch(push(`/g/${values.name}`));
    } catch (error) {
      if (error && error.response) {
        const response = error.response as AxiosResponse<GenericHttpError>;

        setErrorMessage(response.data.message);
      }
    } finally {
      setSubmitting(false);
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
    <Modal
      className={styles.addGroup}
      isOpen={props.showModal}
      toggle={props.toggle}
    >
      <ModalHeader toggle={props.toggle}>Add Group</ModalHeader>
      <ModalBody>
        <form id="add-group-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
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
          </fieldset>

          <fieldset className="form-group">
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
          </fieldset>

          <fieldset className="form-group">
            <label className="col-form-label" htmlFor="tags">
              Group Tags
            </label>
            <input id="tags" className="form-control" type="text" />
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className={styles.errorMessage}>{errorMessage}</div>
        <Button disabled={submitting} form="add-group-form" color="primary" type="submit">
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
