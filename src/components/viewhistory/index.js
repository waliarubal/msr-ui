import React from "react";
import axios from "axios";
import { services } from "../common/constant";
// import Dialog from '../home/dialog'
import { Link } from "react-router-dom";

export default class ViewHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyData: "",
      reqId: null,
      status: "",
      role: "",
    };
  }
  componentDidMount() {
    axios
      .get(
        services.baseUrl +
          services.historyList +
          "?authToken=" +
          sessionStorage.getItem("authToken")
      )
      .then((response) => {
        this.setState({
          historyData: response.data.data,
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
        if (sessionStorage.getItem("user")) {
          axios
            .get(
              services.baseUrl +
                services.roles +
                "?authToken=" +
                sessionStorage.getItem("authToken")
            )
            .then((response) => {
              response.data.data.forEach((element) => {
                if (
                  element._id ===
                  JSON.parse(sessionStorage.getItem("user")).role
                ) {
                  this.setState({ role: element.name });
                }
              });
            });
        } else {
          this.setState({ role: "User" });
        }
      });
  }
  closeDialog = () => {
    // console.log('asd')
    this.setState({
      dialogState: false,
    });
  };
  openDialog = (e, id) => {
    this.setState({
      dialogState: true,
      reqId: id,
    });
  };
  render() {
    const items = [];
    if (this.state.historyData) {
      for (let i = 0; i < this.state.historyData.length; i++) {
        items.push(
          <tr>
            <td>
              <Link to={"/jobDetail/" + this.state.historyData[i]._id}>
                {this.state.historyData[i].jobName}
              </Link>
            </td>
            <td>{this.state.status[this.state.historyData[i].status]}</td>
            <td>{this.state.historyData[i].createdAt}</td>
          </tr>
        );
      }
    }
    return (
      <div class="content-section">
        <div class="work-section job-section">
          <div class="container">
            <div class="work-section-inner">
              <h2>Request History</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="jobs-table safety pb-3">
            {/* <Grid columnDefs={this.columnDefs} rowData={this.state.historyData} frameworkComponents={{
                            customLinkCellRenderer: CustomLinkCellRenderer
                        }}></Grid> */}

            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Job Name</th>
                    <th>Status</th>
                    <th>Date </th>
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
