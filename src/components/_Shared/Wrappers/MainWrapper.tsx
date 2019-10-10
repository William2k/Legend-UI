import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fadeIn } from "../animations";
import { backgroundColours } from "../../../global/colours";
import AppState from "../../../store/state-model";
import { UserSettings } from "../../../global/models/user-models";
import { RouteProps } from "react-router";
import { currentUserActions } from "../../../store/currentUser/actions";

interface MainProps {
  settings: UserSettings;
  bgColour: string;
}

const Main = styled.div<MainProps>`
  position: relative;
  min-width: 100%;
  min-height: 100vh;
  background-color: ${({ settings, bgColour }) =>
    backgroundColours[settings.theme] &&
    backgroundColours[settings.theme] !== backgroundColours.default
      ? backgroundColours[settings.theme]
      : bgColour};
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

const MainWrapper: React.FC<RouteProps> = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);

  const settings = state.currentUser.user.settings;
  const page = state.page;

  useEffect(() => {
    dispatch(currentUserActions.getUser());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main
      settings={settings}
      bgColour={page.bgColour}
    >
      {props.children}
    </Main>
  );
};

export default MainWrapper;
