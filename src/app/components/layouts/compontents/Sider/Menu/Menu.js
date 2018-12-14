import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { getCookie } from "tiny-cookie";
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
  handleClick = e => {
    this.setState({
      currentSelected: e.key
    });
  };

  render() {
    const { position, links } = this.props;
    let currentSelected = "";

    // select current selected menu
    if (position === "top") {
      // remove the first "/" e.g "/my-projects"
      let rootPath = this.props.location.pathname.substring(1).split("/")[0];
      if (rootPath === "") rootPath = "my-projects";
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.to === `/${rootPath}`) {
          currentSelected = link.label;
          break;
        }
      }
    } else if (position === "bottom") {
      const defaultProjectId = +getCookie("defaultProjectId") || -1;
      if (defaultProjectId === -1) currentSelected = "All";
      else {
        for (let i = 0; i < links.length; i++) {
          const subLinks = links[i].sub;
          for (let i = 0; i < subLinks.length; i++) {
            const subLink = subLinks[i];
            if (subLink.to) {
              const subLinkId = subLink.to.substr(
                subLink.to.lastIndexOf("/") + 1
              );
              if (defaultProjectId === +subLinkId) {
                currentSelected = subLink.label;
                break;
              }
            }
          }
        }
      }
    }

    return (
      <Menu
        mode="vertical"
        className={`menu ${position}-0`}
        onClick={this.handleClick}
        selectedKeys={[currentSelected]}
      >
        {links.map(link => AppSiderMenuItem(link.label, link))}
      </Menu>
    );
  }
}

export default withRouter(AppSiderMenu);
