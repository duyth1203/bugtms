import message from "antd/lib/message";
import * as aCommentViewActionTypes from "../constants/aCommentViewActionTypes";

const initState = {};

const aCommentViewReducer = (state = initState, action) => {
  switch (action.type) {
    case aCommentViewActionTypes.DELETE_A_COMMENT_SUCCESS:
      message.error("Sorry, failed deleting the comment.");
      return state;
    case aCommentViewActionTypes.DELETE_A_COMMENT_ERROR:
      message.success("Successfully deleted note.");
      return state;
    default:
      return state;
  }
};

export default aCommentViewReducer;
