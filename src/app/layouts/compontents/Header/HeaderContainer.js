import React, { Component } from 'react';
import Header from './Header';

class AppHeaderContainer extends Component {
  onIssueSearch = query => {
    this.props.onIssueSearch(query);
  };

  onSiderToggle = siderCollapsed => {
    this.props.onSiderToggle(siderCollapsed);
  };

  render() {
    return (
      <Header
        siderCollapsed={this.props.siderCollapsed}
        onIssueSearch={this.onIssueSearch}
        onSiderToggle={this.onSiderToggle}
      />
    );
  }
}

export default AppHeaderContainer;
