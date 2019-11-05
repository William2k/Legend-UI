import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../../hooks/useForm";
import styles from "./index.module.scss";
import { Spinner } from "../../miniComponents";
import { SignIn } from "../../../../global/models/user-models";
import { currentUserActions } from "../../../../store/currentUser/actions";
import { getCurrentUserSelector } from "../../../../store/currentUser/selectors";

interface Props {
  showModal: boolean;
  toggle: () => void;
}

const SignInModal: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const [errorMessage, setErrorMessage] = useState("");

  const signinSubmit = async () => {
    setErrorMessage("");

    if (!values.username) {
      setErrorMessage("Username is required");

      return;
    }

    dispatch(currentUserActions.signInUser(values));
  };

  const clearForm = () => {
    setErrorMessage("");
    resetValues();
  };

  const toggle = () => {
    props.toggle();
    clearForm();
  };

  const { values, handleChange, handleSubmit, resetValues } = useForm(
    {
      username: "",
      password: "",
      rememberMe: false
    } as SignIn,
    signinSubmit
  );

  return (
    <Modal className={styles.signin} isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sign in</ModalHeader>
      <ModalBody>
        <form id="signin-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="UserName">
              Username:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="UserName"
                className="form-control"
                name="username"
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="Password">
              Password:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="Password"
                className="form-control"
                name="password"
                type="Password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group form-check">
            <label className="form-check-label col-md-12" htmlFor="RememberMe">
              <input
                id="RememberMe"
                className="form-check-input"
                name="rememberMe"
                type="Checkbox"
                value={values.rememberMe}
                onChange={handleChange}
              />
              Remember
            </label>
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
          disabled={currentUser.isFetching}
          form="signin-form"
          color="primary"
          type="submit"
        >
          SignIn
          {currentUser.isFetching && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignInModal;
