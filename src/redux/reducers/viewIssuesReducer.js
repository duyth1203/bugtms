import message from "antd/lib/message";
import * as viewIssuesActionTypes from "../constants/viewIssuesActionTypes";

const initState = {
  issues: []
};

const viewIssuesReducer = (state = initState, action) => {
  switch (action.type) {
    case viewIssuesActionTypes.FETCH_ISSUES_SUCCESS:
      const { data, defaultProjectId } = action;
      if (defaultProjectId === -1) {
        const issues = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].issueList.length; j++) {
            issues.push(data[i].issueList[j]);
          }
        }
        return { issues };
      }
      // project Id specified
      const issues = data.filter(
        issue => +issue.project_id === defaultProjectId
      );
      return { issues };
    case viewIssuesActionTypes.FETCH_ISSUES_EMPTY:
      return { issues: [] };
    case viewIssuesActionTypes.FETCH_ISSUES_ERROR:
      message.error("Sorry, failed loading issues.");
      return state;
    default:
      return state;
  }
};

export default viewIssuesReducer;
