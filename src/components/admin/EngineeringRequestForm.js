import React from "react";
import axios from "axios";
import { services, Constants } from "../common/constant";
import {
  getAliasFromEmail,
  getToken,
  getUserAlias,
  getUserEmail,
  getUserId,
} from "../common/helpers";
import DateTimePicker from "react-datetime-picker";
import Autocomplete from "react-autocomplete";

class RequestType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      newCategory: "",
    };
    this.OnInputChange = this.OnInputChange.bind(this);
  }

  componentDidMount() {
    axios
      .post(
        `${services.baseUrl}${services.categoryList}?authToken=${getToken()}`,
        { _id: this.props.requestType._id }
      )
      .then((response) => {
        this.setState({
          categories: response.data.data,
        });
      });
  }

  OnCheckChange(event, category) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    category.isSelected = value;

    this.props.OnCategoriesChange(this.state.categories);
  }

  OnInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <h5>
          {this.props.requestType.name} <span>(check all that apply):</span>
        </h5>
        {this.state.categories
          .filter((category) => category.isActive)
          .map((category) => (
            <div class="form-check-inline" key={category.categoryId}>
              <label class="form-check-label">
                <input
                  required={category.isRequired}
                  type="checkbox"
                  class="form-check-input"
                  value={category.isSelected}
                  onChange={(event) => this.OnCheckChange(event, category)}
                />
                {category.categoryName}
              </label>
              {category.isRequired && <span class="required">*</span>}
            </div>
          ))}
        <div class="row">
          <div class="form-group col-md-12 big-textarea">
            <textarea
              value={this.state.newCategory}
              onChange={this.OnInputChange}
              name="newCategory"
              class="form-control"
              placeholder="If not present in the list then please type here."
              id="comment"
            ></textarea>

            <small style={{ color: "red" }}>Fields with * are mandatory</small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default class EngineeringRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shipmentTypes: [],
      users: [],
      isOpen: props.isOpen,
      shipmentType: "",
      url: "",
      // form fields
      requestTypes: [],
      shipmentTypeId: Constants.HARDWARE_LAB_CABINET,
      shipmentAddress: "",
      dueDate: null,
      userId: getUserId(),
      msftAlias: getUserAlias(),
      customerId: getUserEmail(), //getUserId(),
      customerMsftAlias: getUserAlias(),
      requestDescription: "",
      priority: 2,
      projectName: "",
      successCriteria: "",
      files: [],
      isDraft: false,
    };

    this.OnInputChange = this.OnInputChange.bind(this);
    this.CloseDialog = this.CloseDialog.bind(this);
    this.OnCategoriesChange = this.OnCategoriesChange.bind(this);
    this.OnShipmentTypeChange = this.OnShipmentTypeChange.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
    this.SaveDraft = this.SaveDraft.bind(this);
    this.AddFile = this.AddFile.bind(this);
    this.DeleteFile = this.DeleteFile.bind(this);
    this.OnDateChange = this.OnDateChange.bind(this);
    this.OnCustomerChange = this.OnCustomerChange.bind(this);
  }

  CloseDialog() {
    this.setState({ isOpen: false });
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

  OnCategoriesChange(categories, requestTypeIndex) {
    let requestTypes = this.state.requestTypes;
    requestTypes[requestTypeIndex].categories = categories;

    this.setState({
      requestTypes: requestTypes,
    });
  }

  OnShipmentTypeChange(event) {
    let value = event.target.value;
    let name = this.state.shipmentTypes.filter((r) => r._id == value);
    if (name.length == 0) return;
    this.setState({
      shipmentType: name[0].name,
      shipmentTypeId: value,
    });
  }

  OnCustomerChange(e) {
    let value = e.target.value;
    let email = e.target.value; //this.state.users.filter((r) => r._id == value)[0].email;
    this.setState({
      customerId: value,
      customerMsftAlias: getAliasFromEmail(email),
    });
  }

  SaveDraft(event) {
    event.preventDefault();

    this.setState({
      isDraft: true,
    });
    this.OnSubmit(event);
  }

  Clear() {
    this.setState({
      requestTypes: [],
      shipmentTypeId: Constants.HARDWARE_LAB_CABINET,
      shipmentAddress: "",
      dueDate: null,
      userId: getUserId(),
      msftAlias: getUserAlias(),
      customerId: getUserId(),
      customerMsftAlias: getUserAlias(),
      requestDescription: "",
      priority: 2,
      projectName: "",
      successCriteria: "",
      files: [],
      isDraft: false,
    });
  }

  OnSubmit(event) {
    event.preventDefault();

    // selected request type and categories
    let requestTypes = [];
    for (let index = 0; index < this.state.requestTypes.length; index++) {
      let type = this.state.requestTypes[index];
      if (!type.categories) break;

      let categories = type.categories.filter((r) => r.isSelected);
      if (categories.length === 0) break;

      let requestType = type;
      requestType.categories = categories;
      requestTypes.push(requestType);
    }

    axios
      .post(
        `${services.baseUrl}${
          services.createEngineeringRequest
        }?authToken=${getToken()}`,
        {
          shipmentTypeId: this.state.shipmentTypeId,
          shipmentAddress: this.state.shipmentAddress,
          dueDate: this.state.dueDate,
          userId: this.state.userId,
          msftAlias: this.state.msftAlias,
          customerId: this.state.customerId,
          customerMsftAlias: this.state.customerMsftAlias,
          requestDescription: this.state.requestDescription,
          priority: this.state.priority,
          projectName: this.state.projectName || "N/A",
          requestTypes: requestTypes,
          successCriteria: this.state.successCriteria,
          files: this.state.files,
          isDraft: this.state.isDraft,
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert("Your request has been submitted. Press OK to continue.");
          this.Clear();
          this.CloseDialog();
        } else {
          alert(response.data.message);
        }
      });
  }

  OnDateChange(date) {
    this.setState({
      dueDate: date,
    });
    console.log(date);
  }

  Populate() {
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
                  services.shipmentTypesList
                }?authToken=${getToken()}`
              )
              .then((response) =>
                this.setState({
                  requestTypes: requestTypes,
                  users: users,
                  shipmentTypes: response.data.data,
                })
              );
          });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen != this.props.isOpen) {
      this.setState({ isOpen: this.props.isOpen });
      this.Populate();
    }
  }

  componentDidMount() {
    this.Populate();
  }

  render() {
    return (
      <React.Fragment>
        <div
          class={`modal right fade Request-form ${
            this.state.isOpen ? "show" : ""
          }`}
          id="myModal-1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  onClick={this.CloseDialog}
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <img src="images/ico_close.png" />
                  </span>
                </button>
              </div>

              <div class="modal-body">
                <div class="model-form">
                  <div class="tab-first">
                    <h4 class="modal-title" id="myModalLabel2">
                      <img src="images/engerinering-form.png" />
                      Engineering Request Form
                      <span style={{ color: "red" }}>
                        Fields with * are mandatory
                      </span>
                    </h4>
                    <form onSubmit={this.OnSubmit}>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <div class="row">
                            <div class="col-md-5">
                              <label>Desired Due Date:</label>
                            </div>
                            <div class="col-md-7">
                              <DateTimePicker
                                format="MM-dd-y HH:mm"
                                name="dueDate"
                                value={this.state.dueDate}
                                onChange={(date) =>
                                  this.setState({ dueDate: date })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="row">
                            <div class="col-md-5">
                              <label class="text-left">Priority:</label>
                            </div>
                            <div class="col-md-7">
                              <select
                                name="priority"
                                class="form-control"
                                value={this.state.priority}
                                onChange={this.OnInputChange}
                              >
                                <option value={4}>Critical</option>
                                <option value={1}>High</option>
                                <option value={2}>Normal</option>
                                <option value={3}>Low</option>
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
                                Submitted By<span class="required">*</span> :
                              </label>
                            </div>
                            <div class="col-md-7">
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
                            <div class="col-md-5">
                              <label>MSFT Alias:</label>
                            </div>
                            <div class="col-md-7">
                              <input
                                readOnly={true}
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
                              <label>
                                Customer Email<span class="required">*</span>:
                              </label>
                            </div>
                            <div class="col-md-7">
                              <input
                                required={true}
                                type="text"
                                placeholder="Alias"
                                class="form-control"
                                name="customerId"
                                value={this.state.customerId}
                                onChange={this.OnCustomerChange}
                              />
                              {/* <select
                                required
                                name="customerId"
                                onChange={this.OnCustomerChange}
                                class="form-control form-control-sm"
                                value={this.state.customerId}
                              >
                                <option>--Select--</option>
                                {this.state.users &&
                                  this.state.users.map((user) => (
                                    <option value={user._id} key={user._id}>
                                      {user.firstname}
                                    </option>
                                  ))}
                              </select> */}
                              {/* https://github.com/reactjs/react-autocomplete */}
                              {/* <Autocomplete /> */}
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-6">
                          <div class="row">
                            <div class="col-md-5">
                              <label>
                                Customer MSFT Alias
                                <span class="required">*</span>:
                              </label>
                            </div>
                            <div class="col-md-7">
                              <input
                                readOnly={true}
                                type="text"
                                placeholder="Alias"
                                class="form-control"
                                name="customerMsftAlias"
                                value={this.state.customerMsftAlias}
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
                              <label class="text-left">
                                Project Name<span class="required">*</span>:
                              </label>
                            </div>
                            <div class="col-md-7">
                              <input
                                required
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

                      <div className="row">
                        <div class="form-group col-md-12">
                          <div class="row">
                            <div class="col-md-5">
                              <label>Support Request Description:</label>
                            </div>
                          </div>
                          <div className="row">
                            <div class="col-md-12">
                              <textarea
                                class="form-control"
                                placeholder="Type description here"
                                name="requestDescription"
                                id="comment"
                                value={this.state.requestDescription}
                                onChange={this.OnInputChange}
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            <small style={{ color: "red" }}>
                              Fields with * are mandatory
                            </small>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <h5>Shipment Details </h5>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <div class="row">
                            <div class="col-md-5">
                              <label>Delivery Method:</label>
                            </div>
                            <div class="col-md-7">
                              <select
                                name="shipmentType"
                                class="form-control"
                                value={this.state.shipmentTypeId}
                                onChange={this.OnShipmentTypeChange}
                              >
                                <option value={null}>--Select--</option>
                                {this.state.shipmentTypes.map((type) => (
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
                                <div class="col-md-5">
                                  <label>{this.state.shipmentType}:</label>
                                </div>
                                <div class="col-md-7">
                                  <textarea
                                    class="form-control"
                                    placeholder="Type details here."
                                    name="shipmentAddress"
                                    id="comment"
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

                      {this.state.requestTypes.map((requestType, index) => (
                        <RequestType
                          OnCategoriesChange={(categories) =>
                            this.OnCategoriesChange(categories, index)
                          }
                          key={requestType._id}
                          requestType={requestType}
                        />
                      ))}

                      <h5>Success Criteria</h5>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            name="successCriteria"
                            class="form-control"
                            placeholder="Type citeria here"
                            id="comment"
                            value={this.state.successCriteria}
                            onChange={this.OnInputChange}
                          ></textarea>
                        </div>
                      </div>

                      <h5>
                        Please include any additional information, documents,
                        drawaings, specifications, manufacturing files, etc.
                        that will help aid in the project planning for your
                        project.
                        <br />
                        <span>(you can add multiple shared file links)</span>
                      </h5>

                      <div class="row">
                        <div className="col-6 pr-0 mb-3 ">
                          <div class="add-link">
                            <input
                              className="form-control"
                              type="text"
                              name="url"
                              value={this.state.url}
                              onChange={this.OnInputChange}
                              placeholder="Enter shared file link here."
                            />

                            <button
                              type="button"
                              className="btn btn-secondary "
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
                              <span className="link-remove">
                                {file}
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={(event) =>
                                    this.DeleteFile(event, file)
                                  }
                                >
                                  <i className="fa fa-close" />
                                </button>
                              </span>
                            </div>
                          </div>
                        ))}

                      <div class="button">
                        <button
                          type="submit"
                          class="btn btn-primary submit-button"
                        >
                          SUBMIT
                        </button>

                        <button
                          type="button"
                          onClick={this.SaveDraft}
                          class="btn btn-primary save save-draft"
                        >
                          SAVE AS DRAFT
                        </button>
                      </div>
                      <p>
                        <button
                          onClick={this.CloseDialog}
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Close
                        </button>
                        | &nbsp; Questions? <a href="#">Contact us </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
