import React, { Component } from "react";
import CommentPost from "./CommentPost";
import message from "antd/lib/message";

class CommentPostContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          note_content: "",
          idIssue:
              (props.location.state && props.location.state) ||
              props.location.pathname.substr(
                  props.location.pathname.lastIndexOf("/") + 1
              )
      }
  }

  handleChange = e => {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
          [name]: value
      });
  };

  handlePostSucceed = () => {
    message.success("Successfully posted comment.");
    setTimeout(() => this.props.onReload(), 500);
  }

  handleSubmit = e => {
      e.preventDefault();
      const { idIssue, note_content } = this.state;
      const userId = localStorage && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id;
      const defaultProjectId = +(localStorage && localStorage.getItem("defaultProjectId"));
      if(!idIssue) return message.error("Cannot identify issue.");
      if(!userId) return message.error(("Cannot identify user ID."));
      if(note_content.length < 1) return message.warning("Please type in something before submitting.");
      if(+defaultProjectId === -1) return message.warning("Please choose a specified project.");
        
      fetch(`http://localhost:3001/postnote/${defaultProjectId}/${userId}/${idIssue}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ note_content })
      })
          .then(response => response.json())
          .then(data => this.handlePostSucceed())
          .catch(err => message.error("Sorry, failed submitting issue note."));
  };

  render() {
    return (
        <div className="app-content">
          <br/>
          <h1>Reply</h1>
          <CommentPost onSubmit={this.handleSubmit} onChange={this.handleChange}/>
        </div>
    );
  }
}

export default CommentPostContainer;
