import message from "antd/lib/message";
import * as viewIssuesActionTypes from "../constants/viewIssuesActionTypes";

const initState = {
  issues: []
};

const viewIssuesReducer = (state = initState, action) => {
  switch (action.type) {
    case viewIssuesActionTypes.FETCH_ISSUES:
      const {
        issues: { status, data },
        defaultProjectId
      } = action;
      switch (status) {
        case 0:
          if (defaultProjectId === -1) {
            const issues = [];
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].issueList.length; j++) {
                issues.push(data[i].issueList[j]);
              }
            }
            return { issues };
          } // project Id specified
          else {
            const issues = data.filter(
              issue => +issue.project_id === defaultProjectId
            );
            return { issues };
          }
        default:
          message.error("Sorry, failed loading issues.");
          return state;
      }

    default:
      return state;
  }
};

export default viewIssuesReducer;
