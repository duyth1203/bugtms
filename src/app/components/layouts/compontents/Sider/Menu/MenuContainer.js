import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppSiderMenu from "./Menu";
import notification from "antd/lib/notification";
import authHelper from "../../../../../../utils/authHelper";
import localStorageHelper from "../../../../../../utils/localStorageHelper";

class AppSiderMenuContainer extends Component {
  constructor() {
    super();
    this.state = {
      showMessage: 0
    };
  }

  fetchProjectByUser = () => {
    if (!authHelper.checkAuth()) return authHelper.logout();

    const { links } = this.props.links;
    links.forEach(async link => {
      const user = localStorageHelper.getItemLocalStorage("user");
      if (link.fetchFrom && user && user.id) {
        try {
          let subs = await fetch(link.fetchFrom + user.id);
          subs = await subs.json();
          if (subs.status === 0) {
            // option for All Projects
            link.sub.push({
              to: "/my-projects/-1",
              label: "All"
            });
            // options for others
            subs.data.Project.forEach(sub => {
              link.sub.push({
                to: "/my-projects/" + sub.id,
                label: sub.name
              });
            });
            delete link.fetchFrom;
            this.setState({ links });
          }
        } catch (err) {}
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    this.fetchProjectByUser();

    const target = document.getElementById("fetchResultNotiHolder");
    this.state.showMessage !== prevState.showMessage &&
      target &&
      ReactDOM.render(
        notification["error"]({
          message: "Error",
          description: "Sorry, failed loading projects.",
          duration: 2,
          placement: "topRight"
        }),
        target
      );
  }

  render() {
    const { links, position } = this.props.links,
      { currentSelected } = this.props;

    return (
      <AppSiderMenu
        links={links}
        position={position}
        currentSelected={currentSelected}
      />
    );
  }
}

export default AppSiderMenuContainer;
