import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes';

class App extends Component {
  AppScreens = AppRoutes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));

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
