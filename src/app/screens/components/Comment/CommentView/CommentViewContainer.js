import React, { Component } from "react";
import { connect } from "react-redux";
import ACommentViewContainer from "./ACommentViewContainer";
import * as commentViewActions from "../../../../../redux/actions/commentViewActions";

class CommentViewContainer extends Component {
  fetchComments = () => {
    const issueId = this.props.location.pathname.substr(
      this.props.location.pathname.lastIndexOf("/") + 1
    );
    return this.props.fetchCommentsRequest(issueId);
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.willReload !== this.props.willReload) {
      this.fetchComments();
    }
  }

  handleDeleteSucceed = () => {
    this.props.onReload();
  };

  render() {
    const comments = this.props.comments.map(comment => (
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
        {comments}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.commentView });

const mapDispatchToProps = dispatch => ({
  fetchCommentsRequest: issueId => {
    dispatch(commentViewActions.fetchCommentsRequest(issueId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentViewContainer);
