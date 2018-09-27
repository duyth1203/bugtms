import React from 'react';
import DocsContainer from './screens/Docs/DocsContainer';
import MyProjectsContainer from './screens/MyProjects/MyProjectsContainer';
import MyViewContainer from './screens/MyView/MyViewContainer';
import NotFound from './screens/NotFound/NotFound';
import ReportIssueContainer from './screens/ReportIssue/ReportIssueContainer';
import SummaryContainer from './screens/Summary/SummaryContainer';
import ViewIssuesContainer from './screens/ViewIssues/ViewIssuesContainer';

const AppRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <MyViewContainer />
  },
  {
    path: '/my-view',
    exact: false,
    component: () => <MyViewContainer />
  },
  {
    path: '/my-projects',
    exact: false,
    component: () => <MyProjectsContainer />
  },
  {
    path: '/view-issues',
    exact: false,
    component: () => <ViewIssuesContainer />
  },
  {
    path: '/report-issue',
    exact: false,
    component: () => <ReportIssueContainer />
  },
  {
    path: '/summary',
    exact: false,
    component: () => <SummaryContainer />
  },
  {
    path: '/docs',
    exact: false,
    component: () => <DocsContainer />
  },
  {
    path: '',
    exact: false,
    component: () => <NotFound />
  }
];

export default AppRoutes;
