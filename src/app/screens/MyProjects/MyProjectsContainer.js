import React, { Component } from "react";
import message from "antd/lib/message";
import MyProjects from "./MyProjects";
import localStorageHelper from "../../../utils/localStorageHelper";

class MyProjectsContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectsActive: [],
      projectsClosed: []
    };
  }

  componentDidMount() {
    const user = localStorageHelper.getItemLocalStorage("user");
    if (!user || !user.id) return;

    fetch(`http://localhost:3001/myproject/active/${user.id}`)
      .then(response => response.json())
      .then(datas => {
        if (datas.status === 0) {
          this.setState({ projectsActive: datas.data });
        } else {
          message.error("Sorry, failed loading active projects.");
        }
      })
      .catch(err => message.error("Sorry, failed loading active projects."));

    fetch(`http://localhost:3001/myproject/closed/${user.id}`)
      .then(response => response.json())
      .then(datas => {
        if (datas.status === 0) {
          this.setState({ projectsClosed: datas.data });
        } else {
          message.error("Sorry, failed loading closed projects.");
        }
      })
      .catch(err => message.error("Sorry, failed loading close projects."));
  }

  render() {
    const { projectsActive, projectsClosed } = this.state;
    return (
      <MyProjects
        projectsActive={projectsActive}
        projectsClosed={projectsClosed}
      />
    );
  }
}

export default MyProjectsContainer;
