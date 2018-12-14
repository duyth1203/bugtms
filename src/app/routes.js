import React from "react";
import MyProjectsContainer from "./screens/MyProjects/MyProjectsContainer";
import MyViewContainer from "./screens/MyView/MyViewContainer";
// import NotFound from "./screens/NotFound/NotFound";
import ProjectSelectorContainer from "./screens/ProjectSelector/ProjectSelectorContainer";
import ReportIssueContainer from "./screens/ReportIssue/ReportIssueContainer";
import UpdateIssueContainer from "./screens/UpdateIssue/UpdateIssueContainer";
import ViewIssuesContainer from "./screens/ViewIssues/ViewIssuesContainer";
import ViewIssueDetailsContainer from "./screens/ViewIssueDetails/ViewIssueDetailsContainer";
import NewProjectContainer from "./screens/NewProject/NewProjectContainer";
import LoginContainer from "./screens/Login/LoginContainer";
import CommentContainer from "./screens/components/Comment/CommentContainer";
import ProjectSelectRedirect from "./screens/components/ProjectSelectRedirect";
import Rediretor from "./components/Rediretor";
import authHelper from "../utils/authHelper";

const AppRoutes = [
  {
    path: "/",
    exact: true,
    isPrivate: true,
    component: props => <MyProjectsContainer {...props} />
  },
  {
    path: "/my-view",
    exact: true,
    isPrivate: true,
    component: props => <MyViewContainer {...props} />
  },
  {
    path: "/my-projects",
    exact: true,
    isPrivate: true,
    component: props => <MyProjectsContainer {...props} />
  },
  {
    path: "/view-issues",
    exact: true,
    isPrivate: true,
    component: props => <ViewIssuesContainer {...props} />
  },
  {
    path: "/view-issues/:id",
    exact: true,
    isPrivate: true,
    component: props => (
      <React.Fragment>
        <ViewIssueDetailsContainer {...props} />
        <CommentContainer {...props} />
      </React.Fragment>
    )
  },
  {
    path: "/select-project",
    exact: true,
    isPrivate: true,
    component: props => <ProjectSelectorContainer {...props} />
  },
  {
    path: "/report-issue",
    exact: true,
    isPrivate: true,
    component: props => <ReportIssueContainer {...props} />
  },
  {
    path: "/update-issue",
    exact: true,
    isPrivate: true,
    component: props => <UpdateIssueContainer {...props} />
  },
  {
    path: "/my-projects/:id",
    exact: true,
    isPrivate: true,
    component: props => <ProjectSelectRedirect {...props} />
  },
  {
    path: "/new-project",
    exact: true,
    isPrivate: true,
    component: props => <NewProjectContainer {...props} />
  },
  {
    path: "/log-out",
    exact: false,
    isPrivate: false,
    component: () => <Rediretor to="/" cb={authHelper.logout} />
  },
  {
    path: "/login",
    exact: true,
    isPrivate: false,
    component: props => <LoginContainer {...props} />
  },

  {
    path: "/redirect",
    exact: true,
    isPrivate: false,
    component: props => <Rediretor {...props} />
  }
  // {
  //   path: "",
  //   exact: false,
  //   isPrivate: false,
  //   component: () => <NotFound />
  // }
];

export default AppRoutes;
