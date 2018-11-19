import React, { Component } from "react";
import message from "antd/lib/message";
import MyView from "./MyView";
import localStorageHelper from "../../../utils/localStorageHelper";

class MyViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectId:
        localStorageHelper.getItemLocalStorage("defaultProjectId") || -1,
      userId:
        localStorageHelper.getItemLocalStorage("user") &&
        localStorageHelper.getItemLocalStorage("user").id,
      issuesUnassign: [],
      issuesIsResolve: [],
      issuesLast30Days: [],
      timeLine: []
    };
  }

  componentDidMount() {
    const { projectId, userId } = this.state;
    if (!projectId || !userId)
      return message.error("Sorry, please try logging in again.");

    if (+projectId === -1) {
      fetch(`http://localhost:3001/myview/getUnassign/${userId}/1`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { Unassign } = data;
            const issuesUnassign = Unassign.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesUnassign });
          }
        })
        .catch(err =>
          message.error("Sorry, failed loading unassigned issues.")
        );

      fetch(`http://localhost:3001/myview/getIsResolve/${userId}/1`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { isResolve } = data;
            const issuesIsResolve = isResolve.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesIsResolve });
          }
        })
        .catch(err => message.error("Sorry, failed loading solved issues."));

      fetch(`http://localhost:3001/myview/getLast30Days/${userId}/1`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { Last30days } = data;
            const issuesLast30Days = Last30days.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesLast30Days });
          }
        })
        .catch(err =>
          message.error("Sorry, failed loading issues from last 30 days.")
        );

      fetch(`http://localhost:3001/myview/timeline/${userId}/1`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { timeLine: _timeLine } = data;
            const timeLine = _timeLine.map(
              ({ id, username, idIssue, dayTime, status }) => ({
                // id,
                username,
                idIssue,
                dayTime,
                status
              })
            );
            this.setState({ timeLine });
          }
        })
        .catch(err => message.error("Sorry, failed loading timeline."));
    } else {
      fetch(
        `http://localhost:3001/myview/getUnassignP/${userId}/1/${projectId}`
      )
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { Unassign } = data;
            const issuesUnassign = Unassign.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesUnassign });
          }
        })
        .catch(err =>
          message.error("Sorry, failed loading unassigned issues.")
        );

      fetch(
        `http://localhost:3001/myview/getIsResolveP/${userId}/1/${projectId}`
      )
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { isResolve } = data;
            const issuesIsResolve = isResolve.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesIsResolve });
          }
        })
        .catch(err => {console.log(err);message.error("Sorry, failed loading solved issues.")});

      fetch(
        `http://localhost:3001/myview/getLast30DaysP/${userId}/1/${projectId}`
      )
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { Last30days } = data;
            const issuesLast30Days = Last30days.map(
              ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              }) => ({
                name,
                idIssue,
                category,
                statusIssue,
                summary,
                dayTime,
                status
              })
            );
            this.setState({ issuesLast30Days });
          }
        })
        .catch(err =>
          message.error("Sorry, failed loading issues from last 30 days.")
        );

      fetch(`http://localhost:3001/myview/timelineP/${userId}/1/${projectId}`)
        .then(response => response.json())
        .then(datas => {
          const { status, data } = datas;
          if (status === 0 && data) {
            const { timeLine: _timeLine } = data;
            const timeLine = _timeLine.map(
              ({ id, username, idIssue, dayTime, status }) => ({
                // id,
                username,
                idIssue,
                dayTime,
                status
              })
            );
            this.setState({ timeLine });
          }
        })
        .catch(err => message.error("Sorry, failed loading timeline."));
    }
  }

  render() {
    const {
      issuesUnassign,
      issuesIsResolve,
      issuesLast30Days,
      timeLine
    } = this.state;

    return (
      <MyView
        issuesUnassign={issuesUnassign}
        issuesIsResolve={issuesIsResolve}
        issuesLast30Days={issuesLast30Days}
        timeLine={timeLine}
      />
    );
  }
}

export default MyViewContainer;
