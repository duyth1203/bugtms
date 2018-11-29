import message from "antd/lib/message";
import * as myProjectActionTypes from "../constants/myProjectActionTypes";

const initState = {
  activeProjects: [],
  closedProjects: []
};

const myProjectsReducer = (state = initState, action) => {
  switch (action.type) {
    case myProjectActionTypes.FETCH_ACTIVE_PROJECT:
      const {
        activeProjects: { status: activeStatus, data: activeData }
      } = action;
      switch (activeStatus) {
        case 0:
          return { ...state, activeProjects: activeData };
        default:
          message.error("Sorry, failed loading active projects.");
          return state;
      }

    case myProjectActionTypes.FETCH_CLOSED_PROJECT:
      const {
        closedProjects: { status: closedStatus, data: closedData }
      } = action;
      switch (closedStatus) {
        case 0:
          return { ...state, closedProjects: closedData };
        default:
          message.error("Sorry, failed loading closed projects.");
          return state;
      }

    default:
      return state;
  }
};

export default myProjectsReducer;
