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
  resolution: "Open"
};

const reportIssueReducer = (state = initState, action) => {
  switch (action.type) {
    case reportIssueActionTypes.POST_ISSUE:
      const {
        result: { status }
      } = action;
      switch (status) {
        case 0:
          message.success("Successfully reported the issue.");
          return state;
        default:
          message.error("Sorry, failed reporting the issue.");
          return state;
      }

    case reportIssueActionTypes.HANDLE_FORM_INPUT_CHANGE:
      const { event } = action;
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      return { ...state, [name]: value };

    default:
      return state;
  }
};

export default reportIssueReducer;
