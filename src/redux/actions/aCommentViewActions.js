import * as aCommentViewActionTypes from "../constants/aCommentViewActionTypes";

export const deleteACommentRequest = (noteId, cb) => dispatch =>
  fetch(`http://localhost:3001/deletenote/${noteId}`, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(json => {
      cb && cb();
      const {
        result: { status }
      } = json;
      if (status !== 404)
        dispatch({ type: aCommentViewActionTypes.DELETE_A_COMMENT_SUCCESS });
      else dispatch({ type: aCommentViewActionTypes.DELETE_A_COMMENT_ERROR });
    })
    .catch(error =>
      dispatch({ type: aCommentViewActionTypes.DELETE_A_COMMENT_ERROR }, error)
    );
