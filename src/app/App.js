import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes";
import LoginContainer from "./screens/Login/LoginContainer";
import PrivateRoute from "./screens/components/PrivateRoute";
import AuthHelper from "../utils/authHelper";

const Auth = new AuthHelper();

// const PrivateRoute = ({ component: Comp, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         Auth.checkAuth() ? (
//           <Comp {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  AppScreens = AppRoutes.map(
    ({ path, exact, isPrivate, component: Comp }, index) =>
      isPrivate === false ? (
        <Route key={index} path={path} exact={exact} component={Comp} />
      ) : (
        <PrivateRoute key={index} path={path} exact={exact} component={Comp} />
      )
  );

  handleLogInSucceed = user => {
    Auth.login();
    this.setState({ isLoggedIn: true });
    // const { access_token, refresh_token } = user;
    // if (localStorage && localStorage.getItem("access_token"))
    //   localStorage.removeItem("access_token");
    // localStorage.setItem("access_token", access_token);
    // if (localStorage && localStorage.getItem("refresh_token"))
    //   localStorage.removeItem("refresh_token");
    // localStorage.setItem("refresh_token", refresh_token);
  };

  render() {
    return (
      <Router>
        <MainLayout>
          <span id="fetchResultNotiHolder" />
          <Switch>
            <Route
              path="/login"
              render={props => (
                <LoginContainer
                  onLoginSucceed={this.handleLogInSucceed}
                  {...props}
                />
              )}
            />
            {this.AppScreens}
          </Switch>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
