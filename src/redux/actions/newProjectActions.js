import * as newProjectActionTypes from "../constants/newProjectActionTypes";

export const postProjectRequest = (inputs, cb) => dispatch => {
  fetch("http://localhost:3001/projects", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...inputs })
  })
    .then(resp => resp.json())
    .then(json => {
      const { status } = json;
      switch (status) {
        case 0:
          cb && cb();
          dispatch({ type: newProjectActionTypes.POST_PROJECT_SUCCESS });
          break;
        // 404: failed
        default:
          dispatch({ type: newProjectActionTypes.POST_PROJECT_ERROR });
          break;
      }
    })
    .catch(error =>
      dispatch({ type: newProjectActionTypes.POST_PROJECT_ERROR, error })
    );
};

export const fetchUsersRequest = () => dispatch => {
  fetch("http://localhost:3001/users")
    .then(resp => resp.json())
    .then(json => {
      const { status, data: users } = json;
      switch (status) {
        case 0:
          dispatch({
            type: newProjectActionTypes.FETCH_USERS_SUCCESS,
            users
          });
          break;
        // 404: empty
        default:
          dispatch({
            type: newProjectActionTypes.FETCH_USERS_EMPTY
          });
          break;
      }
    })
    .catch(error =>
      dispatch({ type: newProjectActionTypes.FETCH_USERS_ERROR }, error)
    );
};

export const handleFormInputChange = event => ({
  type: newProjectActionTypes.HANDLE_FORM_INPUT_CHANGE,
  event
});
