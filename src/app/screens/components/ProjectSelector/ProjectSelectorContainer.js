import React, { Component } from "react";
import { getCookie, setCookie } from "tiny-cookie";
import message from "antd/lib/message";
import ProjectSelector from "./ProjectSelector";

class ProjectSelectorContainer extends Component {
  state = {
    selectedProject: -1,
    markAsDefault: false,
    projects: []
  };

  componentDidMount() {
    const userId = getCookie("user") && JSON.parse(getCookie("user")).id;

    if (userId) {
      fetch(`http://localhost:3001/myview/getProjectByUser/${userId}`)
        .then(resp => resp.json())
        .then(json => {
          if (json.status === 0) {
            const projects = json.data.Project.map(({ id, name }) => ({
              id,
              name
            }));
            this.setState({
              projects,
              selectedProject: (projects[0] && projects[0].id) || -1
            });
          } else {
            message.error("Sorry, failed loading projects.");
          }
        })
        .catch(err => message.error("Sorry, failed loading projects."));
    }
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { selectedProject, markAsDefault } = this.state;
    if (selectedProject && markAsDefault)
      setCookie("defaultProjectId", selectedProject);
    this.props.onRedirect(selectedProject);
  };

  render() {
    const { projects } = this.state;
    return (
      <ProjectSelector
        projects={projects}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default ProjectSelectorContainer;
