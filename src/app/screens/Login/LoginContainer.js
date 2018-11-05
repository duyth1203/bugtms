import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import Notification from "../components/Notification";

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

  handleLogInSucceed = user => {
    this.setState({ redirectToReferrer: true }, () => {
      this.props.onLoginSucceed(user);
    });
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
    if (username.length < 1 || password.length < 1) {
      this.setState({
        showMessageLoginFailed: 1 - this.state.showMessageLoginFailed
      });
      return;
    }

    fetch("http://localhost:3000/login", {
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
      .then(response => response.json())
      .then(data => {
        if (data.auth) {
          this.handleLogInSucceed(data.user);
        } else {
          this.setState({
            showMessageLoginFailed: 1 - this.state.showMessageLoginFailed
          });
        }
      })
      .catch(err => {
        this.setState({
          showMessageLoginFailed: 1 - this.state.showMessageLoginFailed
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("fetchResultNotiHolder");
    this.state.showMessageLoginFailed !== prevState.showMessageLoginFailed &&
      target &&
      ReactDOM.render(
        Notification(
          "warning",
          "Warning",
          "Login failed. Please check your username and password whether they are empty or incorrect.",
          2,
          "topRight"
        ),
        target
      );
  }

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
