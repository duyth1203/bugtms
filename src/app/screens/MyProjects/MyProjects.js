import React from "react";
import PanelSkeleton from "../components/PanelSkeleton";

const MyProjects = props => {
  const { projectsActive, projectsClosed } = props;

  const cols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Pending bugs",
      dataIndex: "pending_bugs",
      key: "pending_bugs"
    },
    {
      title: "Fixed bugs",
      dataIndex: "fixed_bugs",
      key: "fixed_bugs"
    },
    {
      title: "Finish bugs",
      dataIndex: "finished_bugs",
      key: "finished_bugs"
    }
  ];

  const dataSrc = {
    active: projectsActive.map(pj => ({
      name: pj.project_name,
      pending_bugs: pj.pending_bug,
      fixed_bugs: pj.fixed_bug,
      finished_bugs: pj.finished_bug
    })),
    closed: projectsClosed.map(pj => ({
      name: pj.project_name,
      pending_bugs: pj.pending_bug,
      fixed_bugs: pj.fixed_bug,
      finished_bugs: pj.finished_bug
    }))
  };

  return (
    <div className="app-content">
      <PanelSkeleton
        header="Active projects"
        cols={cols}
        data={dataSrc.active}
        totalPage={Math.ceil(dataSrc.active.length / 10)}
      />
      <br />
      <PanelSkeleton
        header="Closed projects"
        cols={cols}
        data={dataSrc.closed}
        totalPage={Math.ceil(dataSrc.closed.length / 10)}
      />
    </div>
  );
};

export default MyProjects;
