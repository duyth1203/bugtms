import { getCookie } from "tiny-cookie";
import * as myProjectActionTypes from "../constants/myProjectActionTypes";

export const fetchActiveProjectsRequest = () => dispatch => {
  const userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId) return;

  fetch(`http://localhost:3001/myproject/active/${userId}`)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: projects } = json;
      if (status === 0)
        dispatch({
          type: myProjectActionTypes.FETCH_ACTIVE_PROJECT_SUCCESS,
          projects
        });
      else
        dispatch({
          type: myProjectActionTypes.FETCH_ACTIVE_PROJECT_EMPTY
        });
    })
    .catch(error =>
      dispatch(
        {
          type: myProjectActionTypes.FETCH_ACTIVE_PROJECT_ERROR
        },
        error
      )
    );
};

export const fetchClosedProjectsRequest = () => dispatch => {
  const userId = getCookie("user") && JSON.parse(getCookie("user")).id;
  if (!userId) return;

  fetch(`http://localhost:3001/myproject/closed/${userId}`)
    .then(resp => resp.json())
    .then(json => {
      const { status, data: projects } = json;
      if (status === 0)
        dispatch({
          type: myProjectActionTypes.FETCH_ACTIVE_PROJECT_SUCCESS,
          projects
        });
      else
        dispatch({
          type: myProjectActionTypes.FETCH_CLOSED_PROJECT_EMPTY
        });
    })
    .catch(error =>
      dispatch({
        type: myProjectActionTypes.FETCH_CLOSED_PROJECT_ERROR,
        error
      })
    );
};
