import * as viewIssueDetailsActionTypes from "../constants/viewIssueDetailsActionTypes";

export const fetchIssueDetails = issueDetails => ({
  type: viewIssueDetailsActionTypes.FETCH_ISSUE_DETAILS,
  issueDetails
});

export const fetchIssueDetailsRequest = issueId => dispatch =>
  fetch(`http://localhost:3001/issues/${issueId}`)
    .then(resp => resp.json())
    .then(json => dispatch(fetchIssueDetails(json)))
    .catch(err => dispatch(fetchIssueDetails({ status: 500 })));
