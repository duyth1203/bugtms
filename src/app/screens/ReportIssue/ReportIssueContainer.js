import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReportIssue from "./ReportIssue";
import notification from "antd/lib/notification";
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
    this.state.showMessage !== prevState.showMessage &&
      ReactDOM.render(
        notification[this.state.messageType]({
          message: this.state.messageType === "success" ? "Success" : "Error",
          description:
            this.state.messageType === "success"
              ? "Successfully reported issue."
              : "Sorry, failed reporting issue.",
          duration: 2,
          placement: "topRight"
        }),
        document.querySelector("#postIssueResult")
      );
  }

  render() {
    return (
      <React.Fragment>
        <span id="postIssueResult" />
        <ReportIssue
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default ReportIssueContainer;
