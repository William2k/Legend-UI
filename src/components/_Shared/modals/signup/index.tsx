import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../../hooks/useForm";
import styles from "./index.module.scss";
import { Spinner } from "../../miniComponents";
import { SignUp } from "../../../../global/models/user-models";
import { currentUserActions } from "../../../../store/currentUser/actions";
import { getCurrentUserSelector } from "../../../../store/currentUser/selectors";

interface Props {
  showModal: boolean;
  toggle: () => void;
}

const SignUpModal: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const [errorMessage, setErrorMessage] = useState("");

  const signupSubmit = async () => { debugger;
    setErrorMessage("");

    if (!values.username) {
      setErrorMessage("Username is required");

      return;
    }

    dispatch(currentUserActions.signUpUser(values));
  };

  const clearForm = () => {
    setErrorMessage("");
    resetValues();
  };

  const toggle = () => {
    props.toggle();
    clearForm();
  };

  const { values, handleChange, handleSubmit, setValue, resetValues } = useForm(
    {
      username: "",
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      settings: {}
    } as SignUp,
    signupSubmit
  );

  return (
    <Modal className={styles.signup} isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sign up</ModalHeader>
      <ModalBody>
        <form id="signup-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="username">
              Username:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="username"
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
            <label className="control-label col-md-3" htmlFor="email">
              Email:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="email"
                name="emailAddress"
                type="text"
                placeholder="Email"
                value={values.emailAddress}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="firstname">
              First Name:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="firstname"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="lastname">
              Last Name:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="lastname"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="password">
              Password:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="password"
                name="password"
                type="Password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label
              className="control-label col-md-3"
              htmlFor="confirm-password"
            >
              Confirm Password:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="confirm-password"
                name="confirmPassword"
                type="Password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
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
          disabled={currentUser.isPosting}
          form="signup-form"
          color="primary"
          type="submit"
        >
          SignUp
          {currentUser.isPosting && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignUpModal;
