import React, { Component } from "react";
import { connect } from "react-redux";
import ViewIssueDetails from "./ViewIssueDetails";
import * as viewIssueDetailsActions from "../../../redux/actions/viewIssueDetailsActions";

class ViewIssueDetailsContainer extends Component {
  componentDidMount() {
    const issueId =
      this.props.issueId ||
      (this.props.location.state && this.props.location.state) ||
      this.props.location.pathname.substr(
        this.props.location.pathname.lastIndexOf("/") + 1
      );

    this.props.fetchIssueDetailsRequest(issueId);
  }

  render() {
    const { issueDetails } = this.props;
    return (
      <div className="app-content">
        <ViewIssueDetails issueDetails={issueDetails} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ issueDetails: state.viewIssueDetails });

const mapDispatchToProps = dispatch => ({
  fetchIssueDetailsRequest: issueId =>
    dispatch(viewIssueDetailsActions.fetchIssueDetailsRequest(issueId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewIssueDetailsContainer);
