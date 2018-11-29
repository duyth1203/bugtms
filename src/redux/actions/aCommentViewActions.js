import * as aCommentViewActionTypes from "../constants/aCommentViewActionTypes";

export const deleteAComment = result => ({
  type: aCommentViewActionTypes.DELETE_A_COMMENT,
  result
});

export const deleteACommentRequest = (noteId, cb) => dispatch =>
  fetch(`http://localhost:3001/deletenote/${noteId}`, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(json => {
      cb && cb();
      dispatch(deleteAComment(json));
    })
    .catch(err => dispatch(deleteAComment({ status: 500 })));
