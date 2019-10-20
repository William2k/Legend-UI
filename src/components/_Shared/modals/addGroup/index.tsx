import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { AddGroup } from "../../../../global/models/group-models";
import useForm from "../../hooks/useForm";
import styles from "./index.module.scss";
import { GenericHttpError } from "../../../../global/models/error-models";
import { Spinner } from "../../miniComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import { arrayRemoveByIndex } from "../../../../global/helpers";

interface Props {
  showModal: boolean;
  toggle: () => void;
  openModal: () => void;
  closeModal: () => void;
}

interface AddGroupForm {
  name: string;
  description: string;
  tag: string;
}

const AddGroupModal: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([] as string[]);
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
      const { tag, ...group } = values;

      const groupData = { ...group, tags } as AddGroup;

      await Axios.post("/group", groupData);

      dispatch(push(`/g/${values.name}`));

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

  const quickError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 2000);
  }

  const handleAddTagClick = () => {
    if(!values.tag) {
      return;
    }

    const tag = values.tag.trim().toLowerCase();

    if(tag.match(" ")){
      quickError("Tags cannot include spaces");
      return;
    }

    if(tags.includes(tag)){
      quickError("Tag already exists");
      return;
    }

    setTags([...tags, tag]);

    setValue("tag", "");
  };

  const handleTagClick = (e: React.MouseEvent) => {
    const index = (e.currentTarget as HTMLButtonElement).dataset.index;

    if(!index) {
      setErrorMessage("Tag could not be removed");
    }

    const newTags = arrayRemoveByIndex(tags, Number(index));

    setTags(newTags);
  }

  const handleTagKeyUp = (e: React.KeyboardEvent) => {
    if(e.key !== "Enter" || !(e.currentTarget as HTMLInputElement).value) {
      return;
    }

    e.preventDefault();

    handleAddTagClick();
  }

  const clearForm = () => {
    setTags([]);
    setErrorMessage("");
    setSubmitting(false);
    resetValues();
  }

  const toggle = () => {
    props.toggle();
    clearForm();
  }

  const { values, handleChange, handleSubmit, setValue, resetValues } = useForm(
    {
      name: "",
      description: "",
      tag: ""
    } as AddGroupForm,
    addGroupSubmit
  );

  return (
    <Modal
      className={styles.addGroup}
      isOpen={props.showModal}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Add Group</ModalHeader>
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
            <label className="col-form-label" htmlFor="tag">
              Group Tags
            </label>
            <div>
              <input
                id="tag"
                className="w-50"
                name="tag"
                type="text"
                onKeyUp={handleTagKeyUp}
                onChange={handleChange}
                value={values.tag}
              />
              <button
                className="btn btn-light"
                type="button"
                onClick={handleAddTagClick}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>

              <ul className="list-unstyled">
                {tags.map((tag, i) => (
                  <li className={styles.tagList} key={i}>
                    <button className="btn btn-info" type="button" data-index={i} onClick={handleTagClick}>
                      {tag} <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
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
          form="add-group-form"
          color="primary"
          type="submit"
        >
          Create Group
          {submitting && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddGroupModal;
