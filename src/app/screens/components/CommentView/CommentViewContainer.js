import React, { Component } from "react";
import message from "antd/lib/message";
import ACommentViewContainer from "./ACommentViewContainer";

class CommentViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idIssue:
        (props.location.state && props.location.state) ||
        props.location.pathname.substr(
          props.location.pathname.lastIndexOf("/") + 1
        ),
      comments: [],
      willReload: 0
    };
  }

  componentDidMount() {
    const { idIssue } = this.state;

    fetch(`http://localhost:3001/getnote/${idIssue}`)
      .then(response => response.json())
      .then(comments => {
        this.setState({ comments });
      })
      .catch(err => message.error("Sorry, failed loading comments."));
  }

  handleReload = () => {
    this.setState({ willReload: 1 - this.state.willReload });
  };

  render() {
    const { comments } = this.state;
    const _comments = comments.map(comment => (
      <ACommentViewContainer
        key={comment.id}
        comment={comment}
        onReload={this.handleReload}
      />
    ));

    return (
      <div className="app-content">
        <br />
        <h1>Comments</h1>
        {_comments}
      </div>
    );
  }
}

export default CommentViewContainer;
