import message from "antd/lib/message";
import * as myProjectActionTypes from "../constants/myProjectActionTypes";

const initState = {
  activeProjects: [],
  closedProjects: []
};

const myProjectsReducer = (state = initState, action) => {
  switch (action.type) {
    case myProjectActionTypes.FETCH_ACTIVE_PROJECT_SUCCESS:
      const { projects: activeProjects } = action;
      return { ...state, activeProjects };
    case myProjectActionTypes.FETCH_ACTIVE_PROJECT_EMPTY:
      return { ...state, activeProjects: [] };
    case myProjectActionTypes.FETCH_ACTIVE_PROJECT_ERROR:
      message.error("Sorry, failed loading active projects.");
      return state;
    case myProjectActionTypes.FETCH_CLOSED_PROJECT_SUCCESS:
      const { projects: closedProjects } = action;
      return { ...state, closedProjects };
    case myProjectActionTypes.FETCH_CLOSED_PROJECT_EMPTY:
      return { ...state, closedProjects: [] };
    case myProjectActionTypes.FETCH_CLOSED_PROJECT_ERROR:
      message.error("Sorry, failed loading closed projects.");
      return state;
    default:
      return state;
  }
};

export default myProjectsReducer;
