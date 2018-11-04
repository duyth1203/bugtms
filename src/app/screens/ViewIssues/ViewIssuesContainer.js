import React, { Component } from "react";
import ReactDOM from "react-dom";
import ViewIssues from "./ViewIssues";
import Notification from "../components/Notification";

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
    const target = document.getElementById("fetchResultNotiHolder");

    this.state.showMessage !== prevState.showMessage &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading issues.",
          2,
          "topRight"
        ),
        target
      );
  }

  render() {
    const { issues } = this.state;
    return <ViewIssues issues={issues} />;
  }
}

export default ViewIssuesContainer;
