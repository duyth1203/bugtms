import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AppRoutes from "./routes";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  AppScreens = AppRoutes.map(
    ({ path, exact, isPrivate, component: Comp }, index) => {
      return isPrivate === false ? (
        <Route key={index} path={path} exact={exact} component={Comp} />
      ) : (
        <PrivateRoute key={index} path={path} exact={exact} component={Comp} />
      );
    }
  );

  render() {
    return (
      <Router>
        <MainLayout>
          <Switch>{this.AppScreens}</Switch>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
