import React, { Component } from "react";
import message from "antd/lib/message";
import ACommentView from "./ACommentView";

class ACommentViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      note_content: ""
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleDelete = () => {
    const noteId = this.props.comment.id;
    if (!noteId) return message.error("Cannot identify note ID.");

    fetch(`http://localhost:3001/deletenote/${noteId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(datas => {
        const { status } = datas;
        if (status !== 404) {
            message.success("Successfully deleted note");
            setTimeout(() => this.props.onDeleteSucceed(), 500);
        }
      })
      .catch(err => message.error("Sorry, failed deleting the comment."));
  };

  handleSubmitEdit = e => {
    e.preventDefault();
  };

  render() {
    const { comment } = this.props;

    return (
      <ACommentView
        comment={comment}
        onChange={this.handleChange}
        onDelete={this.handleDelete}
        onSubmitEdit={this.handleSubmitEdit}
      />
    );
  }
}

export default ACommentViewContainer;
