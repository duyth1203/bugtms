const AppSiderRoutes = [
  {
    position: 'top',
    links: [
      {
        to: 'my-view',
        exact: 'true',
        icon: 'dashboard',
        label: 'My View'
      },
      {
        to: 'view-issues',
        exact: 'true',
        icon: 'issues-close',
        label: 'View Issues'
      },
      {
        to: 'report-issue',
        exact: 'true',
        icon: 'form',
        label: 'Report Issue'
      },
      {
        to: 'change-log',
        exact: 'true',
        icon: 'retweet',
        label: 'Change Log'
      },
      {
        to: 'road-map',
        exact: 'true',
        icon: 'fund',
        label: 'Road Map'
      },
      {
        to: 'wiki',
        exact: 'true',
        icon: 'book',
        label: 'Wiki'
      },
      {
        to: 'repo',
        exact: 'true',
        icon: 'branches',
        label: 'Repositories'
      }
    ]
  },
  {
    position: 'bottom',
    links: [
      {
        icon: 'project',
        label: 'Project',
        sub: []
      },
      {
        icon: 'user',
        label: 'User',
        sub: [
          {
            to: 'logout',
            exact: 'true',
            icon: 'logout',
            label: 'Log out'
          }
        ]
      }
    ]
  }
];

export default AppSiderRoutes;
