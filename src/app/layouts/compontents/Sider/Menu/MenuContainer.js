import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppSiderMenu from "./Menu";
import notification from "antd/lib/notification";

class AppSiderMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.links.links,
      position: props.links.position,
      showMessage: 0
    };
  }

  componentDidMount() {
    const { links } = this.state;
    links.forEach(async link => {
      if (link.fetchFrom) {
        try {
          let subs = await fetch(link.fetchFrom);
          subs = await subs.json();
          subs.data.forEach(sub => {
            link.sub.push({
              to: "/my-projects/" + sub.id,
              label: sub.name
            });
          });
          delete link.fetchFrom;
          this.setState({ links });
        } catch (err) {
          this.setState({ showMessage: 1 - this.state.showMessage });
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
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
    const { links, position } = this.state;
    return <AppSiderMenu links={links} position={position} />;
  }
}

export default AppSiderMenuContainer;
