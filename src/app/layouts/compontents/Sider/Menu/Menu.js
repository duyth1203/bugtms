import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import './Menu.css';

// cannot move `AppMenuItem` to child compnonents as `SubMenu` requires being in same file as its parent `Menu` (?)
class AppSiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.routes.links,
      position: props.routes.position
    };
  }

  // fetchSubMenu = link => {
  //   fetch(link.fetchFrom)
  //     .then(response => response.json())
  //     .then(subs => {
  //       subs.forEach(sub => {
  //         link.sub.push({
  //           to: link.fetchFrom + '/' + sub.id,
  //           label: sub.name
  //         });
  //       });
  //       return link;
  //     });
  // };

  AppSiderMenuItem = (key, link) => {
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
        {link.sub.map(subLink => this.AppSiderMenuItem(subLink.label, subLink))}
      </Menu.SubMenu>
    );
  };

  render() {
    const { links, position } = this.state;
    return (
      <Menu
        defaultSelectedKeys={[links[0].label]}
        mode="vertical"
        className={`menu menu-${position}`}
      >
        {links.map(link => this.AppSiderMenuItem(link.label, link))}
      </Menu>
    );
  }
}

export default AppSiderMenu;
