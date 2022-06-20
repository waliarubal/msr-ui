import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./components/common/header";
import Footer from "./components/common/footer";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header />
      <Route
        {...rest}
        render={(props) => {
          // console.log(props);
          // console.log(props.location.pathname);

          if (
            sessionStorage.getItem("role") &&
            sessionStorage.getItem("role") === "User" &&
            props.location.pathname.indexOf("admin") > 0
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }

          if (sessionStorage.getItem("user")) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
      <Footer />
    </>
  );
};
