import React, { Component } from "react";
import ProjectSelectorContainer from "./ProjectSelector/ProjectSelectorContainer";
import localStorageHelper from "../../../utils/localStorageHelper";

class RedirectWrapper extends Component {
  constructor() {
    super();
    this.state = {
      selectedProject: -1,
      willRedirect:
        !localStorageHelper.getItemLocalStorage("defaultProjectId") ||
        (localStorageHelper.getItemLocalStorage("defaultProjectId") &&
          +localStorageHelper.getItemLocalStorage("defaultProjectId") !== -1) ||
        false
    };
  }

  handleRedirect = selectedProject => {
    this.setState({ willRedirect: true, selectedProject });
  };

  handleReload = () => {
    this.setState({ willRedirect: false });
  };

  render() {
    const { willRedirect, selectedProject } = this.state;
    const { children } = this.props;
    const childrenWithProp = Array.isArray(children)
      ? React.Children.map(children, child =>
          React.cloneElement(child, {
            selectedProject,
            onReload: this.handleReload
          })
        )
      : React.cloneElement(children, {
          selectedProject,
          onReload: this.handleReload
        });

    return willRedirect === true ? (
      <React.Fragment>{childrenWithProp}</React.Fragment>
    ) : (
      <ProjectSelectorContainer onRedirect={this.handleRedirect} />
    );
  }
}

export default RedirectWrapper;
