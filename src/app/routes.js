import React from "react";
import MyProjectsContainer from "./screens/MyProjects/MyProjectsContainer";
import MyViewContainer from "./screens/MyView/MyViewContainer";
import NotFound from "./screens/NotFound/NotFound";
import ReportIssueContainer from "./screens/ReportIssue/ReportIssueContainer";
import ViewIssuesContainer from "./screens/ViewIssues/ViewIssuesContainer";
import ViewIssueDetailsContainer from "./screens/ViewIssueDetails/ViewIssueDetailsContainer";
import CommentContainer from "./screens/components/Comment/CommentContainer";
import ProjectSelectRedirector from "./screens/components/ProjectSelectRedirector";
import LogOut from "./screens/components/LogOut";
import LoginContainer from "./screens/Login/LoginContainer";
import NewProjectContainer from "./screens/NewProject/NewProjectContainer";
import ProjectSelectRedirect from "./screens/components/ProjectSelectRedirect";

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
    path: "/report-issue",
    exact: true,
    isPrivate: true,
    component: props => (
      <ProjectSelectRedirector>
        <ReportIssueContainer {...props} />
      </ProjectSelectRedirector>
    )
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
    component: () => <LogOut />
  },
  {
    path: "/login",
    exact: true,
    isPrivate: false,
    component: props => <LoginContainer {...props} />
  },
  {
    path: "",
    exact: false,
    isPrivate: false,
    component: () => <NotFound />
  }
];

export default AppRoutes;
