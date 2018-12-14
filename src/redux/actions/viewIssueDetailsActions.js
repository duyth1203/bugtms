import * as viewIssueDetailsActionTypes from "../constants/viewIssueDetailsActionTypes";

export const fetchIssueDetailsRequest = issueId => dispatch =>
  fetch(`http://localhost:3001/issues/${issueId}`)
    .then(resp => resp.json())
    .then(json => {
      const { status, data } = json;
      if (status === 0)
        dispatch({
          type: viewIssueDetailsActionTypes.FETCH_ISSUE_DETAILS_SUCCESS,
          data
        });
      else
        dispatch({
          type: viewIssueDetailsActionTypes.FETCH_ISSUE_DETAILS_ERROR
        });
    })
    .catch(error =>
      dispatch(
        { type: viewIssueDetailsActionTypes.FETCH_ISSUE_DETAILS_ERROR },
        error
      )
    );
