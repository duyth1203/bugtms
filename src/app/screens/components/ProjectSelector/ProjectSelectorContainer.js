import React, { Component } from "react";
import message from "antd/lib/message";
import ProjectSelector from "./ProjectSelector";
import localStorageHelper from "../../../../utils/localStorageHelper";

class ProjectSelectorContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedProject: -1,
      markAsDefault: false,
      projects: []
    };
  }

  componentDidMount() {
    const user = localStorageHelper.getItemLocalStorage("user");

    if (user && user.id) {
      fetch(`http://localhost:3001/myview/getProjectByUser/${user.id}`)
        .then(response => response.json())
        .then(datas => {
          if (datas.status === 0) {
            const projects = datas.data.Project.map(({ id, name }) => ({
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
      localStorageHelper.setItemLocalStorage(
        "defaultProjectId",
        selectedProject
      );
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
