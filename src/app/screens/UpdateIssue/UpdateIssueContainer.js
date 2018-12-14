import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCookie } from "tiny-cookie";
import message from "antd/lib/message";
import UpdateIssue from "./UpdateIssue";
import * as reportIssueActions from "../../../redux/actions/reportIssueActions";

class UpdateIssueContainer extends Component {
  constructor() {
    super();
    this.summaryRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.location.state === undefined) {
      message.warning("Sorry, failed passing issue details.");
      return this.history.goBack();
    }
    const projectId = this.props.location.state.project_id;
    this.props.fetchUsersRequest(projectId);
  };

  handleChange = e => {
    this.props.handleFormInputChange(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id: issueId, project_id } = this.props.location.state;
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

    // if any of details did not raise any onChange
    if (category === "") category = this.props.location.state.category || "";
    if (statusIssue === "")
      statusIssue = this.props.location.state.statusIssue || "";
    if (summary === "")
      summary = this.summaryRef.current.props.defaultVale || "";
    if (description === "")
      description = this.descriptionRef.current.props.defaultVale || "";
    if (severity === "") severity = this.props.location.state.severity || "";
    if (priority === "") priority = this.props.location.state.priority || "";
    if (assign_to === "") assign_to = this.props.location.state.assign_to || "";
    if (reporter === "")
      reporter =
        JSON.stringify(this.props.location.state.reporter) ||
        (getCookie("user") && JSON.parse(getCookie("user")).username) ||
        "";
    if (resolution === "")
      resolution = JSON.stringify(this.props.location.state.resolution) || "";

    if (reporter === "")
      return message.warning("Session maybe expired. Please log in again.");

    if (summary === "" || description === "")
      return message.warning("Please check if any required field was empty.");

    if (!project_id || project_id === -1)
      return message.error(
        "Sorry, no project selected so failed reporting the issue."
      );

    this.props.updateIssueRequest(
      {
        issueId,
        project_id,
        category,
        statusIssue,
        summary,
        description,
        severity,
        priority,
        assign_to,
        reporter,
        resolution
      },
      () =>
        setTimeout(
          () => this.props.history.push(`/view-issues/${issueId}`),
          500
        )
    );
  };

  render() {
    return this.props.location.state !== undefined ? (
      <UpdateIssue
        {...this.props.location.state}
        users={this.props.users}
        summaryRef={this.summaryRef}
        descriptionRef={this.descriptionRef}
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
  updateIssueRequest: (inputs, cb) =>
    dispatch(reportIssueActions.updateIssueRequest(inputs, cb)),
  fetchUsersRequest: projectId =>
    dispatch(reportIssueActions.fetchUsersRequest(projectId)),
  handleFormInputChange: e =>
    dispatch(reportIssueActions.handleFormInputChange(e))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateIssueContainer)
);
