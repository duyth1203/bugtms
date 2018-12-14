import React, { Component } from "react";
import Layout, { Content } from "antd/lib/layout";
import AppFooter from "./compontents/Footer/Footer";
import AppHeaderContainer from "./compontents/Header/HeaderContainer";
import AppSider from "./compontents/Sider/Sider";
import authHelper from "../../../utils/authHelper";

class MainLayout extends Component {
  state = {
    siderExpand: true
  };

  handleSiderToggle = () => {
    this.setState({ siderExpand: !this.state.siderExpand });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { siderExpand } = this.state;
    const {
      children: {
        props: { children }
      }
    } = this.props;

    const childrenWithProp = Array.isArray(children)
      ? React.Children.map(children, child =>
          React.cloneElement(child, {
            onReload: this.handleReload
          })
        )
      : React.cloneElement(children, {
          onReload: this.handleReload
        });

    return (
      <div className="app-container">
        <Layout>
          {authHelper.checkAuth() && (
            <AppSider
              siderExpand={siderExpand}
              onSiderToggle={this.handleSiderToggle}
            />
          )}
          <Layout>
            {authHelper.checkAuth() && (
              <AppHeaderContainer
                siderExpand={siderExpand}
                onIssueSearch={this.handleIssueSearch}
                onSiderToggle={this.handleSiderToggle}
              />
            )}
            <Content style={{ backgroundColor: "#fff", padding: "21px" }}>
              {childrenWithProp}
            </Content>
            <AppFooter />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
