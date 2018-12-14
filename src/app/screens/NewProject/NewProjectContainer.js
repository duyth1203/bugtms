import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "tiny-cookie";
import message from "antd/lib/message";
import moment from "moment";
import NewProject from "./NewProject";
import * as newProjectActions from "../../../redux/actions/newProjectActions";

class NewProjectContainer extends Component {
  componentDidMount = () => {
    this.props.fetchUsersRequest();
  };

  handleChange = e => {
    this.props.handleFormInputChange(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    let {
      name,
      manager,
      project_manager,
      project_leader,
      members,
      deadline,
      programming_language,
      db,
      platform,
      type,
      professional_business,
      web_server,
      managerment,
      application_server,
      system_networking
    } = this.props;

    let _members = (members && Array.from(members)) || [];
    if (name.length < 1)
      return message.warning("Name of the project must not be empty.");
    if (!members || members.length < 1) {
      const userId = getCookie("user") && JSON.parse(getCookie("user")).id;
      if (userId) _members.unshift(userId);
      else
        return message.warning(
          "Could not identify user, please log out and log in again."
        );
    }

    this.props.postProjectRequest(
      {
        name,
        manager,
        project_manager,
        project_leader,
        members: _members,
        deadline: moment(deadline).format("YYYY/MM/DD"),
        programming_language,
        db,
        platform,
        type,
        professional_business,
        web_server,
        managerment,
        application_server,
        system_networking
      },
      () => setTimeout(() => this.props.onReload(), 500)
    );
  };

  render() {
    const { users } = this.props;

    return (
      <NewProject
        users={users}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.newProject });

const mapDispatchToProps = dispatch => ({
  postProjectRequest: (inputs, cb) =>
    dispatch(newProjectActions.postProjectRequest(inputs, cb)),
  handleFormInputChange: e =>
    dispatch(newProjectActions.handleFormInputChange(e)),
  fetchUsersRequest: () => dispatch(newProjectActions.fetchUsersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProjectContainer);
