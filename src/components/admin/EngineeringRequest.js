import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import { getToken, getUserId } from "../common/helpers";
import DateTimePicker from "react-datetime-picker";

export default class EngineeringRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      shipmentTypes: [],
      statuses: [],
      users: [],
      isOpen: props.isOpen,
      shipmentType: "",
      url: "",
      requestBy: "",
      // form fields
      userId: "",
      status: "",
      requestTypes: [],
      shipmentTypeId: "",
      shipmentAddress: "",
      requestedCompletionDate: "",
      expectedCompletionDate: "",
      msftAlias: "",
      requestDescription: "",
      priority: "normal",
      projectName: "",
      successCriteria: "",
      files: [],
      isDraft: false,
      createdAt: "",
      modifiedAt: "",
      projectContact: "",
      techContact: "",
    };

    this.OnInputChange = this.OnInputChange.bind(this);
    this.AddFile = this.AddFile.bind(this);
    this.DeleteFile = this.DeleteFile.bind(this);
    this.OnShipmentTypeChange = this.OnShipmentTypeChange.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
  }

  componentDidMount() {
    this.Populate();
  }

  Populate() {
    console.log(this.state.id);
    axios
      .get(`${services.baseUrl}${services.reqList}?authToken=${getToken()}`)
      .then((response) => {
        let requestTypes = response.data.data;

        axios
          .get(
            `${services.baseUrl}${
              services.getUsersList
            }?authToken=${getToken()}`
          )
          .then((response) => {
            let users = response.data.data;

            axios
              .get(
                `${services.baseUrl}${
                  services.getStatus
                }?authToken=${getToken()}`
              )
              .then((response) => {
                let statuses = response.data.data;

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
                      statuses: statuses,
                      users: users,
                    });

                    axios
                      .get(
                        `${services.baseUrl}${services.getEngineeringRequest}`,
                        {
                          params: {
                            authToken: getToken(),
                            id: this.state.id,
                          },
                        }
                      )
                      .then((response) => {
                        let record = response.data.data;
                        const shipmentTypes = this.state.shipmentTypes;
                        let shipmentType = shipmentTypes.filter(
                          (r) => r._id === record.shipmentType
                        )[0].name;

                        this.setState({
                          isDraft: record.isDraft || false,
                          status: record.status,
                          userId: record.userId,
                          requestTypes: record.requestTypes,
                          shipmentTypeId: record.shipmentType,
                          shipmentAddress: record.shipmentAddress,
                          files: record.files,
                          msftAlias: record.msftAlias,
                          priority: record.priority,
                          projectName: record.projectName,
                          requestDescription: record.requestDescription,
                          createdAt: record.createdAt,
                          modifiedAt: record.modifiedAt,
                          requestedCompletionDate:
                            record.requestedCompletionDate,
                          expectedCompletionDate: record.expectedCompletionDate,
                          shipmentType: shipmentType,
                          projectContact: record.projectContact,
                          techContact: record.techContact,
                          successCriteria: record.successCriteria,
                        });
                      });
                  });
              });
          });
      });
  }

  OnSubmit(event) {
    event.preventDefault();

    let requestTypes = this.state.requestTypes;

    axios
      .put(
        `${services.baseUrl}${
          services.updateEngineeringRequest
        }?authToken=${getToken()}`,
        {
          _id: this.state.id,
          projectContact: this.state.projectContact,
          techContact: this.state.techContact,
          status: this.state.status,
          shipmentTypeId: this.state.shipmentTypeId,
          shipmentAddress: this.state.shipmentAddress,
          requestedCompletionDate: this.state.requestedCompletionDate,
          expectedCompletionDate: this.state.expectedCompletionDate,
          msftAlias: this.state.msftAlias,
          requestDescription: this.state.requestDescription,
          priority: this.state.priority,
          projectName: this.state.projectName || "N/A",
          requestTypes: requestTypes,
          successCriteria: this.state.successCriteria,
          files: this.state.files,
          userId: this.state.userId,
          isDraft: this.state.isDraft,
        }
      )
      .then((response) => {
        alert(response.data.message);
        if (response.data.success) {
          this.props.history.push("/engineering-requests");
        }
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
        <div className="edit-request-form reust-page Request-form">
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
            <form onSubmit={this.OnSubmit}>
              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Desired Due Date: </label>
                    </div>
                    <div class="col-md-8">
                      <DateTimePicker
                        value={this.state.requestedCompletionDate}
                        onChange={(date) =>
                          this.setState({ requestedCompletionDate: date })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Expected Due Date: </label>
                    </div>
                    <div class="col-md-8">
                      <DateTimePicker
                        value={this.state.expectedCompletionDate}
                        onChange={(date) =>
                          this.setState({ expectedCompletionDate: date })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label class="text-left">Priority:</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        class="form-control"
                        name="priority"
                        value={this.state.priority}
                        onChange={this.OnInputChange}
                      >
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Status:</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.OnInputChange}
                      >
                        {this.state.statuses &&
                          this.state.statuses.map((type) => (
                            <option key={type._id} value={type._id}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>
                        Requested By<span class="required">*</span>:
                      </label>
                    </div>
                    <div class="col-md-8">
                      <select
                        disabled
                        class="form-control form-control-sm"
                        value={this.state.userId}
                      >
                        <option>--Select--</option>
                        {this.state.users &&
                          this.state.users.map((user) => (
                            <option value={user._id} key={user._id}>
                              {user.firstname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>
                        MSFT Alias<span class="required">*</span>:
                      </label>
                    </div>
                    <div class="col-md-8">
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

              <div className="row">
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Project Contact:</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        name="projectContact"
                        class="form-control form-control-sm"
                        value={this.state.projectContact}
                        onChange={this.OnInputChange}
                      >
                        <option>--Select--</option>
                        {this.state.users &&
                          this.state.users.map((user) => (
                            <option value={user._id} key={user._id}>
                              {user.firstname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Technical Contact:</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        name="techContact"
                        class="form-control form-control-sm"
                        onChange={this.OnInputChange}
                        value={this.state.techContact}
                      >
                        <option>--Select--</option>
                        {this.state.users &&
                          this.state.users.map((user) => (
                            <option value={user._id} key={user._id}>
                              {user.firstname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-md-3">
                      <label class="text-left">Project Name:</label>
                    </div>
                    <div class="col-md-9">
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
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-md-3">
                      <label>Support Request Description:</label>
                    </div>
                    <div class="col-md-9">
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
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Shipment Type:</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        className="form-control"
                        name="shipmentTypeId"
                        value={this.state.shipmentTypeId}
                        onChange={this.OnShipmentTypeChange}
                      >
                        <option value={null}>--Select--</option>
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

                {this.state.shipmentType &&
                  (this.state.shipmentType === "Ship to Address" ||
                    this.state.shipmentType === "Other") && (
                    <div class="form-group col-md-6">
                      <div class="row">
                        <div class="col-md-4">
                          <label>{this.state.shipmentType}:</label>
                        </div>
                        <div class="col-md-8">
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

              {this.state.requestTypes &&
                this.state.requestTypes.map((requestType) => (
                  <>
                    <h4 key={requestType._id}>{requestType.name}</h4>
                    {requestType.categories &&
                      requestType.categories.map((category) => (
                        <div
                          class="form-check-inline"
                          key={category.categoryId}
                        >
                          <label class="form-check-label">
                            <input
                              checked
                              disabled
                              type="checkbox"
                              class="form-check-input"
                              value={category.isSelected}
                            />
                            {category.categoryName}
                          </label>
                        </div>
                      ))}

                    <hr />
                    <br />
                  </>
                ))}

              <h4>Success Criteria</h4>
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
                <span>(you can add multiple shared file links)</span>
              </h4>

              <div class="row">
                <div className="col-5 mb-3 ">
                  <div class="add-link">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="url"
                      value={this.state.url}
                      onChange={this.OnInputChange}
                      placeholder="Enter shared file link here."
                    />

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={this.AddFile}
                    >
                      Add Link
                    </button>
                  </div>
                </div>
              </div>
              {this.state.files &&
                this.state.files.map((file) => (
                  <div className="row" key={file}>
                    <div className="col-4">
                              <span className="link-remove">{file}
                    
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={(event) => this.DeleteFile(event, file)}
                      >
                        <i className="fa fa-close" />
                      </button>
                      </span>
                    </div>
                  </div>
                ))} 


              <div className="button ">
                <button class="btn btn-primary submit-button">SAVE JOB</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
