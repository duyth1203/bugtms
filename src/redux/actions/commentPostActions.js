import * as commentPostActionTypes from "../constants/commentPostActionTypes";

export const postComment = result => ({
  type: commentPostActionTypes.POST_COMMENT,
  result
});

export const postCommentRequest = (inputs, cb) => dispatch => {
  const { note_content, defaultProjectId, userId, issueId } = inputs;

  return fetch(
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
      dispatch(postComment(json));
    })
    .catch(err => dispatch(postComment({ status: 500 })));
};

export const handleCommentChange = event => ({
  type: commentPostActionTypes.HANDLE_COMMENT_CHANGE,
  event
});
