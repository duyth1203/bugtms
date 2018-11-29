import React, { Component } from "react";
import { connect } from "react-redux";
import MyView from "./MyView";
import * as myViewActions from "../../../redux/actions/myViewActions";

class MyViewContainer extends Component {
  componentDidMount() {
    this.props.fetchUnAssignedIssuesRequest();
    this.props.fetchResolvedIssuesRequest();
    this.props.fetchLast30DaysIssuesRequest();
    this.props.fetchTimeLineRequest();
  }

  render() {
    const {
      issuesUnassigned,
      issuesResolved,
      issuesLast30Days,
      timeLine
    } = this.props;

    return (
      <MyView
        issuesUnassign={issuesUnassigned}
        issuesIsResolve={issuesResolved}
        issuesLast30Days={issuesLast30Days}
        timeLine={timeLine}
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.myView });

const mapDispatchToProps = dispatch => ({
  fetchUnAssignedIssuesRequest: () =>
    dispatch(myViewActions.fetchUnAssignedIssuesRequest()),
  fetchResolvedIssuesRequest: () =>
    dispatch(myViewActions.fetchResolvedIssuesRequest()),
  fetchLast30DaysIssuesRequest: () =>
    dispatch(myViewActions.fetchLast30DaysIssuesRequest()),
  fetchTimeLineRequest: () => dispatch(myViewActions.fetchTimeLineRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyViewContainer);
