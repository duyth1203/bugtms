const AppSiderLinks = [
  {
    position: "top",
    links: [
      {
        to: "/my-projects",
        exact: "true",
        icon: "project",
        label: "My Projects"
      },
      {
        to: "/my-view",
        exact: "true",
        icon: "dashboard",
        label: "My View"
      },
      {
        to: "/view-issues",
        exact: "true",
        icon: "issues-close",
        label: "View Issues"
      },
      {
        to: "/report-issue",
        exact: "true",
        icon: "form",
        label: "Report Issue"
      },
      {
        to: "/summary",
        exact: "true",
        icon: "radar-chart",
        label: "Summary"
      },
      {
        to: "/docs",
        exact: "true",
        icon: "book",
        label: "Docs"
      }
    ]
  },
  {
    position: "bottom",
    links: [
      {
        icon: "project",
        label: "Projects",
        fetchFrom: "http://localhost:3001/myview/getProjectByUser/",
        sub: []
      },
      {
        icon: "user",
        label: "User",
        sub: [
          {
            to: "/log-out",
            exact: "false",
            icon: "logout",
            label: "Log out"
          }
        ]
      }
    ]
  }
];

export default AppSiderLinks;
