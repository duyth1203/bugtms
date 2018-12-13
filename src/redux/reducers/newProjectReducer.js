import message from "antd/lib/message";
import moment from "moment";
import * as newProjectActionTypes from "../constants/newProjectActionTypes";

const initState = {
  member: [],
  name: "",
  type: "",
  deadline: moment().format("YYYYMMDD"),
  manager: "",
  project_manager: "",
  project_leader: "",
  programming_language: "Others",
  db: "Others",
  platform: "Others",
  professional_business: "",
  web_server: "",
  managerment: "",
  application_server: "",
  system_networking: "",
  users: []
};

const newProjectReducer = (state = initState, action) => {
  switch (action.type) {
    case newProjectActionTypes.POST_PROJECT_SUCCESS:
      message.success("Successfully added new project.");
      return state;
    case newProjectActionTypes.POST_PROJECT_ERROR:
      message.error("Sorry, failed adding new project.");
      return state;
    case newProjectActionTypes.FETCH_USERS_SUCCESS:
      const { users } = action;
      return { ...state, users };
    case newProjectActionTypes.FETCH_USERS_EMPTY:
      return { ...state, users: [] };
    case newProjectActionTypes.FETCH_USERS_ERROR:
      message.error("Sorry, failed fetching user list");
      return state;
    case newProjectActionTypes.HANDLE_FORM_INPUT_CHANGE:
      const {
        event: { target }
      } = action;
      const value = target.type === "checkbox" ? target.checked : target.value,
        name = target.name;
      return { ...state, [name]: value };
    default:
      return state;
  }
};

export default newProjectReducer;
