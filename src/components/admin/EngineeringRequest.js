import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import { getToken, getUserId } from "../common/helpers";

export default class EngineeringRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      shipmentTypes: [],
      isOpen: props.isOpen,
      shipmentType: "",
      url: "",
      // form fields
      requestTypes: [],
      shipmentTypeId: "",
      shipmentAddress: "",
      dueDate: "",
      requestedBy: "",
      msftAlias: "",
      requestDescription: "",
      priority: "high",
      projectName: "",
      successCriteria: "",
      files: [],
    };

    this.OnInputChange = this.OnInputChange.bind(this);
    this.AddFile = this.AddFile.bind(this);
    this.DeleteFile = this.DeleteFile.bind(this);
    this.OnShipmentTypeChange = this.OnShipmentTypeChange.bind(this);
  }

  componentDidMount() {
    this.Populate();
  }

  Populate() {
    axios
      .get(`${services.baseUrl}${services.reqList}?authToken=${getToken()}`)
      .then((response) => {
        let requestTypes = response.data.data;

        axios
          .get(
            `${services.baseUrl}${
              services.shipmentTypesList
            }?authToken=${getToken()}`
          )
          .then((response) => {
            this.setState({
              requestTypes: requestTypes,
              shipmentTypes: response.data.data,
            });

            axios
              .get(
                `${services.baseUrl}${
                  services.getEngineeringRequest
                }?authToken=${getToken()}&id=${this.state.id}`
              )
              .then((response) => {
                console.log(response.data.data);
              });
          });
      });
  }

  OnShipmentTypeChange(event) {
    let value = event.target.value;
    let name = this.state.shipmentTypes.filter((r) => r._id === value);
    if (name.length == 0) return;
    this.setState({
      shipmentType: name[0].name,
      shipmentTypeId: value,
    });
  }

  OnInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  AddFile(event) {
    event.preventDefault();

    let url = this.state.url;
    if (!url) return;
    let files = this.state.files;
    if (files.indexOf(url) > -1) return;

    files.push(url);

    this.setState({
      files: files,
      url: "",
    });
  }

  DeleteFile(event, url) {
    event.preventDefault();

    let files = this.state.files;
    files.splice(files.indexOf(url), 1);
    this.setState({
      files: files,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="edit-request-form">
          <div className="container">
            <h5>
              <img src="images/engerinering-form.png" />
              Engineering Request
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <form>
              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label>Request Desired Due Date: </label>
                    </div>
                    <div class="col-md-7">
                      <input
                        type="date"
                        class="form-control"
                        name="dueDate"
                        value={this.state.dueDate}
                        onChange={this.OnInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label class="text-right">Priority:</label>
                    </div>
                    <div class="col-md-7">
                      <select
                        class="form-control"
                        name="priority"
                        value={this.state.priority}
                        onChange={this.OnInputChange}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label>
                        Requested By<span class="required">*</span>:
                      </label>
                    </div>
                    <div class="col-md-7">
                      <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        name="requestedBy"
                        value={this.state.requestedBy}
                        onChange={this.OnInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label class="text-right">Project Name:</label>
                    </div>
                    <div class="col-md-7">
                      <input
                        type="text"
                        name="projectName"
                        placeholder="Project Name"
                        class="form-control"
                        value={this.state.projectName}
                        onChange={this.OnInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label>
                        MSFT Alias<span class="required">*</span> :
                      </label>
                    </div>
                    <div class="col-md-7">
                      <input
                        type="text"
                        placeholder="Alias"
                        class="form-control"
                        name="msftAlias"
                        value={this.state.msftAlias}
                        onChange={this.OnInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-5">
                      <label>Support Request Description:</label>
                    </div>
                    <div class="col-md-7">
                      <textarea
                        class="form-control"
                        placeholder="Type description here"
                        id="comment"
                        name="requestDescription"
                        value={this.state.requestDescription}
                        onChange={this.OnInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <h4>Shipment Details</h4>
              <div class="row">
                <div class="form-group col-md-5">
                  <div class="row">
                    <div class="col-md-6">
                      <label>Shipment Type:</label>
                    </div>
                    <div class="col-md-6">
                      <select
                        class="form-control"
                        name="shipmentTypeId"
                        value={this.state.shipmentTypeId}
                        onChange={this.OnShipmentTypeChange}
                      >
                        <option>--Select--</option>
                        {this.state.shipmentTypes &&
                          this.state.shipmentTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {this.state.shipmentType && (
                  <div class="form-group col-md-5">
                    <div class="row">
                      <div class="col-md-6">
                        <label>{this.state.shipmentType}:</label>
                      </div>
                      <div class="col-md-6">
                        <textarea
                          name="shipmentAddress"
                          value={this.state.shipmentAddress}
                          onChange={this.OnInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <hr />
              <br />

              <h4>Project Scope</h4>
              <div class="form-check-inline">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  3D Printing
                </label>
              </div>

              <hr />
              <br />

              <h4>
                Success Criteria<span class="required">*</span>
              </h4>
              <div class="row">
                <div class="form-group col-md-12 big-textarea">
                  <textarea
                    class="form-control"
                    placeholder="Type citeria here"
                    id="comment"
                    name="successCriteria"
                    value={this.state.successCriteria}
                    onChange={this.OnInputChange}
                  ></textarea>
                </div>
              </div>

              <h4>
                Please include any additional information, documents, drawaings,
                specifications, manufacturing files, etc. that will help aid in
                the project planning for your project.
                <br />
                <span>(you can select and upload multiple files)</span>
              </h4>

              <div>
                <button class="btn btn-primary submit-button">SAVE JOB</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
