import React from "react";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import Popconfirm from "antd/lib/popconfirm";
import "./CommentView.css";

const ACommentView = props => {
  const {
    comment: { id, username, date_submitted, note_content },
    onChange,
    onDelete,
    onSubmitEdit
  } = props;

  const dataSrc = [{ summary: username, note_content }],
    title = () => (
      <div className="table__comment-title">
        <div className="comment__title">
          <span className="comment__title-index">#{id}</span> on{" "}
          {date_submitted}
        </div>
        <div className="comment__action">
          <Popconfirm title="Are you sure?" onConfirm={onDelete}>
            <Button size="small" className="comment__action-btn" type="danger">
              <Icon type="delete" />
            </Button>
          </Popconfirm>
          <span>&nbsp; </span>
          <Button size="small" className="comment__action-btn">
            <Icon type="edit" />
          </Button>
        </div>
      </div>
    );

  const cols = [
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: 150,
      render: username => <h3>{username}</h3>
    },
    {
      title: "Note content",
      dataIndex: "note_content",
      key: "note_content"
    }
  ];

  return (
    <Table
      className="table__comment"
      columns={cols}
      title={title}
      dataSource={dataSrc}
      pagination={false}
      bordered
      showHeader={false}
    />
  );
};

export default ACommentView;
