import React from "react";
import { Link } from "react-router-dom";
import Table from "antd/lib/table";

const ViewIssues = props => {
  const dataSrc = props.issues.map(issue => ({
    key: issue.id,
    id: issue.id,
    // attachment: issue.attachment,
    category: issue.category,
    severity: issue.severity,
    statusIssue: issue.statusIssue,
    updated: issue.last_update,
    summary: issue.summary
  }));

  const cols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: id => <Link to={`/view-issues/${id}`}>{id}</Link>
    },
    // {
    //   title: "Attachment",
    //   dataIndex: "attachment",
    //   key: "attachment"
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },

    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity"
    },
    {
      title: "Status",
      dataIndex: "statusIssue",
      key: "statusIssue"
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated"
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary"
    }
  ];

  return (
    <div className="app-content">
      <h1>View Issues</h1>
      <Table
        bordered
        dataSource={dataSrc}
        columns={cols}
        rowClassName={record =>
          record.statusIssue && record.statusIssue.toLowerCase()
        }
      />
    </div>
  );
};

export default ViewIssues;
