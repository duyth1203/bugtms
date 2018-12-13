import React, { Component } from "react";
import { getCookie } from "tiny-cookie";
import ProjectSelectorContainer from "./ProjectSelector/ProjectSelectorContainer";

class ProjectSelectRedirector extends Component {
  state = {
    selectedProject: -1,
    willRedirect:
      !getCookie("defaultProjectId") ||
      (getCookie("defaultProjectId") &&
        +getCookie("defaultProjectId") !== -1) ||
      false
  };

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

export default ProjectSelectRedirector;
