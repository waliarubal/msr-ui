import React from "react";
import axios from "axios";
import { services } from "../common/constant";

export default class EditEngineeringRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestList: [],
    };
  }

  getToken() {
    return sessionStorage.getItem("authToken");
  }

  componentDidMount() {
    let requests = [];
    axios
      .get(
        `${services.baseUrl}${services.reqList}?authToken=${this.getToken()}`
      )
      .then((response) => {
        requests = response.data.data;
        requests.forEach((request) => {
          axios
            .post(
              `${services.baseUrl}${
                services.categoryList
              }?authToken=${this.getToken()}`,
              { _id: request._id }
            )
            .then((response) => (request.categories = response.data.data));
        });

        this.setState({
          requestList: requests,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div class="edit-request-form">
          <div class="container">
            <h5>
              <img src="images/engerinering-form.png" />
              Edit Engineering Requst Form
            </h5>
            <div class="accordion" id="accordionExample">
              {this.state.requestList.map((request) => (
                <div class="card">
                  <div class="card-header" id={request._id}>
                    <h2 class="mb-0">
                      <button
                        class="btn btn-link  panel-collapse"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        {request.name}
                        <div class="button r" id="button-1">
                          <input type="checkbox" class="checkbox" />
                          <div class="knobs"></div>
                          <div class="layer"></div>
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    class="collapse show "
                    aria-labelledby={request._id}
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-striped">
                          <thead class="thead-light">
                            <tr>
                              <th>Field</th>
                              <th>
                                <h6>Visible (yes/no)</h6>
                              </th>
                              <th>
                                <h6>Mandotory (yes/no)</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>3D printing</td>
                              <td>
                                <div class="button r" id="button-1">
                                  <input type="checkbox" class="checkbox" />
                                  <div class="knobs"></div>
                                  <div class="layer"></div>
                                </div>
                              </td>
                              <td>
                                <div class="button r" id="button-1">
                                  <input type="checkbox" class="checkbox" />
                                  <div class="knobs"></div>
                                  <div class="layer"></div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Other, please describe:</td>
                              <td>
                                <div class="button r" id="button-1">
                                  <input type="checkbox" class="checkbox" />
                                  <div class="knobs"></div>
                                  <div class="layer"></div>
                                </div>
                              </td>
                              <td>
                                <div class="button r" id="button-1">
                                  <input type="checkbox" class="checkbox" />
                                  <div class="knobs"></div>
                                  <div class="layer"></div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href="" class="add-new">
                                  Add new
                                </a>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link  panel-collapse "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Electrical Engineering or Technician Support
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" />
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse show "
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead class="thead-light">
                          <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>{" "}
                              <h6>Add/Hide </h6>
                            </th>
                            <th>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                              <h6>Mandotory (yes/no) </h6>{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Soldering, PCB rework</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>Electrical wiring & assembly</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>PCB fabrication</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>PCB assembly (solder parts onto PCB)</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Altium library part creation</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Altium PCB layout</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Electrical circuit design</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Electrical circuit troubleshooting</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Consultation</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Other, please describe:</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="" class="add-new">
                                Add new
                              </a>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingfour">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link  panel-collapse "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsefour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Firmware or Software Engineering
                      <div class="button r" id="button-1">
                        <input type="checkbox" class="checkbox" />
                        <div class="knobs"></div>
                        <div class="layer"></div>
                      </div>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapsefour"
                  class="collapse show "
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead class="thead-light">
                          <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>{" "}
                              <h6>Add/Hide </h6>
                            </th>
                            <th>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                              <h6>Mandotory (yes/no) </h6>{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Firmware coding</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>Consultation</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>Other, please describe:</td>
                            <td>
                              <select class="form-control">
                                <option>--Select--</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                                <option>Normal</option>
                              </select>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div class="button r" id="button-1">
                                <input type="checkbox" class="checkbox" />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="" class="add-new">
                                Add new
                              </a>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
