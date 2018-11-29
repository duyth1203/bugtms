import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import message from "antd/lib/message";
import Login from "./Login";
import authHelper from "../../../utils/authHelper";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      username: "",
      password: "",
      showMessageLoginFailed: 0
    };
  }

  handleLogInSucceed = data => {
    const { access_token, refresh_token, user } = data;
    authHelper.login(access_token, refresh_token, user);
    this.setState({ redirectToReferrer: true });
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username.length < 1 || password.length < 1)
      return message.warning(
        "Please check if your user name or password were empty."
      );

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: username,
        pwd: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.auth) {
          this.handleLogInSucceed(data);
        } else {
          message.error(
            "Login failed. Please check your username and password."
          );
        }
      })
      .catch(err => message.error("Sorry, login failed due to server error."));
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    return redirectToReferrer ? (
      <Redirect to={from} />
    ) : (
      <Login onSubmit={this.handleSubmit} onChange={this.handleChange} />
    );
  }
}

export default LoginContainer;
