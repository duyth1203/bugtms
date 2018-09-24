import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeaderContainer from './compontents/Header/HeaderContainer';
import AppSider from './compontents/Sider/Sider';
import Layout from 'antd/lib/layout';
import AppFooter from './compontents/Footer/Footer';
import AppRoutes from './routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      siderCollapsed: false
    };
  }

  AppScenes = AppRoutes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));

  handleIssueSearch = query => {
    // query something
  };

  handleSiderToggle = siderCollapsed => {
    this.setState({ siderCollapsed });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <AppSider
              siderCollapsed={this.state.siderCollapsed}
              onSiderToggle={this.handleSiderToggle}
            />
            <Layout>
              <AppHeaderContainer
                siderCollapsed={this.state.siderCollapsed}
                onIssueSearch={this.handleIssueSearch}
                onSiderToggle={this.handleSiderToggle}
              />
              <Switch>{this.AppScenes}</Switch>
              <AppFooter />
            </Layout>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
