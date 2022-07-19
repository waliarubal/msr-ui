import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import { getToken } from "../common/helpers";
import { CheckBox } from "../common/CheckBox";

class EngineeringRequestFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: props.request,
      isReload: false,
      categoryName: "",
      categories: [],
    };
    this.OnInputChanged = this.OnInputChanged.bind(this);
    this.CreateCategory = this.CreateCategory.bind(this);
  }

  componentDidMount() {
    this.LoadCategories();
  }

  LoadCategories() {
    axios
      .post(
        `${services.baseUrl}${services.categoryList}?authToken=${getToken()}`,
        { _id: this.props.request._id }
      )
      .then((response) => {
        this.setState({
          categories: response.data.data,
        });
      });
  }

  RenameCategory(event, category) {
    event.preventDefault();

    let name = prompt(
      `Enter new name for category '${category.categoryName}'.`,
      category.categoryName
    );
    if (!name) return;
    category.categoryName = name;

    this.UpdateCategory(category);
  }

  UpdateCategory(category) {
    axios
      .put(
        `${services.baseUrl}${services.categoryUpdate}?authToken=${getToken()}`,
        category
      )
      .then((response) => this.setState({ isReload: !this.state.isReload }));
  }

  CreateCategory(event) {
    event.preventDefault();
    if (!this.state.categoryName) {
      alert("Please enter new category name.");
      return;
    }

    let categoryName = this.state.categoryName;
    this.setState({ categoryName: "" });

    axios
      .post(
        `${services.baseUrl}${services.categoryCreate}?authToken=${getToken()}`,
        {
          name: categoryName,
          isActive: true,
          isRequired: false,
        }
      )
      .then((response) => {
        let categoryId = response.data.data._id;
        let requestId = this.state.request._id;
        axios
          .post(
            `${services.baseUrl}${
              services.mapRequestCategory
            }?authToken=${getToken()}`,
            {
              requestTypeId: requestId,
              categoryId: categoryId,
            }
          )
          .then(() => this.LoadCategories());
      });
  }

  OnInputChanged(event) {
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
        {this.state.categories.map((category) => (
          <tr key={category.categoryId}>
            <td>
              {category.categoryName}{" "}
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                title="Edit Category Name"
                onClick={(event) => this.RenameCategory(event, category)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </td>
            <td>
              <CheckBox
                isChecked={category.isActive}
                CheckChanged={(isChecked) => {
                  category.isActive = isChecked;
                  this.UpdateCategory(category);
                }}
              />
            </td>
            <td>
              <CheckBox
                isChecked={category.isRequired}
                CheckChanged={(isChecked) => {
                  category.isRequired = isChecked;
                  this.UpdateCategory(category);
                }}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <div class="form-group">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    value={this.state.categoryName}
                    onChange={this.OnInputChanged}
                    placeholder="Enter new category name."
                    class="form-control"
                    name="categoryName"
                    required
                  />
                </div>
                <div className="col-auto">
                  <a href="#" class="add-new" onClick={this.CreateCategory}>
                    Add new
                  </a>
                </div>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
        </tr>
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
    axios
      .get(`${services.baseUrl}${services.reqList}?authToken=${getToken()}`)
      .then((response) => {
        this.setState({
          requestList: response.data.data,
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
