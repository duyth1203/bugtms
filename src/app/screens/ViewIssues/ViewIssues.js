import React from "react";
import Table from "antd/lib/table";

const ViewIssues = props => {
  const dataSrc = props.issues.map(issue => ({
    key: issue.id,
    id: issue.id,
    bug_note: issue.bug_note,
    attachment: issue.attachment,
    category: issue.category,
    status: issue.status,
    updated: issue.updated,
    summary: issue.summary
  }));

  const cols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Notes",
      dataIndex: "bug_note",
      key: "bug_note"
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
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
      <Table dataSource={dataSrc} columns={cols} />
    </div>
  );
};

export default ViewIssues;
