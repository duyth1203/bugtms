import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReportIssue from "./ReportIssue";
import Notification from "../components/Notification";
import moment from "moment";

class ReportIssueContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectId: "",
      bugNote: "",
      attachment: "",
      category: "General",
      status: "Buggy",
      updated: moment().format("YYYYMMDD") + "000000",
      summary1: "",
      showMessage: 0,
      messageType: "info"
    };
  }

  handleSubmit = e => {
    // TODO: validate data
    e.preventDefault();
    let {
      projectId,
      bugNote,
      attachment,
      category,
      status,
      updated,
      summary1
    } = this.state;

    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId,
        bugNote,
        attachment,
        category,
        status,
        updated,
        summary1
      })
    }) // done, show result in message
      .then(data =>
        this.setState({
          messageType: "success",
          showMessage: 1 - this.state.showMessage
        })
      )
      .catch(err =>
        this.setState({
          messageType: "error",
          showMessage: 1 - this.state.showMessage
        })
      );
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("fetchResultNotiHolder");
    const { messageType } = this.state;
    this.state.showMessage !== prevState.showMessage &&
      target &&
      ReactDOM.render(
        Notification(
          messageType,
          messageType === "success" ? "Success" : "Error",
          messageType === "success"
            ? "Successfully reported issue."
            : "Sorry, failed reporting issue.",
          2,
          "topRight"
        ),
        target
      );
  }

  render() {
    return (
      <ReportIssue onSubmit={this.handleSubmit} onChange={this.handleChange} />
    );
  }
}

export default ReportIssueContainer;
