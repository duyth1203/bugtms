import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes";
import LoginContainer from "./screens/Login/LoginContainer";
import PrivateRoute from "./screens/components/PrivateRoute";

const App = () => {
  const AppScreens = AppRoutes.map(
    ({ path, exact, isPrivate, component: Comp }, index) =>
      isPrivate === false ? (
        <Route key={index} path={path} exact={exact} component={Comp} />
      ) : (
        <PrivateRoute key={index} path={path} exact={exact} component={Comp} />
      )
  );

  return (
    <Router>
      <MainLayout>
        <span id="fetchResultNotiHolder" />
        <Switch>
          <Route
            path="/login"
            render={props => <LoginContainer {...props} />}
          />
          {AppScreens}
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
