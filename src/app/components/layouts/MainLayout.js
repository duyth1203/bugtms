import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout, { Content } from "antd/lib/layout";
import AppFooter from "./compontents/Footer/Footer";
import AppHeaderContainer from "./compontents/Header/HeaderContainer";
import AppSider from "./compontents/Sider/Sider";

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      currentSelected: "My Projects",
      siderExpand: true
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // select menu according to current path
  //   const currentRootRoute = this.props.location.pathname;
  //   let currentSelected = "My Projects";
  //   const availableRootRoutes = {
  //     "/": "My Projects",
  //     "/my-projects": "My Projects",
  //     "/my-view": "My View",
  //     "/view-issues": "View Issues",
  //     "/report-issue": "Report Issue",
  //     "/summary": "Summary",
  //     "/docs": "Docs"
  //   };

  //   const hasSubRoute =
  //     currentRootRoute.indexOf("/") !== currentRootRoute.lastIndexOf("/");
  //   if (hasSubRoute) {
  //     const firstSlash = currentRootRoute.indexOf("/");
  //     const nextSlash = currentRootRoute.indexOf("/", firstSlash + 1);
  //     currentSelected =
  //       availableRootRoutes[currentRootRoute.substring(firstSlash, nextSlash)];
  //   } else {
  //     currentSelected = availableRootRoutes[currentRootRoute];
  //   }

  //   if (currentSelected === this.state.currentSelected) {
  //     return;
  //   }
  //   this.setState({ currentSelected });
  // }

  handleSiderToggle = () => {
    this.setState({ siderExpand: !this.state.siderExpand });
  };

  handleIssueSearch = query => {};

  render() {
    const { siderExpand, currentSelected } = this.state;
    const { children } = this.props;

    return (
      <div className="app-container">
        <Layout>
          <AppSider
            currentSelected={currentSelected}
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

export default withRouter(MainLayout);
