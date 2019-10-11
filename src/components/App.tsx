import React from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import Nav from "./Nav";
import MainWrapper from "./_Shared/wrappers/MainWrapper";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import Account from "./Account";
import SignIn from "./Account/SignIn";
import SignUp from "./Account/SignUp";
import { getLocationSelector } from "../store/router/selectors";
import { getCurrentUserSelector } from "../store/currentUser/selectors";


const App: React.FC = () => {
  const location = useSelector(getLocationSelector);
  const currentUser = useSelector(getCurrentUserSelector);

  return (
    <React.Fragment>
      <Nav />
      <MainWrapper>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/account" component={Account} authorised={currentUser.isLoggedIn}/>
              <Route path="/account/signin" component={SignIn} />
              <Route path="/account/signup" component={SignUp} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </MainWrapper>
    </React.Fragment>
  );
};

export default App;
