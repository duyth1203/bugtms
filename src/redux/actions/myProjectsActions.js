import * as myProjectActionTypes from "../constants/myProjectActionTypes";
import localStorageHelper from "../../utils/localStorageHelper";

export const fetchActiveProjects = activeProjects => ({
  type: myProjectActionTypes.FETCH_ACTIVE_PROJECT,
  activeProjects
});

export const fetchActiveProjectsRequest = () => dispatch => {
  const user = localStorageHelper.getItemLocalStorage("user");

  return fetch(`http://localhost:3001/myproject/active/${user.id}`)
    .then(resp => resp.json())
    .then(json => dispatch(fetchActiveProjects(json)))
    .catch(err => dispatch(fetchActiveProjects({ status: 500 })));
};

export const fetchClosedProjects = closedProjects => ({
  type: myProjectActionTypes.FETCH_CLOSED_PROJECT,
  closedProjects
});

export const fetchClosedProjectsRequest = () => dispatch => {
  const user = localStorageHelper.getItemLocalStorage("user");

  return fetch(`http://localhost:3001/myproject/closed/${user.id}`)
    .then(resp => resp.json())
    .then(json => {
      dispatch(fetchClosedProjects(json));
    })
    .catch(err => dispatch(fetchClosedProjects({ status: 500 })));
};
