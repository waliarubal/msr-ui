import React from "react";
import axios from "axios";
import { services } from "../common/constant";
// import Dialog from '../home/dialog'
import { Link } from "react-router-dom";

export default class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsData: "",
      status: "",
    };
  }
  componentDidMount() {
    let userId = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))._id
      : "";
    axios
      .get(
        services.baseUrl +
          services.historyList +
          "?authToken=" +
          sessionStorage.getItem("authToken") +
          "&userId=" +
          userId
      )
      .then((response) => {
        this.setState({
          jobsData: response.data.data,
        });
      });
    axios
      .get(
        services.baseUrl +
          services.getStatus +
          "?authToken=" +
          sessionStorage.getItem("authToken")
      )
      .then((response) => {
        let status = {};
        response.data.data.forEach((element) => {
          status[element._id] = element.name;
        });
        this.setState({
          status: status,
        });
      });
  }
  /* closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
    }
    openDialog = (e, id) => {
        this.setState({
            dialogState: true,
            reqId: id
        })
    } */
  render() {
    const items = [];
    for (let i = 0; i < this.state.jobsData.length; i++) {
      items.push(
        <tr>
          <td>
            <Link to={"/jobDetail/" + this.state.jobsData[i]._id}>
              {this.state.jobsData[i].jobName}
            </Link>
          </td>
          <td>{this.state.jobsData[i].createdAt}</td>
          <td>{this.state.jobsData[i].jobDetail}</td>
          <td>{this.state.jobsData[i].startDate}</td>
          <td>{this.state.status[this.state.jobsData[i].status]}</td>
          <td>{this.state.jobsData[i].expectedCompletionDate}</td>
        </tr>
      );
    }
    return (
      <div class="content-section">
        <div class="work-section job-section">
          <div class="container">
            <div class="work-section-inner">
              <h2>Services</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="jobs-table safety pb-3">
            <h1>My jobs </h1>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Title </th>
                    <th>Date Submitted</th>
                    <th>Desc.</th>
                    <th>Start Date </th>
                    <th>Status </th>
                    <th>Est. complete Date</th>
                  </tr>
                </thead>
                <tbody>{items}</tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} reqId={this.state.reqId} /> */}
      </div>
    );
  }
}
