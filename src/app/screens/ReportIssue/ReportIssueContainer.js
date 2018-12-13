import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "tiny-cookie";
import message from "antd/lib/message";
import ReportIssue from "./ReportIssue";
import * as reportIssueActions from "../../../redux/actions/reportIssueActions";

class ReportIssueContainer extends Component {
  componentDidMount = () => {
    const projectId =
      (+this.props.selectedProject !== -1 && this.props.selectedProject) ||
      +getCookie("defaultProjectId") ||
      -1;
    if (projectId === -1)
      return message.error("Sorry, failed identifying project.");
    this.props.fetchUsersRequest(projectId);
  };

  handleChange = e => {
    this.props.handleFormInputChange(e);
  };

  handleSubmit = (e, issueId) => {
    e.preventDefault();
    const defaultProjectId =
        (+this.props.selectedProject !== -1 && this.props.selectedProject) ||
        +getCookie("defaultProjectId") ||
        -1,
      userId = getCookie("user") && JSON.parse(getCookie("user")).id;

    let {
      category,
      statusIssue,
      summary,
      description,
      severity,
      priority,
      assign_to,
      reporter,
      resolution
    } = this.props;

    if (reporter.length < 1)
      reporter =
        (getCookie("user") && JSON.parse(getCookie("user")).username) || "";
    if (reporter.length < 1)
      return message.warning("Please choose a reporter.");

    if (summary.length < 1 || description.length < 1)
      return message.warning("Please check if any required field was empty.");

    if (!defaultProjectId || defaultProjectId === -1)
      return message.error(
        "Sorry, no project selected so failed reporting the issue."
      );

    if (!userId)
      return message.error(
        "Sorry, cannot identify user ID. Please log out and log in again."
      );

    this.props.postIssueRequest({
      issueId,
      userId,
      defaultProjectId,
      category,
      statusIssue,
      summary,
      description,
      severity,
      priority,
      assign_to,
      reporter,
      resolution
    });
  };

  handleChooseProject = () => {
    this.props.onReload();
  };

  render() {
    return (
      <React.Fragment>
        <ReportIssue
          {...this.props}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onChooseProject={this.handleChooseProject}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.reportIssue
});

const mapDispatchToProps = dispatch => ({
  postIssueRequest: inputs =>
    dispatch(reportIssueActions.postIssueRequest(inputs)),
  fetchUsersRequest: projectId =>
    dispatch(reportIssueActions.fetchUsersRequest(projectId)),
  handleFormInputChange: e =>
    dispatch(reportIssueActions.handleFormInputChange(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportIssueContainer);
