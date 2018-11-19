import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import authHelper from "../../../../../../utils/authHelper";
import "./Menu.css";

const AppSiderMenuItem = (key, link) => {
  if (link.to) {
    if (link.to === "/log-out" && !authHelper.checkAuth()) return;
    return (
      <Menu.Item key={key}>
        <Link to={link.to} exact={link.exact}>
          {link.icon && <Icon type={link.icon} />}
          <span className="nav-text">{link.label}</span>
        </Link>
      </Menu.Item>
    );
  }

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

class AppSiderMenu extends Component {
  constructor(props) {
    super(props);
    // console.log(props.currentSelected);
    this.state = {
      currentSelected: props.currentSelected
    };
  }

  handleClick = e => {
    this.setState({
      currentSelected: e.key
    });
  };

  render() {
    return (
      <Menu
        mode="vertical"
        className={`menu ${this.props.position}-0`}
        onClick={this.handleClick}
        selectedKeys={[this.state.currentSelected]}
      >
        {this.props.links.map(link => AppSiderMenuItem(link.label, link))}
      </Menu>
    );
  }
}

export default AppSiderMenu;
