import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import message from "antd/lib/message";
import Header from "./Header";

class AppHeaderContainer extends Component {
  handleIssueSearch = async query => {
    const issueId = query.trim();
    fetch(`http://localhost:3001/issues/${issueId}`)
      .then(resp => resp.json())
      .then(json => {
        const { status } = json;
        // redirect to view issue details
        if (status === 0) {
          this.props.history.push({
            pathname: "/redirect",
            state: { to: `/view-issues/${issueId}` }
          });
        } else message.warning(`No issue with ID "${issueId}" found.`);
      })
      .catch(error => message.warning(`No issue with ID "${issueId}" found.`));
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

export default withRouter(AppHeaderContainer);
