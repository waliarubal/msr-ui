import React, { useState } from "react";

export default class EngineeringRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
      dueDate: "",
      requestedBy: "",
      msftAlias: "",
      requestDescription: "",
      priority: "",
      projectName: "",
    };

    this.OnInputChange = this.OnInputChange.bind(this);
    this.CloseDialog = this.CloseDialog.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen != this.props.isOpen)
      this.setState({ isOpen: this.props.isOpen });
  }

  render() {
    return (
      <React.Fragment>
        <div
          class={`modal right fade Request-form ${
            this.state.isOpen ? "show" : ""
          }`}
          id="myModal-1"
          tabindex="-1"
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
                    {" "}
                    <img src="images/ico_close.png" />
                  </span>
                </button>
              </div>

              <div class="modal-body">
                <div class="model-form">
                  <div class="tab-first">
                    <h4 class="modal-title" id="myModalLabel2">
                      <img src="images/engerinering-form.png" />
                      Engineering Request Form{" "}
                      <span>all field are mandatory </span>
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
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
                              <label class="text-right">Priority </label>
                            </div>
                            <div class="col-md-7">
                              <select class="form-control">
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
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
                                Requested By<span class="required">*</span> :{" "}
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
                                MSFT Alias<span class="required">*</span> :{" "}
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
                        <div class="form-group col-md-5">
                          <div class="row">
                            <div class="col-md-6">
                              <label>MSR Site Field: </label>
                            </div>
                            <div class="col-md-6">
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-5">
                          <div class="row">
                            <div class="col-md-6">
                              <label>Delivery Method: </label>
                            </div>
                            <div class="col-md-6">
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <br />
                      <h5>
                        Mechanical Technician Support{" "}
                        <span>(check all that apply):</span>{" "}
                      </h5>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />
                          3D Printing
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />
                          Laser cutting
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          CNC Fabrication <br /> (milling, cutting,etc.)
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Metal works <br /> (welding,bending/forming,etc.)
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          CAD Design
                        </label>
                      </div>

                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Fabric Design or construction
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Model finishin <br /> painting, polishing, etc.
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Consultation
                        </label>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            class="form-control"
                            placeholder="Type citeria here"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>

                      <h5>
                        Electrical Engineering or Technician Support{" "}
                        <span>(check all that apply):</span>{" "}
                      </h5>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />
                          Soldering, PCB rework
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />
                          Electrical wiring &amp; assembly
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          PCB fabrication
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          PCB assembly <br /> (solder parts onto PCB)
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Altium library part creation
                        </label>
                      </div>

                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Altium PCB layout
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Electrical circuit design
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Electrical circuit troubleshooting
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Consultation
                        </label>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            class="form-control"
                            placeholder="Type citeria here"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>
                      <h5>
                        Firmware or Software Engineering{" "}
                        <span>(check all that apply):</span>{" "}
                      </h5>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Firmware coding
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            value=""
                          />{" "}
                          Consultation
                        </label>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            class="form-control"
                            placeholder="Type citeria here"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>
                      <h5>
                        Success Criteria<span class="required">*</span>{" "}
                      </h5>
                      <div class="row">
                        <div class="form-group col-md-12 big-textarea">
                          <textarea
                            class="form-control"
                            placeholder="Type citeria here"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>

                      <h5>
                        Please include any additional information, documents,
                        drawaings, specifications, manufacturing files, etc.
                        that will help aid in the project planning for your
                        project.
                        <br />
                        <span>
                          (you can select and upload multiple files)
                        </span>{" "}
                      </h5>

                      <div class="row">
                        <div class="col-md-6">
                          <div id="myRadioGroup">
                            <input
                              type="radio"
                              name="cars"
                              checked="checked"
                              value="2"
                            />
                            <label for="html">Upload file</label>
                            <input type="radio" name="cars" value="3" />
                            <label for="html">Add link</label>
                            <div id="Cars2" class="desc">
                              <p>Share file </p>
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  id="customFile"
                                  name=" Gerber Upload "
                                />
                                <label
                                  class="custom-file-label"
                                  for="customFile"
                                >
                                  Browse{" "}
                                </label>
                              </div>
                            </div>
                            <div
                              id="Cars3"
                              class="desc"
                              style={{ display: "none" }}
                            >
                              <p>Share cloud link </p>
                              <div class="custom-file link-file">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  id="customFile"
                                  name=" Gerber Upload "
                                />
                                <label
                                  class="custom-file-label"
                                  for="customFile"
                                >
                                  Paste link here
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="button">
                        <button class="btn btn-primary submit-button">
                          SUBMIT JOB
                        </button>

                        <button
                          type="submit"
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
                        </button>{" "}
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
