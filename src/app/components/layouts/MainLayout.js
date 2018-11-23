import React, { Component } from "react";
import Layout, { Content } from "antd/lib/layout";
import AppFooter from "./compontents/Footer/Footer";
import AppHeaderContainer from "./compontents/Header/HeaderContainer";
import AppSider from "./compontents/Sider/Sider";

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
    const { siderExpand } = this.state;
    const { children } = this.props;

    return (
      <div className="app-container">
        <Layout>
          <AppSider
            siderExpand={siderExpand}
            onSiderToggle={this.handleSiderToggle}
          />
          <Layout>
            <AppHeaderContainer
              siderExpand={siderExpand}
              onIssueSearch={this.handleIssueSearch}
              onSiderToggle={this.handleSiderToggle}
            />
            <Content style={{ backgroundColor: "#fff", padding: "21px" }}>
              {children}
            </Content>
            <AppFooter />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
