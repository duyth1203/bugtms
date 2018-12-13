import React from "react";
import { withRouter } from "react-router-dom";
import { setCookie } from "tiny-cookie";

const ProjectSelectRedirect = props => {
  const newDefaultProjectId = props.location.pathname.substr(
    props.location.pathname.lastIndexOf("/") + 1
  );

  if (!Number.isNaN(newDefaultProjectId))
    setCookie("defaultProjectId", newDefaultProjectId);

  props.history.goBack();

  return <React.Fragment />;
};

export default withRouter(ProjectSelectRedirect);
