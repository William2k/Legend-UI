import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RouteProps } from "react-router";

import { fadeIn } from "../animations";
import { backgroundColours } from "../../../global/colours";
import { UserSettings } from "../../../global/models/user-models";
import { currentUserActions } from "../../../store/currentUser/actions";
import { getUserSettingsSelector } from "../../../store/currentUser/selectors";
import { getPageSelector } from "../../../store/page/selector";
import MainPanel from "../../MainPanel";
import { Container } from "../containerStyles";

interface MainProps {
  settings: UserSettings;
  bgColour: string;
}

const Main = styled(Container)<MainProps>`
display: flex;
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
    > .page-content .page-enter {
        opacity: 0.01;
    }
    > .page-content .page-enter.page-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
        position: absolute;
    }
    > .page-content .page-exit {
        opacity: 1;
    }
    > .page-content .page-exit.page-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
        height: 100vh;
    }
    `}
  ${({ settings }) =>
    settings.routeAnimation === "SLIDE" &&
    `
    > .page-content .page-enter {
        animation: slideInRight 200ms forwards;
    }
    > .page-content .page-exit {
        animation: slideOutRight 200ms forwards;
    }
    `}

    .page-content{
      flex-basis: 75%
    }

    .main-panel{
      flex-basis: 35%;
    }
`;

const MainWrapper: React.FC<RouteProps> = props => {
  const dispatch = useDispatch();
  const settings = useSelector(getUserSettingsSelector);
  const page = useSelector(getPageSelector);

  useEffect(() => {
    dispatch(currentUserActions.getUser());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main settings={settings} bgColour={page.bgColour}>
      <main className="page-content">{props.children}</main>
      <article className="main-panel">
        <MainPanel />
      </article>
    </Main>
  );
};

export default MainWrapper;
