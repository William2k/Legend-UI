import React, { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { currentUserActions } from "../../../store/currentUser/actions";
import { fadeIn } from "../animations";
import { backgroundColours } from "../../../global/colours";
import AppState from "../../../store/state-model";
import { UserSettings } from "../../../global/models/user-models";

interface MainProps {
    setting: UserSettings;
    bgColour: string;
}

const Main = styled.div<MainProps>`
  position: relative;
  min-width: 100%;
  min-height: 100vh;
  background-color: ${({ settings, bgColour }) =>
    backgroundColours[settings.theme] &&
    backgroundColours[settings.theme] !== backgroundColours.default
      ? backgroundColours[settings.theme].value
      : bgColour.value};
  animation: 0.8s ${fadeIn} ease-out;
  overflow: hidden;
  transition: 0.6s;
  ${({ settings }) =>
    settings.routeAnimation === "FADE" &&
    `    
    > .page-enter {
        opacity: 0.01;
    }
    > .page-enter.page-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
        position: absolute;       
    }
    > .page-exit {
        opacity: 1;
    }
    > .page-exit.page-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
        height: 100vh;
    }
    `}
  ${({ settings }) =>
    settings.routeAnimation === "SLIDE" &&
    `    
    > .page-enter {
        animation: slideInRight 200ms forwards;
    }
    > .page-exit {
        animation: slideOutRight 200ms forwards;
    }
    `}
`;

const mapStateToProps = (state: AppState) => {
  return { currentUser: state.currentUser, page: state.page };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(currentUserActions, dispatch);

const MainWrapper = (props: any) => {
  useEffect(() => {
    props.getUser();

    return () => {};
  }, []);

  return (
    <Main settings={props.currentUser.user.settings} bgColour={props.page.bgColour}>
      {props.children}
    </Main>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWrapper);