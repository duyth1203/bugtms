import React, { Component } from "react";
import message from "antd/lib/message";
import ViewIssueDetails from "./ViewIssueDetails";

class ViewIssueDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idIssue:
        (props.location.state && props.location.state) ||
        props.location.pathname.substr(
          props.location.pathname.lastIndexOf("/") + 1
        )
    };
  }

  componentDidMount() {
    const { idIssue } = this.state;

    fetch(`http://localhost:3001/issues/${idIssue}`)
      .then(response => response.json())
      .then(datas => {
        const { status, data } = datas;
        if (status === 0 && data) {
          this.setState({ issueDetails: data });
        } else {
          message.error("Sorry, failed loading issue details.");
        }
      })
      .catch(err => message.error("Sorry, failed loading issue details."));
  }

  render() {
    const { issueDetails } = this.state;
    return (
      <div className="app-content">
        <ViewIssueDetails issueDetails={issueDetails} />
      </div>
    );
  }
}

export default ViewIssueDetailsContainer;
