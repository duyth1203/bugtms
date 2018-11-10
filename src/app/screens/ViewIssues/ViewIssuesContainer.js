import React, { Component } from "react";
import message from "antd/lib/message";
import ViewIssues from "./ViewIssues";
import localStorageHelper from "../../../utils/localStorageHelper";

class ViewIssuesContainer extends Component {
  constructor() {
    super();
    this.state = {
      userId:
        localStorageHelper.getItemLocalStorage("user") &&
        localStorageHelper.getItemLocalStorage("user").id,
      issues: []
    };
  }

  componentDidMount() {
    const { userId } = this.state;
    if (!userId) return message.error("Sorry, failed loading issues.");

    const projectId = +(
      this.state.projectId ||
      localStorageHelper.getItemLocalStorage("defaultProjectId") ||
      -1
    );

    if (projectId === -1) {
      fetch(`http://localhost:3001/issues/getByProjectOfUser/${userId}`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const issues = [];
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].issueList.length; j++) {
                issues.push(data[i].issueList[j]);
              }
            }
            this.setState({ issues });
          } else {
            message.error("Sorry, failed loading issues.");
          }
        })
        .catch(err => message.error("Sorry, failed loading issues."));
    } else {
      fetch(`http://localhost:3001/issues/getByProject/${projectId}`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const issues = data.filter(
              issue => +issue.project_id === +projectId
            );
            this.setState({ issues });
          } else {
            message.error("Sorry, failed loading issues.");
          }
        })
        .catch(err => message.error("Sorry, failed loading issues."));
    }
  }

  render() {
    const { issues } = this.state;
    return <ViewIssues issues={issues} />;
  }
}

export default ViewIssuesContainer;
