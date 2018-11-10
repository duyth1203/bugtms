import React, { Component } from "react";
import message from "antd/lib/message";
import ReportIssue from "./ReportIssue";
import localStorageHelper from "../../../utils/localStorageHelper";
import moment from "moment";

class ReportIssueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (!project_id || +project_id === -1)
      return message.error(
        "Sorry, no project selected so failed reporting the issue."
      );

    fetch("http://localhost:3001/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
        const { status, ok } = data;
        if (status === 200 && ok === true) {
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
