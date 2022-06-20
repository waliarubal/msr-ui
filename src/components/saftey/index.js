import React from "react";
import axios from "axios";
import { services } from "../common/constant";
import Autocomplete from "react-autocomplete";

export default class Saftey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      safetyData: "",
      trainingList: [],
      training: "",
      playVideo: false,
      descHtml: [],
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("user")) {
      axios
        .get(
          services.baseUrl +
            services.roles +
            "?authToken=" +
            sessionStorage.getItem("authToken")
        )
        .then((response) => {
          if (response.data.message === "Invalid Token") {
            sessionStorage.clear();
            return this.props.history.push("/login");
          }
          response.data.data.forEach((element) => {
            if (
              element._id === JSON.parse(sessionStorage.getItem("user")).role
            ) {
              this.setState({ role: element.name });
            }
          });
        });
    } else this.setState({ role: "User" });
    this.getUserTraining();
    axios
      .get(
        services.baseUrl +
          services.getTraining +
          "?authToken=" +
          sessionStorage.getItem("authToken") +
          "&userId=" +
          JSON.parse(sessionStorage.getItem("user"))._id
      )
      .then((response) => {
        this.setState({
          trainingList: response.data.data,
        });
      });
  }
  getUserTraining = () => {
    axios
      .get(
        services.baseUrl +
          services.getLearning +
          "?authToken=" +
          sessionStorage.getItem("authToken") +
          "&userId=" +
          JSON.parse(sessionStorage.getItem("user"))._id
      )
      .then((response) => {
        this.setState({
          safetyData: response.data.data,
        });
      });
  };
  matchString = (state, value) => {
    let name = state.name;
    return name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  handleTraining = (id, status, endDate) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    axios
      .post(
        services.baseUrl +
          services.changeTrainingStatus +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        {
          id: id,
          statusId: status,
          userId: JSON.parse(sessionStorage.getItem("user"))._id,
          startDate: today,
          endDate: endDate ? today : "",
        }
      )
      .then((response) => {
        this.getUserTraining();
      });
  };
  handleLaunch = () => {
    // debugger
    this.handleTraining(this.state.trainingid, "5eaa4eada111ad0cfce91ef1");
    this.setState({ playVideo: true });
    setTimeout(() => {
      var vid = document.getElementById("myvideo");
      vid.onended = () => {
        this.handleTraining(
          this.state.trainingid,
          "5eaa4eb7a111ad0cfce91ef2",
          "endDate"
        );
        // alert("The video has ended");
      };
    }, 2000);
  };
  handleSearch = (val, e) => {
    let htmlDesc = [];
    let link = e.link;
    let trainingid = e._id;
    this.setState({ training: val, link: link, trainingid: trainingid });
    if (e.link) {
      htmlDesc.push(
        <div>
          <h1>{e.name}</h1>
          <p>
            <b>Description:</b>
            {e.description}
          </p>
          <p>
            <b>Course Duration:</b> {e.duration}
          </p>
          <a onClick={this.handleLaunch} class="request-button align-left">
            Launch Course
          </a>
          {/* <a href={e.link} target="_blank" onClick={event => { this.handleTraining(e, '5ec5fce09ad2de12381918a0') }} class="request-button align-left">Launch Course</a> */}
        </div>
      );
    }
    this.setState({
      descHtml: htmlDesc,
    });
  };
  render() {
    const items = [];
    for (let i = 0; i < this.state.safetyData.length; i++) {
      items.push(
        <tr>
          <td>{this.state.safetyData[i].training}</td>
          <td>{this.state.safetyData[i].status}</td>
          <td>{this.state.safetyData[i].startDate}</td>
          <td>{this.state.safetyData[i].endDate}</td>
        </tr>
      );
    }
    return (
      <React.Fragment>
        <div class="content-section">
          <div class="work-section job-section">
            <div class="container">
              <div class="work-section-inner">
                <h2>Safety</h2>
              </div>
            </div>
          </div>

          <div class="jobs-table safety pb-3">
            <div class="container">
              <div class="jobs-table-inner">
                <form class="example">
                  <div class="form-group">
                    <Autocomplete
                      class="form-control"
                      getItemValue={(item) => item.name}
                      items={this.state.trainingList}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
                            padding: "7px",
                          }}
                        >
                          {item.name}
                        </div>
                      )}
                      shouldItemRender={this.matchString}
                      value={this.state.training}
                      onChange={(event, value) =>
                        this.setState({ training: value })
                      }
                      onSelect={(val, e) => this.handleSearch(val, e)}
                    ></Autocomplete>
                    <button onClick={this.handleSearch}>
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                {this.state.descHtml}
                {this.state.playVideo ? (
                  <div class="backdrop">
                    <div class="videoPlay">
                      <video
                        width="940"
                        height="520"
                        id="myvideo"
                        autoPlay
                        controls
                      >
                        <source src={this.state.link} type="video/mp4" />
                        <source src={this.state.link} type="video/ogg" />
                      </video>
                      <button
                        onClick={(e) => {
                          this.setState({ playVideo: false });
                        }}
                      >
                        Close Video
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Training Name</th>
                        <th>Status</th>
                        <th>Start Date </th>
                        <th>End Date </th>
                      </tr>
                    </thead>
                    <tbody>{items}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
