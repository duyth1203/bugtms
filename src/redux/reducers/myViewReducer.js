import message from "antd/lib/message";
import * as myViewActionTypes from "../constants/myViewActionTypes";

const initState = {
  issuesUnassigned: [],
  issuesResolved: [],
  issuesLast30Days: [],
  timeLine: []
};

const myViewReducer = (state = initState, action) => {
  switch (action.type) {
    case myViewActionTypes.FETCH_UNASSIGNED_ISSUES_SUCCESS:
      const {
        issues: { Unassign }
      } = action;
      const issuesUnassigned = Unassign.map(
        ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        }) => ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        })
      );
      return { ...state, issuesUnassigned };
    case myViewActionTypes.FETCH_UNASSIGNED_ISSUES_EMPTY:
      return { ...state, issuesUnassigned: [] };
    case myViewActionTypes.FETCH_UNASSIGNED_ISSUES_ERROR:
      message.error("Sorry, failed loading unassigned issues.");
      return state;

    case myViewActionTypes.FETCH_RESOLVED_ISSUES_SUCCESS:
      const {
        issues: { isResolve }
      } = action;
      const issuesResolved = isResolve.map(
        ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        }) => ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        })
      );
      return { ...state, issuesResolved };
    case myViewActionTypes.FETCH_RESOLVED_ISSUES_EMPTY:
      return { ...state, issuesResolved: [] };
    case myViewActionTypes.FETCH_RESOLVED_ISSUES_ERROR:
      message.error("Sorry, failed loading resolved issues.");
      return state;

    case myViewActionTypes.FETCH_LAST30DAYS_ISSUES_SUCCESS:
      const {
        issues: { Last30days }
      } = action;
      const issuesLast30Days = Last30days.map(
        ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        }) => ({
          name,
          idIssue,
          category,
          statusIssue,
          summary,
          dayTime,
          status
        })
      );
      return { ...state, issuesLast30Days };
    case myViewActionTypes.FETCH_LAST30DAYS_ISSUES_EMPTY:
      return { ...state, issuesLast30Days: [] };
    case myViewActionTypes.FETCH_LAST30DAYS_ISSUES_ERROR:
      message.error("Sorry, failed loading last 30 days issues.");
      return state;

    case myViewActionTypes.FETCH_TIMELINE_SUCCESS:
      const {
        timeLine: { timeLine: _timeLine }
      } = action;
      const timeLine = _timeLine.map(
        ({ id, userId, username, idIssue, dayTime, status }) => ({
          id,
          userId,
          username,
          idIssue,
          dayTime,
          status
        })
      );
      return { ...state, timeLine };
    case myViewActionTypes.FETCH_TIMELINE_EMPTY:
      return { ...state, timeLine: [] };
    case myViewActionTypes.FETCH_TIMELINE_ERROR:
      message.error("Sorry, failed loading timeline.");
      return state;

    default:
      return state;
  }
};

export default myViewReducer;
