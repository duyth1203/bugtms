import { combineReducers } from "redux";
import myProjectsReducer from "./myProjectsReducer";
import viewIssuesReducer from "./viewIssuesReducer";
import myViewReducer from "./myViewReducer";
import reportIssueReducer from "./reportIssueReducer";
import viewIssueDetailsReducer from "./viewIssueDetailsReducer";
import commentViewReducer from "./commentViewReducer";
import commentPostReducer from "./commentPostReducer";

const indexReducer = combineReducers({
  myProjects: myProjectsReducer,
  viewIssues: viewIssuesReducer,
  myView: myViewReducer,
  reportIssue: reportIssueReducer,
  viewIssueDetails: viewIssueDetailsReducer,
  commentView: commentViewReducer,
  commentPost: commentPostReducer
});

export default indexReducer;
