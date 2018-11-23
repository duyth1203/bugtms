import React from "react";
import { Link } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PanelSkeleton from "../components/PanelSkeleton/PanelSkeleton";
import localStorageHelper from "../../../utils/localStorageHelper";

const MyView = props => {
  const { issuesUnassign, issuesIsResolve, issuesLast30Days, timeLine } = props;

  const renderPanelIssue = txt => {
    const projectNameIndex =
        +txt.indexOf("@projectname") + "@projectname".length,
      summaryIndex = +txt.indexOf("@summary") + "@summary".length,
      categoryIndex = +txt.indexOf("@category") + "@category".length,
      dayTimeIndex = +txt.indexOf("@daytime") + "@daytime".length;
    // return if nothing found
    if (
      +projectNameIndex - "@projectname".length === -1 &&
      +summaryIndex - "@summary".length === -1 &&
      +categoryIndex - "@category".length === -1 &&
      +dayTimeIndex - "@daytime".length === -1
    )
      return txt;

    const projectName = txt.substring(
        +projectNameIndex,
        +summaryIndex - "@summary".length
      ),
      summary = txt.substring(
        +summaryIndex,
        +categoryIndex - "@category".length
      ),
      category = txt.substring(
        +categoryIndex,
        +dayTimeIndex - "@daytime".length
      ),
      dayTime = txt.substring(+dayTimeIndex);
    return (
      <div>
        {+localStorageHelper.getItemLocalStorage("defaultProjectId") === -1 ? (
          <span>
            {projectName} <b>{summary}</b>
          </span>
        ) : (
          <span>
            <b>{summary}</b>
          </span>
        )}
        <br />
        <span style={{ fontSize: "0.9em" }}>
          {category} {dayTime}
        </span>
      </div>
    );
  };

  const renderPanelTimeLine = txt => {
    const usernameIndex = +txt.indexOf("@username") + "@username".length,
      issueIdIndex = +txt.indexOf("@idissue") + "@idissue".length,
      dayTimeIndex = +txt.lastIndexOf("@daytime") + "@daytime".length;
    // return if nothing found
    if (
      +usernameIndex - "@username".length === -1 &&
      +issueIdIndex - "@idissue".length === -1 &&
      +dayTimeIndex - "@daytime".length === -1
    )
      return txt;

    const username = txt.substring(
        +usernameIndex,
        +issueIdIndex - "@idissue".length
      ),
      issueId = txt.substring(+issueIdIndex, +dayTimeIndex - "@daytime".length),
      dayTime = txt.substring(+dayTimeIndex);
    return (
      <span>
        <b>{username}</b> commented on issue&nbsp;
        <Link to={`/view-issues/${issueId}`}>{issueId}</Link>
        &nbsp;on&nbsp;{dayTime}
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
        ({ idIssue, name, category, dayTime, summary, statusIssue }) => ({
          idIssue,
          key: idIssue,
          general_info: `@projectname[${name}]@summary${summary}@category${category}@daytime${dayTime}`,
          statusIssue
        })
      ),
    isResolve:
      issuesIsResolve &&
      issuesIsResolve.map(
        ({ idIssue, name, category, dayTime, summary, statusIssue }) => ({
          idIssue,
          key: idIssue,
          general_info: `@projectname[${name}]@summary${summary}@category${category}@daytime${dayTime}`,
          statusIssue
        })
      ),
    last30Days:
      issuesLast30Days &&
      issuesLast30Days.map(
        ({ idIssue, name, category, dayTime, summary, statusIssue }) => ({
          idIssue,
          key: idIssue,
          general_info: `@projectname[${name}]@summary${summary}@category${category}@daytime${dayTime}`,
          statusIssue
        })
      ),
    timeLine: timeLine.map(({ id, username, idIssue, dayTime }) => ({
      key: `${id}$`,
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
            pagination={true}
            showHeader={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MyView;
