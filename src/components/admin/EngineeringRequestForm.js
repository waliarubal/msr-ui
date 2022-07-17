import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import { getToken, getUserId } from "../common/helpers";

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
          {this.props.requestType.name} <span>(check all that apply):</span>{" "}
        </h5>
        {this.state.categories.map((category) => (
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
    this.CloseDialog = this.CloseDialog.bind(this);
    this.OnCategoriesChange = this.OnCategoriesChange.bind(this);
    this.OnShipmentTypeChange = this.OnShipmentTypeChange.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
    this.AddFile = this.AddFile.bind(this);
    this.DeleteFile = this.DeleteFile.bind(this);
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
    let name = this.state.shipmentTypes.filter((r) => r._id === value);
    if (name.length == 0) return;
    this.setState({
      shipmentType: name[0].name,
      shipmentTypeId: value,
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
          requestBy: this.state.requestedBy,
          msftAlias: this.state.msftAlias,
          requestDescription: this.state.requestDescription,
          priority: this.state.priority,
          projectName: this.state.projectName,
          requestTypes: requestTypes,
          successCriteria: this.state.successCriteria,
          files: this.state.files,
          userId: getUserId(),
        }
      )
      .then((response) => {
        alert(response.data.message);
        if (response.data.success) {
          this.CloseDialog();
        }
      });
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
          .then((response) =>
            this.setState({
              requestTypes: requestTypes,
              shipmentTypes: response.data.data,
            })
          );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen != this.props.isOpen)
      this.setState({ isOpen: this.props.isOpen });
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
                      <span>Fields with * are mandatory</span>
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <form onSubmit={this.OnSubmit}>
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
                              <label class="text-right">Priority</label>
                            </div>
                            <div class="col-md-7">
                              <select
                                name="priority"
                                class="form-control"
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
                                Requested By<span class="required">*</span> :
                              </label>
                            </div>
                            <div class="col-md-7">
                              <input
                                required={true}
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
                              <label class="text-right">Project Name: </label>
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
                                required={true}
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
                              <label>Support Request Description: </label>
                            </div>
                            <div class="col-md-7">
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
                      </div>
                      <hr />
                      <h5>Shipment Details </h5>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <div class="row">
                            <div class="col-md-6">
                              <label>Shipment Type: </label>
                            </div>
                            <div class="col-md-6">
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
                                <div class="col-md-6">
                                  <label>{this.state.shipmentType}:</label>
                                </div>
                                <div class="col-md-6">
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

                      <h5>
                        Success Criteria<span class="required">*</span>
                      </h5>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            required={true}
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

                      {this.state.files &&
                        this.state.files.map((file) => (
                          <div className="row mb-1" key={file}>
                            <div className="col-auto">{file}</div>
                            <div className="col-auto">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={(event) =>
                                  this.DeleteFile(event, file)
                                }
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </div>
                        ))}
                      <div class="row">
                        <div className="col pr-0">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            name="url"
                            value={this.state.url}
                            onChange={this.OnInputChange}
                            placeholder="Enter shared file link here."
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={this.AddFile}
                          >
                            Add Link
                          </button>
                        </div>
                      </div>

                      <div class="button">
                        <button
                          type="submit"
                          class="btn btn-primary submit-button"
                        >
                          SUBMIT JOB
                        </button>

                        <button class="btn btn-primary save save-draft">
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
