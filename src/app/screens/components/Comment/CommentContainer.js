import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CommentViewContainer from "./CommentView/CommentViewContainer";
import CommentPostContainer from "./CommentPost/CommentPostContainer";

class CommentContainer extends Component {
  state = {
    willReload: false
  };

  handleReload = () => {
    this.setState({
      willReload: !this.state.willReload
    });
  };

  render() {
    const { willReload } = this.state;

    return (
      <React.Fragment>
        <CommentViewContainer
          {...this.props}
          onReload={this.handleReload}
          willReload={willReload}
        />
        <CommentPostContainer {...this.props} onReload={this.handleReload} />
      </React.Fragment>
    );
  }
}

export default withRouter(CommentContainer);
