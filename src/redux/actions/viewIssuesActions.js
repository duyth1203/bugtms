import { getCookie } from "tiny-cookie";
import * as viewIssuesActionTypes from "../constants/viewIssuesActionTypes";

export const fetchIssuesRequest = projectId => dispatch => {
  const defaultProjectId = projectId || +getCookie("defaultProjectId"),
    userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId)
    return dispatch({
      type: viewIssuesActionTypes.FETCH_ISSUES_ERROR
    });

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/issues/getByProjectOfUser/${userId}`
      : `http://localhost:3001/issues/getByProject/${defaultProjectId}`;

  fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => {
      const { status, data } = json;
      switch (status) {
        case 0:
          dispatch({
            type: viewIssuesActionTypes.FETCH_ISSUES_SUCCESS,
            data,
            defaultProjectId
          });
          break;
        // 404: empty
        default:
          dispatch({ type: viewIssuesActionTypes.FETCH_ISSUES_EMPTY });
          break;
      }
    })
    .catch(error =>
      dispatch({
        type: viewIssuesActionTypes.FETCH_ISSUES_ERROR,
        error
      })
    );
};
