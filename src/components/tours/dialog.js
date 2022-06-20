import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { services } from "../common/constant";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: this.props.enable,
      isView: false,
      formData: {
        day: "",
        title: "",
        comment: "",
        time: "",
        date: "",
        email: sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user")).username
          : "",
      },
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.viewTour && prevState.enable !== this.props.enable) {
      const { viewTour } = this.props;
      this.setState({
        isView: true,
        enable: this.props.enable,
        formData: {
          day: viewTour.day,
          time: viewTour.time,
          date: viewTour.date,
          title: viewTour.title,
          comment: viewTour.comment,
          email: sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user")).username
            : "",
        },
      });
    } else if (prevState.enable !== this.props.enable) {
      const { selectedTime } = this.props;
      this.setState({
        enable: this.props.enable,
        formData: {
          day: selectedTime.day,
          time: selectedTime.time,
          date: selectedTime.date,
          title: "",
          comment: "",
          email: sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user")).username
            : "",
        },
      });
    }
  }
  closeDialog = () => {
    this.setState({
      enable: false,
      isView: false,
    });
    this.props.closeDialog();
  };
  myChangeHandler = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  formSubmit = (type) => {
    if (!this.state.formData.title) {
      alert("Please enter Tour title");
    } else if (!this.state.formData.comment) {
      alert("Please enter Tour Comment");
    } else {
      axios
        .post(
          services.baseUrl +
            services.submitComment +
            "?authToken=" +
            sessionStorage.getItem("authToken"),
          this.state.formData
        )
        .then((response) => {
          if (response.data.message === "Invalid Token") {
            sessionStorage.clear();
            return this.props.history.push("/login");
          }
          alert(response.data.message);
          this.closeDialog();
        });
    }
  };
  render() {
    const enable = this.state.enable;
    const isEnable = enable ? "show" : "";
    const styleEnable = enable ? "block" : "none";
    return (
      <div
        className={"modal right fade tour-model " + isEnable}
        id="myModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
        style={{ display: styleEnable }}
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  {" "}
                  <img src="images/ico_close.png" onClick={this.closeDialog} />
                </span>
              </button>
            </div>

            <h4 class="modal-title" id="myModalLabel2">
              Schedule Tour{" "}
            </h4>
            <div class="form-group">
              <div class="row">
                <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                  Date
                </label>
                <div class="col-lg-8 col-md-8 col-sm-12">
                  <div
                    class="input-group date"
                    id="datetimepicker4"
                    data-target-input="nearest"
                  >
                    {this.state.formData.date}
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                  Day
                </label>
                <div class="col-lg-8 col-md-8 col-sm-12">
                  <div
                    class="input-group date"
                    id="datetimepicker4"
                    data-target-input="nearest"
                  >
                    {this.state.formData.day}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                  Time
                </label>
                <div class="col-lg-8 col-md-8 col-sm-12">
                  <div
                    class="input-group date"
                    id="datetimepicker3"
                    data-target-input="nearest"
                  >
                    {this.state.formData.time}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <label> Tour Title </label>
                  <input
                    type="text"
                    class="form-control"
                    readOnly={this.state.isView}
                    name="title"
                    value={this.state.formData.title}
                    onChange={this.myChangeHandler}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <label> Comment </label>
                  <textarea
                    class="form-control"
                    id="comment"
                    readOnly={this.state.isView}
                    name="comment"
                    value={this.state.formData.comment}
                    onChange={this.myChangeHandler}
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="button">
                <button
                  class="btn btn-primary"
                  onClick={(e) => {
                    this.formSubmit("Submit");
                  }}
                >
                  SAVE{" "}
                </button>

                <button class="btn btn-primary save" onClick={this.closeDialog}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
