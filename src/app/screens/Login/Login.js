import React from "react";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import logo from "../../logo.png";

const Login = props => {
  const onChange = e => {
    props.onChange(e);
  };

  return (
    <div className="app-content page__login">
      <div className="page__login-logo">
        <img src={logo} alt="Logo" />
      </div>
      <Form onSubmit={props.onSubmit}>
        <h1>Login</h1>
        <hr />
        <Input placeholder="Username" onChange={onChange} />
        <br />
        <Input type="password" placeholder="Password" onChange={onChange} />
        <br />
        <Button theme="dark">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
