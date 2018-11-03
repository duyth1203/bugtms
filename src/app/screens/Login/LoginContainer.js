import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import Notification from "../components/Notification";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showMessageLoginFailed: 0
    };
  }

  onLoginSucceed = datas => {
    this.props.onLoginSucceed(datas);
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
    let { username, password } = this.state;
    fetch("https://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(datas => {
        if (datas.auth === true) {
          this.onLoginSucceed(datas);
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
          "error",
          "Error",
          "Login failed. Please check your username and password.",
          2,
          "topRight"
        ),
        target
      );
  }

  render() {
    return <Login onSubmit={this.handleSubmit} onChange={this.handleChange} />;
  }
}

export default LoginContainer;
