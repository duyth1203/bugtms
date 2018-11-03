import React, { Component } from "react";
import Icon from "antd/lib/icon";
import Table from "antd/lib/table";
import Pagination from "antd/lib/pagination";

class PanelSkeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelToggle: true,
      data: props.data
    };
  }

  handlePanelToggle = () => {
    const { panelToggle } = this.state;

    const panelBody =
      document.activeElement.parentElement.parentElement.nextSibling;
    if (panelBody.classList.contains("ant-table-content")) {
      panelBody.style.display = panelToggle ? "none" : "block";
    }

    this.setState({ panelToggle: !panelToggle });
  };

  render() {
    const { header, cols, data } = this.props;
    const { totalPage, panelToggle } = this.state;

    const title = () => (
      <div className="panel__header">
        <span className="panel__header-title">{header}</span>
        <button
          size="small"
          className="top right btn-toggle"
          onClick={this.handlePanelToggle}
        >
          <Icon
            type={panelToggle ? "caret-up" : "caret-down"}
            theme="outlined"
          />
        </button>
      </div>
    );

    const footer = () => (
      <div className="panel__footer">
        <Pagination
          className="right"
          size="small"
          total={totalPage > 1 ? totalPage : 1}
          showQuickJumper
          defaultPageSize={10}
        />
      </div>
    );

    return (
      <Table
        columns={cols}
        dataSource={data}
        bordered
        title={title}
        // footer={footer}
      />
    );
  }
}

export default PanelSkeleton;
