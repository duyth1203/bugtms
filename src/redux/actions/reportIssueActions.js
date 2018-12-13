import moment from "moment";
import * as reportIssueActionTypes from "../constants/reportIssueActionTypes";

export const postIssueRequest = inputs => dispatch => {
  const {
    defaultProjectId,
    userId,
    category,
    statusIssue,
    summary,
    description,
    severity,
    priority,
    assign_to,
    reporter,
    resolution
  } = inputs;

  fetch("http://localhost:3001/issues", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_Id: userId,
      project_id: defaultProjectId,
      // attachment,
      category,
      statusIssue,
      last_updated: moment().format("YYYYMMDD") + "000000",
      data_submitted: moment().format("YYYYMMDD") + "000000",
      summary,
      description,
      severity,
      priority,
      assign_to,
      reporter,
      resolution
    })
  })
    .then(resp => resp.json())
    .then(json => {
      const {
        result: { status }
      } = json;
      switch (status) {
        case 0:
          dispatch({ type: reportIssueActionTypes.POST_ISSUE_SUCCESS });
          break;
        default:
          dispatch({ type: reportIssueActionTypes.POST_ISSUE_ERROR });
          break;
      }
    })
    .catch(error =>
      dispatch({ type: reportIssueActionTypes.POST_ISSUE_ERROR, error })
    );
};

export const updateIssueRequest = inputs => dispatch => {
  const {
    issueId,
    defaultProjectId,
    userId,
    category,
    statusIssue,
    summary,
    description,
    severity,
    priority,
    assign_to,
    reporter,
    resolution
  } = inputs;

  fetch(`http://localhost:3001/issues/${issueId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_Id: userId,
      project_id: defaultProjectId,
      // attachment,
      category,
      statusIssue,
      last_updated: moment().format("YYYYMMDD") + "000000",
      data_submitted: moment().format("YYYYMMDD") + "000000",
      summary,
      description,
      severity,
      priority,
      assign_to,
      reporter,
      resolution
    })
  })
    .then(resp => resp.json())
    .then(json => {
      const {
        result: { status }
      } = json;
      switch (status) {
        case 0:
          dispatch({ type: reportIssueActionTypes.UPDATE_ISSUE_SUCCESS });
          break;
        default:
          dispatch({ type: reportIssueActionTypes.UPDATE_ISSUE_ERROR });
          break;
      }
    })
    .catch(error =>
      dispatch({ type: reportIssueActionTypes.UPDATE_ISSUE_ERROR, error })
    );
};

export const fetchUsersRequest = projectId => dispatch => {
  if (projectId === undefined)
    return dispatch({ type: reportIssueActionTypes.FETCH_USERS_ERROR });

  fetch(`http://localhost:3001/loadUserByProject/${projectId}`)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: users } = json;
      switch (status) {
        case 0:
          dispatch({
            type: reportIssueActionTypes.FETCH_USERS_SUCCESS,
            users
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: reportIssueActionTypes.FETCH_USERS_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({ type: reportIssueActionTypes.FETCH_USERS_ERROR }, error)
    );
};

export const handleFormInputChange = event => ({
  type: reportIssueActionTypes.HANDLE_FORM_INPUT_CHANGE,
  event
});
