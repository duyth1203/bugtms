import * as viewIssuesActionTypes from "../constants/viewIssuesActionTypes";
import localStorageHelper from "../../utils/localStorageHelper";

export const fetchIssues = (issues, defaultProjectId) => ({
  type: viewIssuesActionTypes.FETCH_ISSUES,
  issues,
  defaultProjectId
});

export const fetchIssuesRequest = () => dispatch => {
  const defaultProjectId = localStorageHelper.getItemLocalStorage(
      "defaultProjectId"
    ),
    userId =
      localStorageHelper.getItemLocalStorage("user") &&
      localStorageHelper.getItemLocalStorage("user").id;

  const fetchFrom =
    defaultProjectId === -1
      ? `http://localhost:3001/issues/getByProjectOfUser/${userId}`
      : `http://localhost:3001/issues/getByProject/${defaultProjectId}`;

  return fetch(fetchFrom)
    .then(resp => resp.json())
    .then(json => dispatch(fetchIssues(json, +defaultProjectId)))
    .catch(err => dispatch(fetchIssues({ status: 500 })));
};
