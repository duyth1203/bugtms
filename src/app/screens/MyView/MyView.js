import React from "react";
import { Link } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PanelSkeleton from "../components/PanelSkeleton/PanelSkeleton";
import localStorageHelper from "../../../utils/localStorageHelper";

const MyView = props => {
  const { issuesUnassign, issuesIsResolve, issuesLast30Days, timeLine } = props;

  const renderPanelIssue = txt => {
    const projectNameIndex = txt.indexOf("@projectname") + 12,
      summaryIndex = txt.indexOf("@summary") + 8,
      categoryIndex = txt.indexOf("@category") + 9,
      dayTimeIndex = txt.indexOf("@daytime") + 8;
    // return if nothing found
    if (
      projectNameIndex - 12 === -1 &&
      summaryIndex - 8 === -1 &&
      categoryIndex - 9 === -1 &&
      dayTimeIndex - 8 === -1
    )
      return txt;

    const projectName = txt.substring(projectNameIndex, summaryIndex - 8),
      summary = txt.substring(summaryIndex, categoryIndex - 9),
      category = txt.substring(categoryIndex, dayTimeIndex - 8),
      dayTime = txt.substring(dayTimeIndex);
    return (
      <div>
        {projectName ? (
          <span>
            {projectName}&nbsp;<b>{summary}</b>
          </span>
        ) : (
          { summary }
        )}
        <br />
        <span style={{ fontSize: "0.9em" }}>
          {category}&nbsp;{dayTime}
        </span>
      </div>
    );
  };

  const renderPanelTimeLine = txt => {
    const usernameIndex = txt.indexOf("@username") + 9,
      issueIdIndex = txt.indexOf("@idissue") + 8,
      dayTimeIndex = txt.lastIndexOf("@daytime") + 8;
    // return if nothing found
    if (
      usernameIndex - 9 === -1 &&
      issueIdIndex - 8 === -1 &&
      dayTimeIndex - 8 === -1
    )
      return txt;

    const username = txt.substring(usernameIndex, issueIdIndex - 8),
      issueId = txt.substring(issueIdIndex, dayTimeIndex - 8),
      dayTime = txt.substring(dayTimeIndex);
    return (
      <span>
        <b>{username}</b>&nbsp;commented&nbsp;on&nbsp;issue&nbsp;
        <Link to={`/view-issues/${issueId}`}>{issueId}</Link>
        &nbsp;on&nbsp;
        {dayTime}
      </span>
    );
  };

  const cols = {
    unassign: [
      {
        title: "Issue ID",
        dataIndex: "idIssue",
        key: "idIssue",
        render: id => <Link to={`/view-issues/${id}`}>{id}</Link>,
        width: 95
      },
      {
        title: "General Info",
        dataIndex: "general_info",
        key: "general_info",
        render: txt => renderPanelIssue(txt)
      }
    ],
    isResolve: [
      {
        title: "Issue ID",
        dataIndex: "idIssue",
        key: "idIssue",
        render: id => <Link to={`/view-issues/${id}`}>{id}</Link>,
        width: 95
      },
      {
        title: "General Info",
        dataIndex: "general_info",
        key: "general_info",
        render: txt => renderPanelIssue(txt)
      }
    ],
    last30Days: [
      {
        title: "Issue ID",
        dataIndex: "idIssue",
        key: "idIssue",
        render: id => <Link to={`/view-issues/${id}`}>{id}</Link>,
        width: 95
      },
      {
        title: "General Info",
        dataIndex: "general_info",
        key: "general_info",
        render: txt => renderPanelIssue(txt)
      }
    ],
    timeLine: [
      {
        title: "What's happened recently",
        dataIndex: "timeline",
        key: "timeline",
        render: txt => renderPanelTimeLine(txt)
      }
    ]
  };

  const dataSrc = {
    unassign:
      issuesUnassign &&
      issuesUnassign.map(
        ({ idIssue, name, category, dayTime, summary, status }) => ({
          idIssue,
          key: idIssue,
          general_info:
            (+localStorageHelper.getItemLocalStorage("defaultProjectId") === -1
              ? `@projectname[${name}]`
              : `@projectname`) +
            `@summary${summary}@category${category}@daytime${dayTime}`,
          status
        })
      ),
    isResolve:
      issuesIsResolve &&
      issuesIsResolve.map(
        ({ idIssue, name, category, dayTime, summary, status }) => ({
          idIssue,
          key: idIssue,
          general_info:
            (+localStorageHelper.getItemLocalStorage("defaultProjectId") === -1
              ? `@projectname[${name}]`
              : `@projectname`) +
            `@summary${summary}@category${category}@daytime${dayTime}`,
          status
        })
      ),
    last30Days:
      issuesLast30Days &&
      issuesLast30Days.map(
        ({ idIssue, name, category, dayTime, summary, status }) => ({
          idIssue,
          key: idIssue,
          general_info:
            (+localStorageHelper.getItemLocalStorage("defaultProjectId") === -1
              ? `@projectname[${name}]`
              : `@projectname`) +
            `@summary${summary}@category${category}@daytime${dayTime}`,
          status
        })
      ),
    timeLine: timeLine.map(({ username, idIssue, dayTime }) => ({
      timeline: `@username${username}@idissue${idIssue}@daytime${dayTime}`
    }))
  };

  return (
    <div className="app-content">
      <h1>My view</h1>
      <Row gutter={16}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={14}
          style={{ marginBottom: "20px" }}
        >
          <PanelSkeleton
            header="Unassigned"
            cols={cols.unassign}
            data={dataSrc.unassign}
            pagination={false}
            showHeader={false}
          />
          <br />
          <PanelSkeleton
            header="Resolved"
            cols={cols.isResolve}
            data={dataSrc.isResolve}
            pagination={false}
            showHeader={false}
          />
          <br />
          <PanelSkeleton
            header="Last 30 days"
            cols={cols.last30Days}
            data={dataSrc.last30Days}
            pagination={false}
            showHeader={false}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={10}>
          <PanelSkeleton
            header="Timeline"
            cols={cols.timeLine}
            data={dataSrc.timeLine}
            pagination={false}
            showHeader={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MyView;
