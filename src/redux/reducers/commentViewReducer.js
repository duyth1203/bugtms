import message from "antd/lib/message";
import * as commentViewActionTypes from "../constants/commentViewActionTypes";

const initState = {
  comments: []
};

const commentViewReducer = (state = initState, action) => {
  switch (action.type) {
    case commentViewActionTypes.FETCH_COMMENTS_SUCCESS:
      const { comments } = action;
      return { comments };
    case commentViewActionTypes.FETCH_COMMENTS_EMPTY:
      return { comments: [] };
    case commentViewActionTypes.FETCH_COMMENTS_ERROR:
      message.error("Sorry, failed fetching comments.");
      return state;
    default:
      return state;
  }
};

export default commentViewReducer;
