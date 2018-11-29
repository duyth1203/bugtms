import * as myViewActionTypes from "../constants/myViewActionTypes";
import localStorageHelper from "../../utils/localStorageHelper";

export const fetchUnAssignedIssues = issues => ({
  type: myViewActionTypes.FETCH_UNASSIGNED_ISSUES,
  issues
});

export const fetchUnAssignedIssuesRequest = () => dispatch => {
  const defaultProjectId =
      localStorageHelper.getItemLocalStorage("defaultProjectId") || -1,
    userId =
      localStorageHelper.getItemLocalStorage("user") &&
      localStorageHelper.getItemLocalStorage("user").id;

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getUnassign/${userId}/1`
      : `http://localhost:3001/myview/getUnassignP/${userId}/1/${defaultProjectId}`;

  return fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => dispatch(fetchUnAssignedIssues(json)))
    .catch(err => dispatch(fetchUnAssignedIssues({ status: 500 })));
};

export const fetchResolvedIssues = issues => ({
  type: myViewActionTypes.FETCH_RESOLVED_ISSUES,
  issues
});

export const fetchResolvedIssuesRequest = () => dispatch => {
  const defaultProjectId =
      localStorageHelper.getItemLocalStorage("defaultProjectId") || -1,
    userId =
      localStorageHelper.getItemLocalStorage("user") &&
      localStorageHelper.getItemLocalStorage("user").id;

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getIsResolve/${userId}/1`
      : `http://localhost:3001/myview/getIsResolveP/${userId}/1/${defaultProjectId}`;

  return fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => dispatch(fetchResolvedIssues(json)))
    .catch(err => dispatch(fetchResolvedIssues({ status: 500 })));
};

export const fetchLast30DaysIssues = issues => ({
  type: myViewActionTypes.FETCH_LAST30DAYS_ISSUES,
  issues
});

export const fetchLast30DaysIssuesRequest = () => dispatch => {
  const defaultProjectId =
      localStorageHelper.getItemLocalStorage("defaultProjectId") || -1,
    userId =
      localStorageHelper.getItemLocalStorage("user") &&
      localStorageHelper.getItemLocalStorage("user").id;

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getLast30Days/${userId}/1`
      : `http://localhost:3001/myview/getLast30DaysP/${userId}/1/${defaultProjectId}`;

  return fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => dispatch(fetchLast30DaysIssues(json)))
    .catch(err => dispatch(fetchLast30DaysIssues({ status: 500 })));
};

export const fetchTimeLine = timeLine => ({
  type: myViewActionTypes.FETCH_TIMELINE,
  timeLine
});

export const fetchTimeLineRequest = () => dispatch => {
  const defaultProjectId =
      localStorageHelper.getItemLocalStorage("defaultProjectId") || -1,
    userId =
      localStorageHelper.getItemLocalStorage("user") &&
      localStorageHelper.getItemLocalStorage("user").id;

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/timeline/${userId}/1`
      : `http://localhost:3001/myview/timelineP/${userId}/1/${defaultProjectId}`;

  return fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => dispatch(fetchTimeLine(json)))
    .catch(err => dispatch(fetchTimeLine({ status: 500 })));
};
