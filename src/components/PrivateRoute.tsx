import React from "react";
import { Route, RouteProps } from "react-router-dom";

import NotAuthorised from "./NotAuthorised";

interface Props extends RouteProps {
  component: React.FC;
  authorised: boolean;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  authorised,
  ...rest
}) => {
  if (!Component) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props: RouteProps) =>
        authorised ? <Component {...props} /> : <NotAuthorised />
      }
    />
  );
};

export default PrivateRoute;
