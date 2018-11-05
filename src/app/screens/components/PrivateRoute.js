import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthHelper from "../../../utils/authHelper";

const Auth = new AuthHelper();

const PrivateRoute = ({ component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.checkAuth() ? (
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
