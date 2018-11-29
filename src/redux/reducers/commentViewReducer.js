import message from "antd/lib/message";
import * as commentViewActionTypes from "../constants/commentViewActionTypes";

const initState = {
  comments: []
};

const commentViewReducer = (state = initState, action) => {
  switch (action.type) {
    case commentViewActionTypes.FETCH_COMMENTS:
      const { status, data } = action.result;
      switch (status) {
        case 0:
          return { comments: data };
        case 404:
          return { comments: [] };
        default:
          message.error("Sorry, failed fetching comments.");
          return state;
      }

    default:
      return state;
  }
};

export default commentViewReducer;
