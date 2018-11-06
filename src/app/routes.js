import React from "react";
import DocsContainer from "./screens/Docs/DocsContainer";
import MyProjectsContainer from "./screens/MyProjects/MyProjectsContainer";
import MyViewContainer from "./screens/MyView/MyViewContainer";
import NotFound from "./screens/NotFound/NotFound";
import ReportIssueContainer from "./screens/ReportIssue/ReportIssueContainer";
import SummaryContainer from "./screens/Summary/SummaryContainer";
import ViewIssuesContainer from "./screens/ViewIssues/ViewIssuesContainer";
// import LoginContainer from "./screens/Login/LoginContainer";

const AppRoutes = [
  {
    path: "/",
    exact: true,
    isPrivate: true,
    component: () => <MyViewContainer />
  },
  {
    path: "/my-view",
    exact: false,
    isPrivate: true,
    component: () => <MyViewContainer />
  },
  {
    path: "/my-projects",
    exact: false,
    isPrivate: true,
    component: () => <MyProjectsContainer />
  },
  {
    path: "/view-issues",
    exact: false,
    isPrivate: true,
    component: () => <ViewIssuesContainer />
  },
  {
    path: "/report-issue",
    exact: false,
    isPrivate: true,
    component: () => <ReportIssueContainer />
  },
  {
    path: "/summary",
    exact: false,
    isPrivate: true,
    component: () => <SummaryContainer />
  },
  {
    path: "/docs",
    exact: false,
    isPrivate: true,
    component: () => <DocsContainer />
  },
  // {
  //   path: "/login",
  //   exact: true,
  //   isPrivate: false,
  //   component: ({ location }) => <LoginContainer {...location} />
  // },
  {
    path: "",
    exact: false,
    isPrivate: false,
    component: () => <NotFound />
  }
];

export default AppRoutes;
