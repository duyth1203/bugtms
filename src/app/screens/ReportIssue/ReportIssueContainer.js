import React, { Component } from "react";
import message from "antd/lib/message";
import ReportIssue from "./ReportIssue";
import localStorageHelper from "../../../utils/localStorageHelper";
import moment from "moment";

class ReportIssueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Id:
        localStorageHelper.getItemLocalStorage("user") &&
        localStorageHelper.getItemLocalStorage("user").id,
      project_id:
        (+props.selectedProject !== -1 && props.selectedProject) ||
        localStorageHelper.getItemLocalStorage("defaultProjectId") ||
        -1,
      // attachment: "",
      category: "General",
      statusIssue: "New",
      summary: "",
      description: "",
      severity: "1",
      priority: "Normal",
      assign_to: "",
      reporter: "",
      resolution: "Open"
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    // TODO: validate data
    e.preventDefault();
    let {
      user_Id,
      project_id,
      // attachment,
      category,
      statusIssue,
      summary,
      description,
      severity,
      priority,
      assign_to,
      reporter,
      resolution
    } = this.state;

    if (summary.length < 1 || description.length < 1 || reporter.length < 1)
      return message.warning("Please check if any required field was empty.");

    if (!project_id || +project_id === -1)
      return message.error(
        "Sorry, no project selected so failed reporting the issue."
      );

    if (!user_Id)
      return message.error(
        "Sorry, cannot identify user ID. Please log out and log in again."
      );

    fetch("http://localhost:3001/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_Id,
        project_id,
        // attachment,
        category,
        statusIssue,
        last_updated: moment().format("YYYYMMDD") + "000000",
        data_submitted: moment().format("YYYYMMDD") + "000000",
        summary,
        description,
        severity,
        priority,
        assign_to,
        reporter,
        resolution
      })
    }) // done, show result in message
      .then(response => response.json())
      .then(data => {
        const { status } = data;
        if (status === 0) {
          message.success("Successfully reported the issue.");
        } else {
          message.error("Sorry, failed reporting the issue.");
        }
      })
      .catch(err => message.error("Sorry, failed reporting the issue."));
  };

  handleChooseProject = () => {
    this.props.onReload();
  };

  render() {
    return (
      <React.Fragment>
        <ReportIssue
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onChooseProject={this.handleChooseProject}
        />
      </React.Fragment>
    );
  }
}

export default ReportIssueContainer;
