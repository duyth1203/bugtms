import React, { Component } from "react";
import { connect } from "react-redux";
import ViewIssues from "./ViewIssues";
import * as viewIssuesActions from "../../../redux/actions/viewIssuesActions";

class ViewIssuesContainer extends Component {
  componentDidMount() {
    const projectId =
      this.props.location.state && this.props.location.state.projectId;
    this.props.fetchIssuesRequest(projectId);
  }

  render() {
    const { issues } = this.props;
    return <ViewIssues issues={issues} />;
  }
}

const mapStateToProps = state => ({
  ...state.viewIssues
});

const mapDispatchToProps = dispatch => ({
  fetchIssuesRequest: projectId =>
    dispatch(viewIssuesActions.fetchIssuesRequest(projectId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewIssuesContainer);
