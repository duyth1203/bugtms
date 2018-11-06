import React from "react";
// import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import "./Login.css";
import logo from "../../logo.png";

const Login = props => {
  const onChange = e => {
    props.onChange(e);
  };

  return (
    <div className="app-content page__login">
      <div className="page__login__form">
        <div className="page__login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={props.onSubmit}>
          <Input
            placeholder="Username"
            onChange={onChange}
            size="large"
            name="username"
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={onChange}
            size="large"
            name="password"
          />
          <Button
            type="primary"
            className="btn-100"
            size="large"
            htmlType="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
