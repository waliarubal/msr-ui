import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import store from "../../store";
import axios from "axios";
import { services } from "../common/constant";
import { AzureAD, LoginType, AuthenticationState } from "react-aad-msal";

// Import the authentication provider which holds the default settings
import { authProvider } from "../../authProvider";

const jwt = require("jsonwebtoken");

let isRedirect = false;

export default class Login extends React.Component {

  static propTypes = {
    signupReq: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Change the login type to execute in a Redirect
    const options = authProvider.getProviderOptions();
    options.loginType = LoginType.Redirect;
    authProvider.setProviderOptions(options);

    this.interval = null;
    let redirectEnabled = sessionStorage.getItem("redirectEnabled") || false;
    this.state = {
      counter: 5,
      redirectEnabled: redirectEnabled,
    };
  }

  handleCheck = () => {
    this.setState(
      (state) => ({
        ...state,
        redirectEnabled: !state.redirectEnabled,
      }),
      () => {
        if (!this.state.redirectEnabled) {
          this.clearRedirectInterval();
        } else {
          sessionStorage.setItem("redirectEnabled", true);
        }
      }
    );
  };

  countdownToLogin = (loginFunction) => {
    if (this.state.redirectEnabled && !this.interval) {
      this.interval = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState({ counter: this.state.counter - 1 });
        } else {
          this.clearRedirectInterval();
          this.setState({ redirectEnabled: false });
          loginFunction();
        }
      }, 1000);
    }
  };

  clearRedirectInterval() {
    clearInterval(this.interval);
    this.setState({ counter: 5 });
    sessionStorage.removeItem("redirectEnabled");
    this.interval = null;
  }

  render() {
    const { redirectEnabled } = this.state;

    return (
      <AzureAD provider={authProvider} reduxStore={store} forceLogin={true}>
        {({ login, logout, authenticationState, accountInfo }) => {
          const isInProgress =
            authenticationState === AuthenticationState.InProgress;
          const isAuthenticated =
            authenticationState === AuthenticationState.Authenticated;
          const isUnauthenticated =
            authenticationState === AuthenticationState.Unauthenticated;

          if (isAuthenticated && !isRedirect) {
            isRedirect = true;

            let userId = "";
            let roleId = "";
            let otherRole = "";
            let approverLevel = "";
            const jwtOptions = { expiresIn: 60 * 60 * 24 };
            let authToken = jwt.sign(
              { username: accountInfo.account.userName, password: "" },
              "dev@192!vj#",
              jwtOptions
            );
            sessionStorage.setItem("authToken", authToken);

            axios
              .get(
                services.baseUrl +
                  services.getUsersList +
                  "?authToken=" +
                  sessionStorage.getItem("authToken")
              )
              .then((response) => {
                if (response.data.data) {
                  response.data.data.forEach((elem) => {
                    console.log(
                      `Response from server for user: ${JSON.stringify(
                        response.data.data
                      )}`
                    );
                    if (elem.username === accountInfo.account.userName) {
                      userId = elem._id;
                      roleId = elem.role;
                      otherRole = elem.otherRole;
                      approverLevel = elem.approverLevel;
                    }
                  });
                }

                if (userId === "") {
                  const formData = {
                    username: accountInfo.account.userName,
                    password: accountInfo.account.userName,
                    firstname: accountInfo.account.name,
                    lastname: "",
                    email: accountInfo.account.userName,
                    phone: "0000000000",
                    role: "5eba3be3c4cf091fbc7d4307",
                    isProjectContact: true,
                    isTechContact: true,
                    otherRole: "",
                    approverLevel: "",
                  };
                  axios
                    .post(services.baseUrl + services.signUp, formData)
                    .then((response) => {
                      if (response.data.data) {
                        userId = response.data.data._id;
                        roleId = response.data.data.role;
                        sessionStorage.setItem(
                          "user",
                          JSON.stringify({
                            _id: userId,
                            username: accountInfo.account.userName,
                            role: roleId,
                            otherRole: otherRole,
                            approverLevel: approverLevel,
                          })
                        );

                        axios
                          .get(
                            services.baseUrl +
                              services.roles +
                              "?authToken=" +
                              sessionStorage.getItem("authToken")
                          )
                          .then((response) => {
                            response.data.data.forEach((element) => {
                              if (
                                element._id ===
                                JSON.parse(sessionStorage.getItem("user")).role
                              ) {
                                this.props.setRole(element.name);
                                sessionStorage.setItem("role", element.name);
                                element.name === "User"
                                  ? this.props.history.push("/")
                                  : this.props.history.push("/admin");

                                // window.location.reload();
                                return null;
                              }
                            });
                          });
                      }
                    });
                } else {
                  sessionStorage.setItem(
                    "user",
                    JSON.stringify({
                      _id: userId,
                      username: accountInfo.account.userName,
                      role: roleId,
                      otherRole: otherRole,
                      approverLevel: approverLevel,
                    })
                  );

                  axios
                    .get(
                      services.baseUrl +
                        services.roles +
                        "?authToken=" +
                        sessionStorage.getItem("authToken")
                    )
                    .then((response) => {
                      response.data.data.forEach((element) => {
                        if (
                          element._id ===
                          JSON.parse(sessionStorage.getItem("user")).role
                        ) {
                          this.props.setRole(element.name);
                          sessionStorage.setItem("role", element.name);
                          element.name === "User"
                            ? this.props.history.push("/")
                            : this.props.history.push("/admin");
                          // window.location.reload();
                          // return null;
                        }
                      });
                    });
                }
              });
          } else if (isInProgress) {
            // ignore if auth is in progress
          } else {
            return null;
          }
        }}
      </AzureAD>
    );
  }
}
