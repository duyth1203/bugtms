import * as myViewActionTypes from "../constants/myViewActionTypes";
import { getCookie } from "tiny-cookie";

export const fetchUnAssignedIssuesRequest = () => dispatch => {
  const defaultProjectId = +getCookie("defaultProjectId") || -1,
    userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId)
    return dispatch({
      type: myViewActionTypes.FETCH_UNASSIGNED_ISSUES_ERROR
    });

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getUnassign/${userId}/1`
      : `http://localhost:3001/myview/getUnassignP/${userId}/1/${defaultProjectId}`;

  fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: issues } = json;
      switch (status) {
        case 0:
          dispatch({
            type: myViewActionTypes.FETCH_UNASSIGNED_ISSUES_SUCCESS,
            issues
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: myViewActionTypes.FETCH_UNASSIGNED_ISSUES_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({
        type: myViewActionTypes.FETCH_UNASSIGNED_ISSUES_ERROR,
        error
      })
    );
};

export const fetchResolvedIssuesRequest = () => dispatch => {
  const defaultProjectId = +getCookie("defaultProjectId") || -1,
    userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId)
    return dispatch({
      type: myViewActionTypes.FETCH_RESOLVED_ISSUES_ERROR
    });

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getIsResolve/${userId}/1`
      : `http://localhost:3001/myview/getIsResolveP/${userId}/1/${defaultProjectId}`;

  fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: issues } = json;
      switch (status) {
        case 0:
          dispatch({
            type: myViewActionTypes.FETCH_RESOLVED_ISSUES_SUCCESS,
            issues
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: myViewActionTypes.FETCH_RESOLVED_ISSUES_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({
        type: myViewActionTypes.FETCH_RESOLVED_ISSUES_ERROR,
        error
      })
    );
};

export const fetchLast30DaysIssuesRequest = () => dispatch => {
  const defaultProjectId = +getCookie("defaultProjectId") || -1,
    userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId)
    return dispatch({
      type: myViewActionTypes.FETCH_LAST30DAYS_ISSUES_ERROR
    });

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/getLast30Days/${userId}/1`
      : `http://localhost:3001/myview/getLast30DaysP/${userId}/1/${defaultProjectId}`;

  fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: issues } = json;
      switch (status) {
        case 0:
          dispatch({
            type: myViewActionTypes.FETCH_LAST30DAYS_ISSUES_SUCCESS,
            issues
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: myViewActionTypes.FETCH_LAST30DAYS_ISSUES_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({
        type: myViewActionTypes.FETCH_LAST30DAYS_ISSUES_ERROR,
        error
      })
    );
};

export const fetchTimeLineRequest = () => dispatch => {
  const defaultProjectId = +getCookie("defaultProjectId") || -1,
    userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId)
    return dispatch({
      type: myViewActionTypes.FETCH_TIMELINE_ERROR
    });

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/myview/timeline/${userId}/1`
      : `http://localhost:3001/myview/timelineP/${userId}/1/${defaultProjectId}`;

  fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: timeLine } = json;
      switch (status) {
        case 0:
          dispatch({
            type: myViewActionTypes.FETCH_TIMELINE_SUCCESS,
            timeLine
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: myViewActionTypes.FETCH_TIMELINE_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({
        type: myViewActionTypes.FETCH_TIMELINE_ERROR,
        error
      })
    );
};
