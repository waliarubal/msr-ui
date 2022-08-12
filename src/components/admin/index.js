import React from "react";
import { Link } from "react-router-dom";
import EngineeringRequestForm from "./EngineeringRequestForm";

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogState: false,
    };
  }
  closeDialog = () => {
    this.setState({
      dialogState: false,
    });
  };
  openDialog = (e) => {
    this.setState({
      dialogState: true,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div class="content-section requst-section">
          <div class="work-section">
            <div class="container">
              <div class="work-section-inner">
                <h2>Requests </h2>
                <div class="row justify-content-md-center">
                  <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="work-col">
                      <Link to="/reqList" class="create-button btn-demo">
                        Legacy Cases
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="work-col">
                      <Link
                        to="/engineering-requests"
                        class="create-button btn-demo"
                      >
                        View Existing Requests
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="work-col">
                      <a
                        onClick={this.openDialog}
                        class="create-button btn-demo"
                      >
                        Create New Request
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="work-col">
                      <Link
                        to="/admin/engineering-request-form"
                        class="create-button btn-demo"
                      >
                        Manage Request Form
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="overview-section requst-1">
            <div class="container">
              <div class="overview-section-inner">
                <h1> Safety </h1>
                <Link to="/admin/safety" class="safety-bottom">
                  SAFETY HOME
                </Link>
                <Link to="/admin/newincident" class="safety-bottom">
                  FILE SAFETY INCIDENT
                </Link>
              </div>
            </div>
          </div>
          <div class="project-section requst-1">
            <div class="container">
              <div class="project-section-inner">
                <h1>Tours </h1>
                <Link to="/tour" class="safety-bottom">
                  VIEW SCHEDULE TOURS
                </Link>
              </div>
            </div>
          </div>
          <div class="overview-section requst-1">
            <div class="container">
              <div class="overview-section-inner">
                <h1>Learning </h1>
                <Link to="/admin/learning" class="safety-bottom">
                  VIEW LEARNING TRACKING
                </Link>
                <Link to="/safety" class="safety-bottom">
                  VIEW TRAINING
                </Link>
              </div>
            </div>
          </div>
        </div>

        <EngineeringRequestForm isOpen={this.state.dialogState} />
      </React.Fragment>
    );
  }
}
