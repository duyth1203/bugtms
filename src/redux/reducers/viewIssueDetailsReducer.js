import message from "antd/lib/message";
import * as viewIssueDetailsActionTypes from "../constants/viewIssueDetailsActionTypes";

const initState = {};

const viewIssueDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case viewIssueDetailsActionTypes.FETCH_ISSUE_DETAILS:
      const { status, data: issueDetails } = action.issueDetails;
      switch (status) {
        case 0:
          return { ...issueDetails };
        default:
          message.error("Sorry, failed fetching issue details.");
          return state;
      }

    default:
      return state;
  }
};

export default viewIssueDetailsReducer;
