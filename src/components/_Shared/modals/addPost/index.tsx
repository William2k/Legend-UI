import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import useForm from "../../hooks/useForm";
import styles from "./index.module.scss";
import { GenericHttpError } from "../../../../global/models/error-models";
import { Spinner } from "../../miniComponents";
import { AddPost } from "../../../../global/models/post-models";

interface Props {
  showModal: boolean;
  group: string;
  toggle: () => void;
  openModal: () => void;
  closeModal: () => void;
}

interface AddPostForm {
  name: string;
  content: string;
}

const AddPostModal: React.FC<Props> = ({ group, ...props }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addPostSubmit = async () => {
    setErrorMessage("");

    if (!values.name) {
      setErrorMessage("Post Title required");

      return;
    }

    if (!values.content) {
      setErrorMessage("Opening Post required");

      return;
    }

    setSubmitting(true);

    try {
      const groupData = { ...values, group } as AddPost;

      const response = (await Axios.post("/post", groupData)) as AxiosResponse<
        Number
      >;

      dispatch(push(`/g/${group}/${response.data}`));

      props.closeModal();
      clearForm();
    } catch (error) {
      if (error && error.response) {
        const response = error.response as AxiosResponse<GenericHttpError>;

        setErrorMessage(response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setErrorMessage("");
    setSubmitting(false);
    resetValues();
  };

  const toggle = () => {
    props.toggle();
    clearForm();
  };

  const { values, handleChange, handleSubmit, setValue, resetValues } = useForm(
    {
      name: "",
      content: ""
    } as AddPostForm,
    addPostSubmit
  );

  return (
    <Modal className={styles.addPost} isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Post to {group}</ModalHeader>
      <ModalBody>
        <form id="add-post-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label className="col-form-label" htmlFor="name">
              Post Title
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
            <label className="col-form-label" htmlFor="content">
              Opening Post
            </label>
            <input
              id="content"
              className="form-control"
              name="content"
              type="text"
              onChange={handleChange}
              value={values.content}
            />
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className={styles.errorMessage}>{errorMessage}</div>
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
        <Button color="secondary" onClick={clearForm}>
          Reset
        </Button>
        <Button
          disabled={submitting}
          form="add-post-form"
          color="primary"
          type="submit"
        >
          Submit Post
          {submitting && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPostModal;
