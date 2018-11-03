import React, { Component } from "react";
import ReactDOM from "react-dom";
import MyView from "./MyView";
import Notification from "../components/Notification";

class MyViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      issuesSolved: [],
      issuesNotSolved: [],
      issuesLast30Days: [],
      timeLine: [],
      showMessageIssuesSolved: 0,
      showMessageIssuesNotSolved: 0,
      showMessageIssuesLast30Days: 0,
      showMessageTimeLine: 0
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("fetchResultNotiHolder");

    this.state.showMessageIssuesSolved !== prevState.showMessageIssuesSolved &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading solved issues.",
          2,
          "topRight"
        ),
        target
      );

    this.state.showMessageIssuesNotSolved !==
      prevState.showMessageIssuesNotSolved &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading not solved issues.",
          2,
          "topRight"
        ),
        target
      );

    this.state.showMessageIssuesLast30Days !==
      prevState.showMessageIssuesLast30Days &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading last 30 days issues.",
          2,
          "topRight"
        ),
        target
      );

    this.state.showMessageTimeLine !== prevState.showMessageTimeLine &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading timeline.",
          2,
          "topRight"
        ),
        target
      );
  }

  render() {
    const { issuesSolved, issuesNotSolved, issuesLast30Days } = this.state;
    return (
      <MyView
        issuesSolved={issuesSolved}
        issuesNotSolved={issuesNotSolved}
        issuesLast30Days={issuesLast30Days}
      />
    );
  }
}

export default MyViewContainer;
