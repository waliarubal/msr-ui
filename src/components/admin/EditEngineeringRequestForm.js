import React from "react";
import axios from "axios";
import { services } from "../common/constant";

function getToken() {
  return sessionStorage.getItem("authToken");
}

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
    };
    this.OnChecked = this.OnChecked.bind(this);
  }

  OnChecked() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div class="button r" id="button-1">
          <input
            type="checkbox"
            class="checkbox"
            checked={this.state.isChecked}
            onChange={this.OnChecked}
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </React.Fragment>
    );
  }
}

class EngineeringRequestFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: props.request,
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .post(
        `${services.baseUrl}${services.categoryList}?authToken=${getToken()}`,
        { _id: this.props.request._id }
      )
      .then((response) =>
        this.setState({
          categories: response.data.data,
        })
      );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.categories.map((category) => (
          <tr key={category.categoryId}>
            <td>{category.categoryName}</td>
            <td>
              <CheckBox isChecked={category.isActive} />
            </td>
            <td>
              <CheckBox isChecked={category.isActive} />
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  }
}

export default class EditEngineeringRequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestList: [],
    };
  }

  componentDidMount() {
    let requests = [];
    axios
      .get(`${services.baseUrl}${services.reqList}?authToken=${getToken()}`)
      .then((response) => {
        requests = response.data.data;
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
                <div class="card" key={request._id}>
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
                            <EngineeringRequestFields request={request} />
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
