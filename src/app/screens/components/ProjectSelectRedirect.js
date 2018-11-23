import React from "react";
import { withRouter } from "react-router-dom";
import localStorageHelper from "../../../utils/localStorageHelper";

const ProjectSelectRedirect = props => {
  const newDefaultProjectId = props.location.pathname.substr(
    props.location.pathname.lastIndexOf("/") + 1
  );

  if (!Number.isNaN(newDefaultProjectId))
    localStorageHelper.setItemLocalStorage(
      "defaultProjectId",
      +newDefaultProjectId
    );

  props.history.goBack();

  return <React.Fragment />;
};

export default withRouter(ProjectSelectRedirect);
