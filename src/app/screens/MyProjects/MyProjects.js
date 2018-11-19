import React from "react";
import { Link } from "react-router-dom";
import PanelSkeleton from "../components/PanelSkeleton/PanelSkeleton";

const MyProjects = props => {
  const { projectsActive, projectsClosed } = props;

  const dataSrc = {
    active:
      projectsActive &&
      projectsActive.map(pj => ({
        key: pj.project_id,
        by_project: pj.project_name,
        pending_bug: pj.pending_bug,
        fixed_bug: pj.fixed_bug,
        finished_bug: pj.finished_bug
      })),
    closed:
      projectsClosed &&
      projectsClosed.map(pj => ({
        key: pj.project_id,
        by_project: pj.project_name,
        pending_bug: pj.pending_bug,
        fixed_bug: pj.fixed_bug,
        finished_bug: pj.finished_bug
      }))
  };

  const cols = {
    active: [
      {
        title: "By Project",
        dataIndex: "by_project",
        key: "by_project"
      },
      {
        title: "Pending bug",
        dataIndex: "pending_bug",
        key: "pending_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.active[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      },
      {
        title: "Fixed bug",
        dataIndex: "fixed_bug",
        key: "fixed_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.active[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      },
      {
        title: "Finish bug",
        dataIndex: "finished_bug",
        key: "finished_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.active[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      }
    ],
    closed: [
      {
        title: "By Project",
        dataIndex: "by_project",
        key: "by_project"
      },
      {
        title: "Pending bug",
        dataIndex: "pending_bug",
        key: "pending_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.closed[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      },
      {
        title: "Fixed bug",
        dataIndex: "fixed_bug",
        key: "fixed_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.closed[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      },
      {
        title: "Finish bug",
        dataIndex: "finished_bug",
        key: "finished_bug",
        render: (txt, row, index) => (
          <Link
            to={{
              pathname: "/view-issues",
              state: {
                projectId: dataSrc.closed[index].key
              }
            }}
          >
            {txt}
          </Link>
        )
      }
    ]
  };

  return (
    <div className="app-content">
      <h1>My Projects</h1>
      <PanelSkeleton
        header="Active projects"
        cols={cols.active}
        data={dataSrc.active}
      />
      <br />
      <PanelSkeleton
        header="Closed projects"
        cols={cols.closed}
        data={dataSrc.closed}
      />
    </div>
  );
};

export default MyProjects;
