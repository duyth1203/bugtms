import React from "react";
import { Link } from "react-router-dom";
import Table from "antd/lib/table";

const ViewIssueDetails = props => {
  let { issueDetails } = props;
  if (!issueDetails) issueDetails = {};

  const {
    id,
    project_id,
    category,
    last_update,
    date_submitted,
    statusIssue,
    resolution,
    reporter,
    assign_to,
    priority,
    severity,
    summary,
    description
  } = issueDetails;

  const dataSrc_5 = [
    {
      key: 1,
      id,
      project_id,
      category,
      last_update,
      date_submitted
    }
  ];

  const dataSrc_4_1 = [
    {
      key: 2,
      statusIssue,
      resolution,
      reporter,
      assign_to
    }
  ];

  const dataSrc_4_2 = [
    {
      key: 3,
      priority,
      severity,
      summary,
      description
    }
  ];

  const cols_5 = [
    {
      title: "Issue ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Project ID",
      dataIndex: "project_id",
      key: "project_id"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Last update",
      dataIndex: "last_update",
      key: "last_update"
    },
    {
      title: "Date submitted",
      dataIndex: "date_submitted",
      key: "date_submitted"
    }
  ];

  const cols_4_1 = [
    {
      title: "Status",
      dataIndex: "statusIssue",
      key: "statusIssue"
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
      key: "resolution"
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter"
    },
    {
      title: "Assigned to",
      dataIndex: "assign_to",
      key: "assign_to"
    }
  ];

  const cols_4_2 = [
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority"
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity"
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    }
  ];

  return (
    <div>
      <h1>Issue Details</h1>
      <Link to="/view-issues">
        <p>&larr; &nbsp; view all issues</p>
      </Link>

      <Table columns={cols_5} dataSource={dataSrc_5} pagination={false} />
      <Table columns={cols_4_1} dataSource={dataSrc_4_1} pagination={false} />
      <Table columns={cols_4_2} dataSource={dataSrc_4_2} pagination={false} />
    </div>
  );
};

export default ViewIssueDetails;
