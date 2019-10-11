import React from "react";
import { Container } from "../../_Shared/containerStyles";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../../store/currentUser/actions";
import { SignUp } from "../../../global/models/user-models";
import useForm from "../../_Shared/hooks/useForm";

const SignUpForm = styled.form`
  margin: 5% auto;
  padding: 5%;
  background-color: #687b8c;
  color: white;
  font-size: 25px;
  max-width: 1000px;
  overflow: auto;
  .form-check-label {
    font-size: 15px;
  }
`;

const SignUpElement: React.FC = () => {
  const dispatch = useDispatch();

  const formSubmit = () => {
    dispatch(currentUserActions.signUpUser(values));
  };

  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    settings: {}
  } as SignUp, formSubmit);

  return (
    <Container>
      <SignUpForm className="register-form" onSubmit={handleSubmit}>
        <div className="col-sm-12">
          <h1>Sign Up</h1>
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="username">
            Username:
          </label>
          <input
            className="col-md-9"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="email">
            Email:
          </label>
          <input
            className="col-md-9"
            id="email"
            name="emailAddress"
            type="text"
            placeholder="Email"
            value={values.emailAddress}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="firstname">
            First Name:
          </label>
          <input
            className="col-md-9"
            id="firstname"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="lastname">
            Last Name:
          </label>
          <input
            className="col-md-9"
            id="lastname"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="password">
            Password:
          </label>
          <input
            className="col-md-9"
            id="password"
            name="password"
            type="Password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className="col-md-9"
            id="confirm-password"
            name="confirmPassword"
            type="Password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <br />
        </div>

        <button className="btn-primary btn-lg float-right">Submit</button>
      </SignUpForm>
    </Container>
  );
};

export default SignUpElement;
