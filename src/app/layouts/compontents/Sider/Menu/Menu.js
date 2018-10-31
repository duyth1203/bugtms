import React from "react";
import { Link } from "react-router-dom";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import "./Menu.css";

const AppSiderMenuItem = (key, link) => {
  if (link.to)
    return (
      <Menu.Item key={key}>
        <Link to={link.to} exact={link.exact}>
          {link.icon && <Icon type={link.icon} />}
          <span className="nav-text">{link.label}</span>
        </Link>
      </Menu.Item>
    );

  return (
    <Menu.SubMenu
      key={key}
      title={
        <span>
          {link.icon && <Icon type={link.icon} />}
          <span>{link.label}</span>
        </span>
      }
    >
      {link.sub.map(subLink => AppSiderMenuItem(subLink.label, subLink))}
    </Menu.SubMenu>
  );
};

const AppSiderMenu = props => {
  return (
    <Menu mode="vertical" className={`menu ${props.position}-0`}>
      {props.links.map(link => AppSiderMenuItem(link.label, link))}
    </Menu>
  );
};

export default AppSiderMenu;
