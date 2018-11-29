import React, { Component } from "react";
import { connect } from "react-redux";
import ViewIssues from "./ViewIssues";
import * as viewIssuesActions from "../../../redux/actions/viewIssuesActions";

class ViewIssuesContainer extends Component {
  componentDidMount() {
    this.props.fetchIssues();
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
  fetchIssues: () => dispatch(viewIssuesActions.fetchIssuesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewIssuesContainer);
