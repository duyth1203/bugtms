import React from "react";
import { Route, Redirect } from "react-router-dom";
import authHelper from "../../../utils/authHelper";

const PrivateRoute = ({ component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authHelper.checkAuth() ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
