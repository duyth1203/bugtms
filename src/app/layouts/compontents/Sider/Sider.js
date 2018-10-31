import React from "react";
import Media from "react-media";
import { Sider } from "antd/lib/layout";
import AppSiderMenuContainer from "./Menu/MenuContainer";
import AppSiderLinks from "./links";
import logo from "./logo.png";
import "./Sider.css";

const AppSider = props => {
  return (
    <Media query={{ minWidth: 480 }}>
      {match => (
        <Sider
          trigger={null}
          breakpoint="lg"
          collapsedWidth={match ? 85 : 0}
          collapsible
          collapsed={props.siderExpand}
          onCollapse={props.onSiderToggle}
          className="sider"
        >
          <div className="app-logo">
            <img src={logo} alt="Logo" />
          </div>
          <AppSiderMenuContainer links={AppSiderLinks[0]} />
          <AppSiderMenuContainer links={AppSiderLinks[1]} />
        </Sider>
      )}
    </Media>
  );
};
export default AppSider;
