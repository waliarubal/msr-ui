import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { services } from "../constant";

export default class Newsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  signUp = (e) => {
    axios
      .post(
        services.baseUrl +
          services.subscribe +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        { email: this.state.email }
      )
      .then((response) => {
        alert(response.data.message + " for " + this.state.email);
        this.setState({ email: "" });
      });
  };
  render() {
    return (
      <div class="newsletter-section">
        <div class="container">
          <div class="newsletter-section-inner">
            <h3>SIGN UP FOR NEWSLETTER </h3>
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                onChange={this.myChangeHandler}
                placeholder="Enter Your E-mail Address "
                name="email"
              />

              <button class="btn btn-theme" onClick={(e) => this.signUp(e)}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
