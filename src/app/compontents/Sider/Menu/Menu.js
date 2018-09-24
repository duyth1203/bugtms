import React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import './Menu.css';

// cannot move `AppMenuItem` to child compnonents as `SubMenu` requires being in same file as its parent `Menu` (?)
const AppSiderMenuItem = (key, link) => {
  if (link.to)
    return (
      <Menu.Item key={key}>
        <Link to={link.to} exact={link.exact}>
          <Icon type={link.icon} />
          <span className="nav-text">{link.label}</span>
        </Link>
      </Menu.Item>
    );

  return (
    <Menu.SubMenu
      key={key}
      title={
        <span>
          <Icon type={link.icon} size="small" />
          <span>{link.label}</span>
        </span>
      }
    >
      {link.sub.map(subLink => AppSiderMenuItem(subLink.label, subLink))}
    </Menu.SubMenu>
  );
};

const AppSiderMenu = props => {
  const { links, position } = props.routes;
  return (
    <Menu
      defaultSelectedKeys={[links[0].label]}
      mode="vertical"
      theme="dark"
      className={`menu menu-${position}`}
    >
      {links.map(link => AppSiderMenuItem(link.label, link))}
    </Menu>
  );
};

export default AppSiderMenu;
