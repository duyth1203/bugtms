import message from "antd/lib/message";
import * as commentPostActionTypes from "../constants/commentPostActionTypes";

const initState = {
  note_content: ""
};

const commentPostReducer = (state = initState, action) => {
  switch (action.type) {
    case commentPostActionTypes.POST_COMMENT:
      const {
        result: { status }
      } = action;
      switch (status) {
        case 404:
          message.error("Sorry, failed submitting issue note.");
          return state;
        default:
          message.success("Successfully posted comment.");
          return state;
      }
    case commentPostActionTypes.HANDLE_COMMENT_CHANGE:
      const { event } = action;
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      return { ...state, [name]: value };

    default:
      return state;
  }
};

export default commentPostReducer;
