import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes";
// import LoginContainer from "./screens/Login/LoginContainer";

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  AppScreens = AppRoutes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));

  handleLoginSucceed = data => {
    this.setState({ loggedIn: true });
    if (localStorage && localStorage.getItem("access_token"))
      localStorage.removeItem("access_token");
    localStorage.setItem("access_token", data.access_token);
    if (localStorage && localStorage.getItem("refresh_token"))
      localStorage.removeItem("refresh_token");
    localStorage.setItem("refresh_token", data.refresh_token);
  };

  render() {
    return (
      <Router>
        <MainLayout>
          <span id="fetchResultNotiHolder" />
          <Switch>{this.AppScreens}</Switch>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
