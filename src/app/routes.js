import React from "react";
import DocsContainer from "./screens/Docs/DocsContainer";
import MyProjectsContainer from "./screens/MyProjects/MyProjectsContainer";
import MyViewContainer from "./screens/MyView/MyViewContainer";
import NotFound from "./screens/NotFound/NotFound";
import ReportIssueContainer from "./screens/ReportIssue/ReportIssueContainer";
import SummaryContainer from "./screens/Summary/SummaryContainer";
import ViewIssuesContainer from "./screens/ViewIssues/ViewIssuesContainer";
import ViewIssueDetailsContainer from "./screens/ViewIssueDetails/ViewIssueDetailsContainer";
import CommentViewContainer from "./screens/components/CommentView/CommentViewContainer";
import RedirectWrapper from "./screens/components/RedirectWrapper";
import LogOut from "./screens/components/LogOut";

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
        <CommentViewContainer {...props} />
      </React.Fragment>
    )
  },
  {
    path: "/report-issue",
    exact: true,
    isPrivate: true,
    component: props => (
      <RedirectWrapper>
        <ReportIssueContainer {...props} />
      </RedirectWrapper>
    )
  },
  {
    path: "/summary",
    exact: true,
    isPrivate: true,
    component: () => <SummaryContainer />
  },
  {
    path: "/docs",
    exact: true,
    isPrivate: true,
    component: () => <DocsContainer />
  },
  {
    path: "/log-out",
    exact: false,
    isPrivate: false,
    component: () => <LogOut />
  },
  {
    path: "",
    exact: false,
    isPrivate: false,
    component: () => <NotFound />
  }
];

export default AppRoutes;
