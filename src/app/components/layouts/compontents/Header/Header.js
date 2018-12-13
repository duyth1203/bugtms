import React from "react";
import { getCookie } from "tiny-cookie";
import { Header } from "antd/lib/layout";
import Icon from "antd/lib/icon";
import { Search } from "antd/lib/input";
import "./Header.css";

const AppHeader = props => {
  const userName = getCookie("user") && JSON.parse(getCookie("user")).name;

  return (
    <Header className="header">
      <Icon
        className="trigger"
        type={props.siderExpand ? "menu-unfold" : "menu-fold"}
        onClick={props.onSiderToggle}
      />
      {userName && <span className="header__title">{userName} (Reporter)</span>}
      <Search
        className="input-search"
        placeholder="Issue #"
        onSearch={query => props.onIssueSearch(query)}
      />
    </Header>
  );
};

export default AppHeader;
