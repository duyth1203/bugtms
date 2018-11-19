import React, { Component } from "react";
import CommentViewContainer from "./CommentView/CommentViewContainer";
import CommentPostContainer from  "./CommentPost/CommentPostContainer";

class CommmentContainer extends Component {
	constructor() {
		super();
		this.state = {
			willReload: 0
		}
	}

	handleReload = () => {
		this.setState({
			willReload: 1 - this.state.willReload 
		});
	}

	render() {
		const { willReload } = this.state;

		return (<React.Fragment>
					<CommentViewContainer {...this.props} onReload={this.handleReload}
						willReload={willReload}
					/>
					<CommentPostContainer {...this.props} onReload={this.handleReload} 
					/>
				</React.Fragment>
		)
	}
}

export default CommmentContainer;