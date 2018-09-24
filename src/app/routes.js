import React from 'react';
import ChangeLogContainer from './screens/ChangeLog/ChangeLogContainer';
import MyViewContainer from './screens/MyView/MyViewContainer';
import NotFound from './screens/NotFound/NotFound';
import RepoContainer from './screens/Repo/RepoContainer';
import ReportIssueContainer from './screens/ReportIssue/ReportIssueContainer';
import RoadMapContainer from './screens/RoadMap/RoadMapContainer';
import ViewIssuesContainer from './screens/ViewIssues/ViewIssuesContainer';
import WikiContainer from './screens/Wiki/WikiContainer';

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
    path: '/change-log',
    exact: false,
    component: () => <ChangeLogContainer />
  },
  {
    path: '/repo',
    exact: false,
    component: () => <RepoContainer />
  },
  {
    path: '/report-issue',
    exact: false,
    component: () => <ReportIssueContainer />
  },
  {
    path: '/road-map',
    exact: false,
    component: () => <RoadMapContainer />
  },
  {
    path: '/view-issues',
    exact: false,
    component: () => <ViewIssuesContainer />
  },
  {
    path: '/wiki',
    exact: false,
    component: () => <WikiContainer />
  },
  {
    path: '',
    exact: false,
    component: () => <NotFound />
  }
];

export default AppRoutes;
