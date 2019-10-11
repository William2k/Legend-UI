import React, { useState } from "react";
import styled from "styled-components";

import { Spinner } from "../../_Shared/miniComponents";
import { Container } from "../../_Shared/containerStyles";
import { currentUserActions } from "../../../store/currentUser/actions";
import { SignIn } from "../../../global/models/user-models";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";

interface ValidationProps {
  show: string;
}

const SigninForm = styled.form`
  margin: 10% auto;
  padding: 5%;
  background-color: #687b8c;
  color: white;
  font-size: 25px;
  max-width: 800px;
  .form-check-label {
    font-size: 15px;
  }
`;

const ValidationDiv = styled.div<ValidationProps>`
  transition: all 0.5s;
  pointer-events: none;
  color: #a50c0c;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 25px;
  ${({ show }) => !show && `opacity: 0;`}
`;

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const loginObj = { username, password, rememberMe } as SignIn;
  const [validationError, setvalidationError] = useState("");

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(currentUserActions.signInUser(loginObj));
  };

  return (
    <Container>
      <SigninForm className="login-form" onSubmit={formSubmit}>
        <div className="col-sm-12">
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="UserName">
            Username:
          </label>
          <div className="col-md-9 d-inline-block">
            <input
              id="UserName"
              className="form-control"
              name="UserName"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-md-3" htmlFor="Password">
            Password:
          </label>
          <div className="col-md-9 d-inline-block">
            <input
              id="Password"
              className="form-control"
              name="Password"
              type="Password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label col-md-12" htmlFor="RememberMe">
            <input
              id="RememberMe"
              className="form-check-input"
              name="RememberMe"
              type="Checkbox"
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember
          </label>
        </div>
        <div className="col-md-12">
          <button className="btn-primary btn-lg btn">
            Submit
            {currentUser.isFetching && <Spinner />} 
          </button>
          <ValidationDiv
            show={validationError}
            className="validation d-inline-block"
          >
            Login failed with status: {validationError}
          </ValidationDiv>
        </div>
      </SigninForm>
    </Container>
  );
};


export default Signin;
