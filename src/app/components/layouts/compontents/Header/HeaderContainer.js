import React, { Component } from "react";
import Header from "./Header";

class AppHeaderContainer extends Component {
  onIssueSearch = query => {
    this.props.onIssueSearch(query);
  };

  onSiderToggle = () => {
    this.props.onSiderToggle();
  };

  render() {
    return (
      <Header
        siderExpand={this.props.siderExpand}
        onIssueSearch={this.onIssueSearch}
        onSiderToggle={this.onSiderToggle}
      />
    );
  }
}

export default AppHeaderContainer;
