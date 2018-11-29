import * as commentViewActionTypes from "../constants/commentViewActionTypes";

export const fetchComments = result => ({
  type: commentViewActionTypes.FETCH_COMMENTS,
  result
});

export const fetchCommentsRequest = issueId => dispatch =>
  fetch(`http://localhost:3001/getnote/${issueId}`)
    .then(resp => resp.json())
    .then(json =>
      dispatch(
        fetchComments({
          data: json,
          status: json.length > 0 ? 0 : 404
        })
      )
    )
    .catch(err => dispatch(fetchComments({ status: 500 })));
