import message from "antd/lib/message";
import * as commentPostActionTypes from "../constants/commentPostActionTypes";

const initState = {
  note_content: ""
};

const commentPostReducer = (state = initState, action) => {
  switch (action.type) {
    case commentPostActionTypes.POST_COMMENT_SUCCESS:
      message.success("Successfully posted comment.");
      return state;
    case commentPostActionTypes.POST_COMMENT_ERROR:
      message.error("Sorry, failed submitting issue note.");
      return state;
    case commentPostActionTypes.HANDLE_COMMENT_CHANGE:
      const {
        event: { target }
      } = action;
      const value = target.type === "checkbox" ? target.checked : target.value,
        name = target.name;
      return { ...state, [name]: value };
    default:
      return state;
  }
};

export default commentPostReducer;
