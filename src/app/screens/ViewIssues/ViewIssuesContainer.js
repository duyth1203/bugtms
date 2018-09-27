import React, { Component } from 'react';
import ViewIssues from './ViewIssues';

class ViewIssuesContainer extends Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/issues')
      .then(response => response.json())
      .then(issues => this.setState({ issues: issues }));
  }

  render() {
    return <ViewIssues issues={this.state.issues} />;
  }
}

export default ViewIssuesContainer;
