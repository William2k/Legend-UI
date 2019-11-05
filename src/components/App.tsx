import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import ReactNotifications from "react-notifications-component";
import Axios from "axios";

import Nav from "./Nav";
import MainWrapper from "./_Shared/wrappers/MainWrapper";
import PrivateRoute from "./PrivateRoute";
import Account from "./Account";
import { getLocationSelector } from "../store/router/selectors";
import { getCurrentUserSelector } from "../store/currentUser/selectors";
import initialiser from "../appInitialiser";
import { currentUserActions } from "../store/currentUser/actions";
import Group from "./Group";
import { useConfig } from "../global/config";
import GroupsViewer from "./Group/GroupsViewer";
import Post from "./Group/Post";

Axios.defaults.baseURL = useConfig.apiBaseURL;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initialiser(dispatch);
    dispatch(currentUserActions.getUser());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useSelector(getLocationSelector);
  const currentUser = useSelector(getCurrentUserSelector);

  return (
    <React.Fragment>
      <Nav />
      <MainWrapper>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Switch location={location}>
              <Route exact path="/" component={GroupsViewer} />
              <PrivateRoute
                exact
                path="/account"
                component={Account}
                authorised={currentUser.isLoggedIn}
              />
              <Route path="/g/:groupName/:postId" component={Post} />
              <Route path="/g/:groupName" component={Group} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </MainWrapper>
      <ReactNotifications />
    </React.Fragment>
  );
};

export default App;
