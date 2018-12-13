import message from "antd/lib/message";
import * as reportIssueActionTypes from "../constants/reportIssueActionTypes";

const initState = {
  category: "General",
  statusIssue: "New",
  summary: "",
  description: "",
  severity: "1",
  priority: "Normal",
  assign_to: "",
  reporter: "",
  resolution: "Open",
  users: []
};

const reportIssueReducer = (state = initState, action) => {
  switch (action.type) {
    case reportIssueActionTypes.POST_ISSUE_SUCCESS:
      message.success("Successfully reported the issue.");
      return state;
    case reportIssueActionTypes.POST_ISSUE_ERROR:
      message.error("Sorry, failed reporting the issue.");
      return state;
    case reportIssueActionTypes.UPDATE_ISSUE_SUCCESS:
      message.success("Successfully updated the issue.");
      return state;
    case reportIssueActionTypes.UPDATE_ISSUE_ERROR:
      message.error("Sorry, failed updating the issue.");
      return state;
    case reportIssueActionTypes.FETCH_USERS_SUCCESS:
      const { users } = action;
      return { ...state, users };
    case reportIssueActionTypes.FETCH_USERS_EMPTY:
      return { ...state, users: [] };
    case reportIssueActionTypes.FETCH_USERS_ERROR:
      message.error("Sorry, failed fetching user list");
      return state;
    case reportIssueActionTypes.HANDLE_FORM_INPUT_CHANGE:
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

export default reportIssueReducer;
