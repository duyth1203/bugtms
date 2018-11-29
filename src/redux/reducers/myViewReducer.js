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
    case myViewActionTypes.FETCH_UNASSIGNED_ISSUES:
      const {
        issues: { status: unassignedStatus, data: unassignedData }
      } = action;
      switch (unassignedStatus) {
        case 0:
          const { Unassign } = unassignedData;
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
        case 404:
          return { ...state, issuesUnassigned: [] };
        default:
          message.error("Sorry, failed loading unassigned issues.");
          return state;
      }

    case myViewActionTypes.FETCH_RESOLVED_ISSUES:
      const {
        issues: { status: resolvedStatus, data: resolvedData }
      } = action;
      switch (resolvedStatus) {
        case 0:
          const { isResolve } = resolvedData;
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
        case 404:
          return { ...state, issuesResolved: [] };
        default:
          message.error("Sorry, failed loading resolved issues.");
          return state;
      }

    case myViewActionTypes.FETCH_LAST30DAYS_ISSUES:
      const {
        issues: { status: last30DaysStatus, data: last30DaysData }
      } = action;
      switch (last30DaysStatus) {
        case 0:
          const { Last30days } = last30DaysData;
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
        case 404:
          return { ...state, issuesLast30days: [] };
        default:
          message.error("Sorry, failed loading last 30 days issues.");
          return state;
      }

    case myViewActionTypes.FETCH_TIMELINE:
      const {
        timeLine: { status: timeLineStatus, data: timeLineData }
      } = action;
      switch (timeLineStatus) {
        case 0:
          const { timeLine: _timeLine } = timeLineData;
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
        case 404:
          return { ...state, timeLine: [] };
        default:
          message.error("Sorry, failed loading timeline.");
          return state;
      }

    default:
      return state;
  }
};

export default myViewReducer;
