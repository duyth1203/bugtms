import React from "react";
import { Redirect } from "react-router-dom";
import auHelper from "../../../utils/authHelper";

const LogOut = () => {
  auHelper.logout();
  return <Redirect to="/" />;
};

export default LogOut;
