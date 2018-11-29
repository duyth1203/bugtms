import React, { Component } from "react";
import { connect } from "react-redux";
import ACommentView from "./ACommentView";
import * as aCommentViewActions from "../../../../../redux/actions/aCommentViewActions";

class ACommentViewContainer extends Component {
  handleDelete = () => {
    const { id: noteId } = this.props.comment;
    this.props.deleteACommentRequest(noteId, () =>
      setTimeout(() => this.props.onDeleteSucceed(), 500)
    );
  };

  render() {
    const { comment } = this.props;

    return (
      <ACommentView
        comment={comment}
        onDelete={this.handleDelete}
        onSubmitEdit={this.handleSubmitEdit}
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.aCommentView });

const mapDispatchToProps = dispatch => ({
  deleteACommentRequest: (noteId, cb) =>
    dispatch(aCommentViewActions.deleteACommentRequest(noteId, cb))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ACommentViewContainer);
