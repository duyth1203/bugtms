import React, { Component } from "react";
import { connect } from "react-redux";
import MyProjects from "./MyProjects";
import * as myProjectsActions from "../../../redux/actions/myProjectsActions";

class MyProjectsContainer extends Component {
  componentDidMount() {
    this.props.fetchActiveProjectsRequest();
    this.props.fetchClosedProjectsRequest();
  }

  render() {
    const { activeProjects, closedProjects } = this.props;

    return (
      <MyProjects
        projectsActive={activeProjects}
        projectsClosed={closedProjects}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.myProjects
});

const mapDispatchToProps = dispatch => ({
  fetchActiveProjectsRequest: () =>
    dispatch(myProjectsActions.fetchActiveProjectsRequest()),
  fetchClosedProjectsRequest: () =>
    dispatch(myProjectsActions.fetchClosedProjectsRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProjectsContainer);
