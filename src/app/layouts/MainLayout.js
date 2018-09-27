import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import AppFooter from './compontents/Footer/Footer';
import AppHeaderContainer from './compontents/Header/HeaderContainer';
import AppSider from './compontents/Sider/Sider';

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      siderExpand: true
    };
  }

  handleSiderToggle = () => {
    this.setState({ siderExpand: !this.state.siderExpand });
  };

  handleIssueSearch = query => {};

  render() {
    return (
      <div className="app-container">
        <Layout>
          <AppSider
            siderExpand={this.state.siderExpand}
            onSiderToggle={this.handleSiderToggle}
          />
          <Layout>
            <AppHeaderContainer
              onIssueSearch={this.handleIssueSearch}
              onSiderToggle={this.handleSiderToggle}
            />
            {this.props.children}
            <AppFooter />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
