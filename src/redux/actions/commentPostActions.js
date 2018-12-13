import * as commentPostActionTypes from "../constants/commentPostActionTypes";

export const postCommentRequest = (inputs, cb) => dispatch => {
  const { note_content, defaultProjectId, userId, issueId } = inputs;

  fetch(
    `http://localhost:3001/postnote/${defaultProjectId}/${userId}/${issueId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ note_content })
    }
  )
    .then(resp => resp.json())
    .then(json => {
      cb && cb();
      const {
        result: { status }
      } = json;
      if (status !== 404)
        dispatch({
          type: commentPostActionTypes.POST_COMMENT_SUCCESS
        });
      else dispatch({ type: commentPostActionTypes.POST_COMMENT_ERROR });
    })
    .catch(error =>
      dispatch({ type: commentPostActionTypes.POST_COMMENT_ERROR, error })
    );
};

export const handleCommentChange = event => ({
  type: commentPostActionTypes.HANDLE_COMMENT_CHANGE,
  event
});
