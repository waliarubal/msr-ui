import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { services } from "../constant";

export default function Footer(props) {
  const [role, setRole] = React.useState(null);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
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
              element._id === JSON.parse(sessionStorage.getItem("user")).role
            ) {
              setRole(element.name);
            }
          });
        });
    } else {
      setRole("User");
    }
  }, [props]);

  return (
    <footer>
      <div class="container">
        <div class="footer-inner">
          <div class="row">
            <div class="col-lg-2 col-md-4 col-sm-12">
              <div className="footer-logo">
                <img src="images/logo_msrhwlabs_grey.png" />
              </div>
            </div>
            <div class="col-lg-10 col-md-8 col-sm-12">
              <ul class="footer-nav">
                <li class="nav-item">
                  <Link
                    to={role === "User" ? "/" : "/admin"}
                    className={"nav-link"}
                    activeClassName="active"
                    exact={true.toString()}
                  >
                    SERVICES HOME{" "}
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to={role === "User" ? "/safety" : "/admin/safety"}
                    className={"nav-link"}
                    activeClassName="active"
                  >
                    Safety
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/about"
                    className={"nav-link"}
                    activeClassName="active"
                  >
                    ABOUT{" "}
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    className={"nav-link"}
                    activeClassName="active"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    className={"nav-link"}
                    activeClassName="active"
                    to="/tour"
                  >
                    TOURS
                  </Link>
                </li>
                {role !== "User" ? (
                  <li class="nav-item">
                    <Link
                      className={"nav-link"}
                      activeClassName="active"
                      to="/viewHistory"
                    >
                      View History
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
