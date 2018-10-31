import React, { Component } from "react";
import ReactDOM from "react-dom";
import ViewIssues from "./ViewIssues";
import notification from "antd/lib/notification";

class ViewIssuesContainer extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      showMessage: 0
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/issues")
      .then(response => response.json())
      .then(issues => this.setState({ issues: issues.data }))
      .catch(err => this.setState({ showMessage: 1 - this.state.showMessage }));
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.showMessage !== prevState.showMessage &&
      ReactDOM.render(
        notification["error"]({
          message: "Error",
          description: "Sorry, failed loading issues.",
          duration: 2,
          placement: "topRight"
        }),
        document.querySelector("#getIssuesResult")
      );
  }

  render() {
    return (
      <React.Fragment>
        <span id="getIssuesResult" />
        <ViewIssues issues={this.state.issues} />
      </React.Fragment>
    );
  }
}

export default ViewIssuesContainer;
