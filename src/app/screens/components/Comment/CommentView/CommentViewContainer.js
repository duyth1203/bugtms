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
      comments: []
    };
  }

  fetchComments = () => {
      const { idIssue } = this.state;
      fetch(`http://localhost:3001/getnote/${idIssue}`)
          .then(response => response.json())
          .then(comments => {
              if(comments && comments.length > 0) this.setState({ comments });
              else this.setState({comments: []});
          })
          .catch(err => message.error("Sorry, failed loading comments."));
  }

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps,  prevState) {
    if(prevProps.willReload !== this.props.willReload) {
      this.fetchComments();
    }
  }

  handleDeleteSucceed = () => {
    this.props.onReload();
  };

  render() {
    const { comments } = this.state;
    const _comments = comments && comments.map(comment => (
      <ACommentViewContainer
        key={comment.id}
        comment={comment}
        onDeleteSucceed={this.handleDeleteSucceed}
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
