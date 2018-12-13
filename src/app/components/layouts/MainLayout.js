import React, { Component } from "react";
import Layout, { Content } from "antd/lib/layout";
import AppFooter from "./compontents/Footer/Footer";
import AppHeaderContainer from "./compontents/Header/HeaderContainer";
import AppSider from "./compontents/Sider/Sider";
import ViewIssueDetailsContainer from "../../screens/ViewIssueDetails/ViewIssueDetailsContainer";
import authHelper from "../../../utils/authHelper";

class MainLayout extends Component {
  state = {
    siderExpand: true,
    redirectToViewIssueDetail: null,
    willReload: false
  };

  handleSiderToggle = () => {
    this.setState({ siderExpand: !this.state.siderExpand });
  };

  handleRedirectToViewIssueDetails = issueId => {
    this.setState(
      {
        redirectToViewIssueDetail: issueId
      },
      this.setState({ redirectToViewIssueDetail: null })
    );
  };

  handleReload = () => {
    this.setState({
      willReload: !this.state.willReload
    });
  };

  render() {
    const { siderExpand, redirectToViewIssueDetail } = this.state;
    const { children } = this.props;
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
              onRedirectToViewIssueDetails={
                this.handleRedirectToViewIssueDetails
              }
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
              {redirectToViewIssueDetail ? (
                <ViewIssueDetailsContainer
                  issueId={redirectToViewIssueDetail}
                />
              ) : (
                childrenWithProp
              )}
            </Content>
            <AppFooter />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
