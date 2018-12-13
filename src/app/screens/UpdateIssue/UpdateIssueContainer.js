import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCookie } from "tiny-cookie";
import message from "antd/lib/message";
import UpdateIssue from "./UpdateIssue";
import * as reportIssueActions from "../../../redux/actions/reportIssueActions";

class UpdateIssueContainer extends Component {
  componentDidMount = () => {
    if (this.props.location.state === undefined) return;
    const projectId = this.props.location.state.project_id;
    this.props.fetchUsersRequest(projectId);
  };

  handleChange = e => {
    this.props.handleFormInputChange(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      id: issueId,
      project_id: defaultProjectId
    } = this.props.location.state;
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

    this.props.updateIssueRequest({
      issueId,
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

  render() {
    return this.props.location.state !== undefined ? (
      <UpdateIssue
        {...this.props.location.state}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    ) : (
      <Redirect to="/view-issues" />
    );
  }
}

const mapStateToProps = state => ({
  ...state.reportIssue
});

const mapDispatchToProps = dispatch => ({
  updateIssueRequest: inputs =>
    dispatch(reportIssueActions.updateIssueRequest(inputs)),
  fetchUsersRequest: projectId =>
    dispatch(reportIssueActions.fetchUsersRequest(projectId)),
  handleFormInputChange: e =>
    dispatch(reportIssueActions.handleFormInputChange(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateIssueContainer);
