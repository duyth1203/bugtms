import React, { Component } from "react";
import ReactDOM from "react-dom";
import MyProjects from "./MyProjects";
import Notification from "../components/Notification";

class MyProjectsContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectsActive: [],
      projectsClosed: [],
      showMessageActive: 0,
      showMessageClosed: 0
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/myproject/active")
      .then(response => response.json())
      .then(datas => {
        if (datas.status === 0) {
          this.setState({ projectsActive: datas.data });
        } else {
          this.setState({
            showMessageActive: 1 - this.state.showMessageActive
          });
        }
      })
      .catch(err => {
        this.setState({ showMessageActive: 1 - this.state.showMessageActive });
      });

    fetch("http://localhost:3000/myproject/closed")
      .then(response => response.json())
      .then(datas => {
        if (datas.status === 0) {
          this.setState({ projectsClosed: datas.data });
        } else {
          this.setState({
            showMessageClosed: 1 - this.state.showMessageClosed
          });
        }
      })
      .catch(err => {
        this.setState({ showMessageClosed: 1 - this.state.showMessageClosed });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("fetchResultNotiHolder");

    this.state.showMessageActive !== prevState.showMessageActive &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading active projects.",
          2,
          "topRight"
        ),
        target
      );

    this.state.showMessageClosed !== prevState.showMessageClosed &&
      target &&
      ReactDOM.render(
        Notification(
          "error",
          "Error",
          "Sorry, failed loading closed projects.",
          2,
          "topRight"
        ),
        target
      );
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
