import * as commentViewActionTypes from "../constants/commentViewActionTypes";

export const fetchCommentsRequest = issueId => dispatch =>
  fetch(`http://localhost:3001/getnote/${issueId}`)
    .then(resp => resp.json())
    .then(json => {
      // ! API return no status code
      if (json.length > 0)
        dispatch({
          type: commentViewActionTypes.FETCH_COMMENTS_SUCCESS,
          comments: json
        });
      else dispatch({ type: commentViewActionTypes.FETCH_COMMENTS_EMPTY });
    })
    .catch(error =>
      dispatch({ type: commentViewActionTypes.FETCH_COMMENTS_ERROR, error })
    );
