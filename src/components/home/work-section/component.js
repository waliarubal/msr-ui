import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EngineeringRequestForm from "../../admin/EngineeringRequestForm";

export default class WorkSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dialogState: false,
    };
    this.NewRequest = this.NewRequest.bind(this);
  }

  openDialog = () => {
    this.props.dialogOpen();
  };

  NewRequest() {
    this.setState({
      dialogState: true,
    });
  }

  render() {
    return (
      <div class="requst-section">
        <div class="work-section">
          <div class="container">
            <div class="work-section-inner">
              <h2>Requests </h2>
              <div
                class={
                  sessionStorage.getItem("role") === "User"
                    ? "row d-flex justify-content-center justify-content-md-center"
                    : "row justify-content-md-center"
                }
              >
                {sessionStorage.getItem("role") !== "User" ? (
                  <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="work-col">
                      <h3>Requests </h3>

                      <Link
                        to="/engineering-requests"
                        class="create-button btn-demo"
                      >
                        REQUEST QUEUE
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="work-col">
                      <h3>View History </h3>

                      <Link
                        to="/engineering-requests"
                        class="create-button btn-demo"
                      >
                        View History{" "}
                      </Link>
                    </div>
                  </div>
                )}
                {sessionStorage.getItem("role") !== "User" ? (
                  <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="work-col">
                      <h3>My Assigned Tasks </h3>
                      <Link to="/myjobs" class="create-button btn-demo">
                        ASSIGNED TASKS QUEUE
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="work-col">
                    <h3>Create New Request</h3>
                    <a onClick={this.NewRequest} class="create-button btn-demo">
                      NEW REQUEST
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EngineeringRequestForm isOpen={this.state.dialogState} />
      </div>
    );
  }
}
