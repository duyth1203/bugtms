import React from "react";
import { Redirect } from "react-router-dom";

export default function Rediretor(props) {
  const cb =
    (props.location !== undefined &&
      props.location.state !== undefined &&
      props.location.state.cb !== undefined) ||
    props.cb;
  cb && cb();

  const to =
    (props.location !== undefined &&
      props.location.state !== undefined &&
      props.location.state.to !== undefined) ||
    props.to;
  return <Redirect to={to ? to : "/saveTonyStark"} />;
}
