import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "tiny-cookie";
import message from "antd/lib/message";
import CommentPost from "./CommentPost";
import * as commentPostActions from "../../../../../redux/actions/commentPostActions";

class CommentPostContainer extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { note_content } = this.props;
    const issueId = this.props.location.pathname.substr(
      this.props.location.pathname.lastIndexOf("/") + 1
    );
    const userId = getCookie("user") && JSON.parse(getCookie("user")).id;
    const defaultProjectId = +getCookie("defaultProjectId");

    if (!issueId) return message.error("Cannot identify issue.");
    if (!userId) return message.error("Cannot identify user ID.");
    if (note_content.length < 1)
      return message.warning("Please type in something before submitting.");
    if (defaultProjectId === -1)
      return message.warning("Please choose a specified project.");

    this.props.postCommentRequest(
      {
        note_content,
        defaultProjectId,
        userId,
        issueId
      },
      () => setTimeout(() => this.props.onReload(), 500)
    );
  };

  render() {
    return (
      <div className="app-content">
        <br />
        <h1>Reply</h1>
        <CommentPost
          onSubmit={this.handleSubmit}
          onChange={this.props.handleCommentChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.commentPost });

const mapDispatchToProps = dispatch => ({
  postCommentRequest: (inputs, cb) =>
    dispatch(commentPostActions.postCommentRequest(inputs, cb)),
  handleCommentChange: event =>
    dispatch(commentPostActions.handleCommentChange(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentPostContainer);
