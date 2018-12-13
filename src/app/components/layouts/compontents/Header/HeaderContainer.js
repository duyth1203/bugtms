import React, { Component } from "react";
import Header from "./Header";
// import message from "antd/lib/message";

class AppHeaderContainer extends Component {
  handleIssueSearch = async query => {
    // const issueId = query.trim();
    // try {
    // const wait = await fetch(`localhost:3001/blabla/${issueId.trim()}`);
    // const json = wait.json();
    // redirect to view issue details
    // if (true) this.props.onRedirectToViewIssueDetails(issueId.trim());
    // } catch (error) {
    //   message.warning(`No issue with ID "${issueId}" found.`);
    // }
  };

  onSiderToggle = () => {
    this.props.onSiderToggle();
  };

  render() {
    return (
      <Header
        siderExpand={this.props.siderExpand}
        onIssueSearch={this.handleIssueSearch}
        onSiderToggle={this.onSiderToggle}
      />
    );
  }
}

export default AppHeaderContainer;
