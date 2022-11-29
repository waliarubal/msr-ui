import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import { formatDate, getToken, isAdmin } from "../common/helpers";
import { Link } from "react-router-dom";

export default class EngineeringRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      statuses: [],
      isReload: false,
      isAdmin: isAdmin(),
    };
    this.GetRequests = this.GetRequests.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `${services.baseUrl}${services.getUsersList}?authToken=${getToken()}`
      )
      .then((response) => {
        let users = response.data.data;

        axios
          .get(
            `${services.baseUrl}${services.getStatus}?authToken=${getToken()}`
          )
          .then((response) => {
            this.setState({
              statuses: response.data.data,
              users: users,
            });

            this.GetRequests();
          });
      });
  }

  GetRequests() {
    axios
      .get(
        `${services.baseUrl}${
          services.getEngineeringRequests
        }?authToken=${getToken()}`
      )
      .then((response) => {
        this.setState({
          requests: response.data.data,
          isReload: !this.state.isReload,
        });
      });
  }

  Delete(requestId) {
    axios
      .delete(
        `${services.baseUrl}${
          services.deleteEngineeringRequest
        }?authToken=${getToken()}&requestId=${requestId}`
      )
      .then((response) => this.GetRequests());
  }

  render() {
    return (
      <React.Fragment>
        <div class="edit-request-form">
          <div class="container">
            <h5>
              <img src="images/engerinering-form.png" />
              Request Queue
            </h5>
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link  panel-collapse"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      New Request Queue
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse  show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead class="thead-light">
                          <tr>
                            <th>Draft</th>
                            <th>Submitted On</th>
                            {isAdmin && <th>CRM Status</th>}
                            <th>Requester's Email</th>
                            <th>Submitter's Email</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Desired Due Date</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.requests &&
                            this.state.requests.map((request) => (
                              <tr key={request._id}>
                                <td>{request.isDraft ? "Yes" : "No"}</td>
                                <td>{request.submittedOn}</td>
                                {isAdmin && (
                                  <td>
                                    {request.crmId
                                      ? "Submitted"
                                      : "Not Yet Submitted"}
                                  </td>
                                )}
                                <td>{request.requesterEmail}</td>
                                <td>
                                  <select
                                    disabled
                                    class="form-control form-control-sm"
                                    value={request.userId}
                                  >
                                    <option>--Select--</option>
                                    {this.state.users &&
                                      this.state.users.map((user) => (
                                        <option value={user._id} key={user._id}>
                                          {user.email}
                                        </option>
                                      ))}
                                  </select>
                                </td>
                                <td>{request.requestDescription}</td>
                                <td>
                                  <Link
                                    to={`/engineering-request/${request._id}`}
                                  >
                                    {request.projectName}
                                  </Link>
                                </td>
                                <td>
                                  {formatDate(request.requestedCompletionDate)}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => this.Delete(request._id)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
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
