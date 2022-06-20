import React from "react";
import Newsletter from "../common/newsletter";
import axios from "axios";
import { services } from "../common/constant";
import Header from "../common/header";
import Footer from "../common/footer";

export default class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      selectedList: [],
      selNotes: true,
    };
  }
  componentDidMount() {
    axios
      .post(
        services.baseUrl +
          services.getRequestsByUserId +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        {
          userId: sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user"))._id
            : "",
          role: sessionStorage.getItem("role"),
        }
      )
      .then((usersRes) => {
        if (usersRes.data.data) {
          this.setState({
            userList: usersRes.data.data,
          });
        }
      });
  }
  handleCheckBox = (e) => {
    const elem = e.target;
    const selId = elem.getAttribute("id");
    const selEmail = elem.getAttribute("emailId");
    const optType = elem.getAttribute("optType");
    const shippingAddress = elem.getAttribute("shippingAddress");
    if (elem.checked) {
      this.setState({
        selectedList: [
          ...this.state.selectedList,
          { id: selId, email: selEmail, optType, shippingAddress },
        ],
      });
    } else {
      let selList = this.state.selectedList;
      this.setState({
        selectedList: selList.filter((item) => item.id !== selId),
      });
    }
  };
  optout = (e) => {
    if (this.state.selNotes) {
      this.state.selectedList.forEach((elem, i) => {
        var bodyFormData = new FormData();
        const contactPerson = elem.optType === "address" ? null : "";
        const shippingAddress = elem.optType !== "address" ? null : "";
        bodyFormData.set("contactPerson", contactPerson);
        bodyFormData.set("shippingAddress", shippingAddress);
        elem.optType !== "address"
          ? bodyFormData.set("shippingAddress", null)
          : bodyFormData.set("shippingAddress", "");
        bodyFormData.set(
          "userId",
          sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user"))._id
            : ""
        );
        axios({
          method: "put",
          url:
            services.baseUrl +
            services.updateRequestById +
            "?authToken=" +
            sessionStorage.getItem("authToken") +
            "&_id=" +
            elem.id,
          data: {
            contactPerson: contactPerson,
            shippingAddress: shippingAddress,
            userId: sessionStorage.getItem("user")
              ? JSON.parse(sessionStorage.getItem("user"))._id
              : "",
          },
        }).then((response) => {
          alert("Optout successful.");
          window.location.reload(false);
        });
      });
    } else {
      alert("Please select agreement");
    }
  };
  render() {
    let list = [];
    let list2 = [];
    if (this.state.userList && this.state.userList.address) {
      this.state.userList.address.forEach((elem, i) => {
        {
          elem.address &&
            list.push(
              <tr>
                <td style={{ width: "30px" }}>
                  <input
                    type="checkbox"
                    id={elem._id}
                    shippingAddress={elem.address}
                    optType="address"
                    onClick={this.handleCheckBox}
                  />
                </td>
                <td>{elem.createdBy || "-"}</td>
                <td>{elem.address ? elem.address : "None"}</td>
              </tr>
            );
        }
      });
      this.state.userList.emails.forEach((elem, i) => {
        {
          elem.email &&
            list2.push(
              <tr>
                <td style={{ width: "30px" }}>
                  <input
                    type="checkbox"
                    id={elem._id}
                    optType="email"
                    onClick={this.handleCheckBox}
                    emailId={elem.email}
                  />
                </td>
                <td>{elem.createdBy || "-"}</td>
                <td>{elem.email ? elem.email : "None"}</td>
              </tr>
            );
        }
      });
    }
    return (
      <React.Fragment>
        <Header />
        <div class="content-section content-wrapper">
          <div class="privacy-section">
            <div class="container">
              <div class="overview-section-inner">
                <div className="pb-3">
                  <h1>Privacy Policy</h1>
                  <h6>
                    We have the following emails and shipping addresses stored
                    in your account. You can opt out of storing them below.
                  </h6>
                </div>
                <div class="privacy-table">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="table-responsive">
                        <fieldset style={{ width: "100%" }}>
                          <legend>Select Address</legend>

                          <table class="table table-striped ">
                            <thead>
                              <tr>
                                <th class="center"> </th>
                                <th>Created By</th>
                                <th class="center">Address </th>
                              </tr>
                            </thead>
                            <tbody>{list}</tbody>
                          </table>
                        </fieldset>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="table-responsive">
                        <fieldset style={{ width: "100%" }}>
                          <legend>Select Email</legend>

                          <table class="table table-striped ">
                            <thead>
                              <tr>
                                <th class="center" width="5%"></th>
                                <th>Created By</th>
                                <th class="center">Email</th>
                              </tr>
                            </thead>
                            <tbody>{list2}</tbody>
                          </table>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="opt-out">
                  <button
                    disabled={this.state.selectedList.length === 0}
                    class="btn btn-primary rightAlign"
                    onClick={this.optout}
                  >
                    Opt Out of Storing This Email/Address
                  </button>
                  <br />
                  <br />
                  <a
                    target="_blank"
                    href="http://go.microsoft.com/fwlink/?LinkId=518021"
                  >
                    Notice & Consent Statement
                  </a>
                  <br />
                  <a
                    target="_blank"
                    href="https://go.microsoft.com/fwlink/?LinkId=521839"
                  >
                    Data Privacy Notice
                  </a>
                  <br />
                  {/* <input type='checkbox' onClick={e => {
                                        this.setState({ selNotes: e.target.checked })
                                    }} /> I agree to the privacy and data retention policies<br></br> */}
                  {/* <button class="btn btn-primary rightAlign" onClick={this.optout}>Save</button> &nbsp;&nbsp; */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </React.Fragment>
    );
  }
}
