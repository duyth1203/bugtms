import moment from "moment";
import * as reportIssueActionTypes from "../constants/reportIssueActionTypes";

export const postIssue = result => ({
  type: reportIssueActionTypes.POST_ISSUE,
  result
});

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

  return fetch("http://localhost:3001/issues", {
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
    .then(json => dispatch(postIssue(json)))
    .catch(err => dispatch(postIssue({ status: 500 })));
};

export const handleFormInputChange = event => ({
  type: reportIssueActionTypes.HANDLE_FORM_INPUT_CHANGE,
  event
});
