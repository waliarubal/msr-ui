import React from "react";
import axios from "axios";
import { FilePond } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { services } from "../common/constant";
import { Link } from "react-router-dom";

export default class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserData: {},
      loading: false,
      jobData: "",
      userList: [],
      isEdit: false,
      isButtonDisabled: false,
      // crmStatusUpdate : '',
      addToCrmInfo: "Add To CRM",
      spinnerClass: "",
      fileNames: "",
      adminusers: {},
      reqList: {},
      shipmentTypesList: {},
      customFiles: [],
      formData: {
        _id: "",
        categoryId: "",
        CRM_history: "",
        crm_id: "",
        requestTypeId: "",
        isImmediate: "",
        quantity: "",
        jobName: "",
        contactPerson: "",
        shipmentTypeId: "",
        shippingAddress: "",
        userId: "",
        timeline: "",
        hardwareFilmware: "",
        requestedCompletionDate: "",
        jobDetail: "",
        userId: sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user"))._id
          : "",
      },
    };
    this.addToCRM = this.addToCRM.bind(this);
  }
  sameFileCount = 0;
  formattedDate = (date) => {
    return date < 10 && date.length === 1 ? 0 + date : date;
  };
  componentDidMount() {
    this.setState({ loading: true });
    let current_user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ currentUserData: current_user });

    axios
      .get(
        services.baseUrl +
          services.getUsersList +
          "?authToken=" +
          sessionStorage.getItem("authToken")
      )
      .then((response) => {
        let userList = {};
        let adminusers = {};
        response.data.data.forEach((elem) => {
          userList[elem._id] = elem.firstname + " " + elem.lastname;
          if (elem.role !== "5eba3be3c4cf091fbc7d4307") {
            adminusers[elem._id] = elem.firstname + " " + elem.lastname;
          }
        });
        // console.log("This is the userList" + userList)
        this.setState({ userList: userList, adminusers });
        axios
          .get(
            services.baseUrl +
              services.shipmentTypesList +
              "?authToken=" +
              sessionStorage.getItem("authToken")
          )
          .then((response) => {
            let shipmentTypesList = {};
            response.data.data.forEach((elem) => {
              shipmentTypesList[elem._id] = elem.name;
            });
            this.setState({
              shipmentTypesList: shipmentTypesList,
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
            axios
              .post(
                services.baseUrl +
                  services.getById +
                  "?authToken=" +
                  sessionStorage.getItem("authToken"),
                { _id: this.props.match.params.id }
              )
              .then((response) => {
                var data = response.data.data;
                console.log(data);
                var formData = { ...this.state.formData };
                formData["_id"] = data._id;
                formData["crm_id"] = data.crm_id;
                formData["CRM_history"] = data.CRM_history;
                formData["Notes"] = data.Notes;
                formData["categoryId"] = data.categoryId;
                formData["requestTypeId"] = data.requestTypeId;
                formData["contactPerson"] = data.contactPerson;
                formData["timeline"] = data.timeline;
                formData["hardwareFilmware"] = data.hardwareFilmware;
                formData["isActive"] = data.isActive;
                formData["createdAt"] = data.createdAt;
                formData["startDate"] = data.startDate
                  ? data.startDate.split("/")[2] +
                    "-" +
                    this.formattedDate(data.startDate.split("/")[0]) +
                    "-" +
                    this.formattedDate(data.startDate.split("/")[1])
                  : "";
                formData["expectedCompletionDate"] = data.expectedCompletionDate
                  ? data.expectedCompletionDate.split("/")[2] +
                    "-" +
                    this.formattedDate(
                      data.expectedCompletionDate.split("/")[0]
                    ) +
                    "-" +
                    this.formattedDate(
                      data.expectedCompletionDate.split("/")[1]
                    )
                  : "";
                formData["status"] = data.status;
                formData["projectContact"] = data.projectContact;
                formData["techContact"] = data.techContact;
                formData["files"] = data.files;
                formData["history"] = data.history;
                formData["jobName"] = data.jobName;
                formData["quantity"] = data.quantity;
                formData["shipmentTypeId"] = data.shipmentTypeId;
                formData["shippingAddress"] = data.shippingAddress;
                formData["userId"] = data.userId;
                formData["jobDetail"] = data.jobDetail;
                formData[
                  "requestedCompletionDate"
                ] = data.requestedCompletionDate
                  ? data.requestedCompletionDate.split("/")[2] +
                    "-" +
                    this.formattedDate(
                      data.requestedCompletionDate.split("/")[0]
                    ) +
                    "-" +
                    this.formattedDate(
                      data.requestedCompletionDate.split("/")[1]
                    )
                  : "";
                this.setState({
                  formData,
                  isEdit: sessionStorage.getItem("role") !== "User",
                });
                axios
                  .get(
                    services.baseUrl +
                      services.reqList +
                      "?authToken=" +
                      sessionStorage.getItem("authToken")
                  )
                  .then((response) => {
                    let reqList = {};
                    response.data.data.forEach((elem) => {
                      reqList[elem._id] = elem.name;
                    });
                    this.setState({ reqList, loading: false });
                  });
              });
          });
      });
  }
  myChangeHandler = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    const inputFile = document.getElementById("customFile");
    let fileNames = [];
    const customFiles = [];
    for (let i = 0; i < inputFile.files.length; i++) {
      fileNames.push(inputFile.files.item(i).name);

      customFiles.push(inputFile.files[i]);
    }
    this.setState({ customFiles, formData, fileNames: fileNames.join() });
    const files = [];
    if (this.state.formData.files) {
      for (let i = 0; i < this.state.formData.files.length; i++) {
        files.push(this.state.formData.files[i].originalname);
      }
    }
    for (let i = 0; i < files.length; i++) {
      for (let j = 0; j < fileNames.length; j++) {
        if (fileNames[j] === files[i]) {
          this.sameFileCount++;
        }
      }
    }
  };
  handleChange = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    console.log("event.target.name", event.target.name);
    console.log("event.target.value", event.target.value);
    this.setState({ formData });
  };
  toDataURL = (url, fileName) => {
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blobbedResponse = window.URL.createObjectURL(
        new Blob([response.data])
      );
      console.log("blobbedResponse");
      console.log(blobbedResponse);
      const link = document.createElement("a");
      link.href = blobbedResponse;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  // write a function to fetch blob data from mongodb via mongoose

  formSubmit = () => {
    var bodyFormData = new FormData();
    const data = this.state.formData;
    console.log("formdata", data);
    for (let x in data) {
      if ((!data[x] && data[x] === undefined) || data[x] === "undefined") {
        continue;
      }
      if (data[x] === null && (x === "projectContact" || x === "techContact")) {
        continue;
      }
      bodyFormData.set(x, data[x]);
    }
    bodyFormData.set("reqStatus", "Submit");
    bodyFormData.set("_id", this.props.match.params.id);
    var fileInst = this.state.customFiles;
    if (fileInst) {
      for (let i = 0; i < fileInst.length; i++) {
        bodyFormData.append("file", fileInst[i]);
      }
    }
    if (this.sameFileCount > 0) {
      if (window.confirm("Do you want to replace these files?")) {
        let params =
          services.baseUrl +
          services.updateRequest +
          "?authToken=" +
          sessionStorage.getItem("authToken") +
          "&_id=" +
          this.props.match.params.id;
        axios({
          method: "put",
          url: params,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            alert(response.data.message);
            window.location.reload(false);
          })
          .catch(function(response) {
            //handle error
            // console.log(response);
          });
      } else {
        alert("Change the files");
      }
    } else {
      let params =
        services.baseUrl +
        services.updateRequest +
        "?authToken=" +
        sessionStorage.getItem("authToken") +
        "&_id=" +
        this.props.match.params.id;
      axios({
        method: "put",
        url: params,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          alert(response.data.message);
          window.location.reload(false);
        })
        .catch(function(response) {
          //handle error
          // console.log(response);
        });
    }
  };
  deleteFile(i, e) {
    const stateFileNames = this.state.fileNames.split(",");
    const fileNames = [];
    const stateFile = this.state.customFiles;
    const files = [];
    // e.currentTarget.parentElement.remove()
    for (var j = 0; j <= stateFileNames.length; j++) {
      if (j !== i) {
        fileNames.push(stateFileNames[j]);
        files.push(stateFile[j]);
      }
    }
    this.sameFileCount--;
    this.setState({ customFiles: files, fileNames: fileNames.join() });
  }
  addToCRM = () => {
    // let NODE_MIDDLEMAN_FOR_CRM = services.baseUrl + services.addToCrm + '?authToken=' + sessionStorage.getItem('authToken')
    // console.log(`for m dataaa isss ${JSON.stringify(this.state.formData._id)}`)
    this.setState({
      isButtonDisabled: true,
      addToCrmInfo: "|",
      spinnerClass: "spinner-border",
      // crmStatusUpdate:'Please wait while we send the request data to CRM'
      // w
    });

    axios
      .post(
        services.baseUrl +
          services.addToCrm +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        {
          req_id: this.state.formData._id,
          //   "crm_id": "",
          // "request_for": this.state.category,
          // "category": "3D Print",
          // "job_name": this.state.jobName,
          // "job_desciption": this.state.jobDetail,
          // "requested_completion_date": this.state.requestedCompletionDate,
          // "expected_completion_date": this.state.endDate,
          // "status": this.state.status,

          //   "firstname": this.state.projectContact,
          //   "email": this.state.email
        }
      )
      .then((res) => {
        setTimeout(() => {
          this.setState({
            isButtonDisabled: false,
            spinnerClass: "",
            addToCrmInfo: "Add To CRM",
          });
        }, 3000);
        console.log(res.data);
        if (res.success) {
          console.log(res.data);
          window.location.reload();
          // console.log(res.data)
          // this.setState({ formData[crm_id] : res.data.crm_id})
        }
        window.location.reload();
      });
  };
  render() {
    let statusHtml = [];
    if (this.state.status) {
      for (let key in this.state.status) {
        statusHtml.push(<option value={key}>{this.state.status[key]}</option>);
      }
    }
    let shipmentTypesListHtml = [];
    if (this.state.shipmentTypesList) {
      for (let key in this.state.shipmentTypesList) {
        shipmentTypesListHtml.push(
          <option value={key}>{this.state.shipmentTypesList[key]}</option>
        );
      }
    }
    let projectContact = [];
    let techContact = [];

    if (this.state.adminusers) {
      projectContact.push(<option value="-1"></option>);
      techContact.push(<option value="-1">Owner</option>);
      for (var key in this.state.adminusers) {
        projectContact.push(
          <option value={key}>{this.state.adminusers[key]}</option>
        );
        techContact.push(
          <option value={key}>{this.state.adminusers[key]}</option>
        );
      }
    }
    const files = [];
    if (this.state.formData.files) {
      for (let i = 0; i < this.state.formData.files.length; i++) {
        files.push(
          <li>
            {this.state.formData.files[i].originalname}
            <a
              onClick={() => {
                this.toDataURL(
                  (
                    services.baseUrl +
                    "/" +
                    this.state.formData.files[i].path
                  ).replace("\\/g", "/"),
                  this.state.formData.files[i].filename
                );
                console.log("file name : ");
                let fileNameTest = (
                  services.baseUrl +
                  "/" +
                  this.state.formData.files[i].path
                ).replace("\\/g", "/");
                console.log(fileNameTest);
              }}
              className="download-file"
            >
              {" "}
              <i
                class="fa fa-download"
                title={this.state.formData.files[i].filename}
              ></i>{" "}
            </a>
          </li>
        );
      }
    }
    // //write a function to upload files to an api endpoint and get the response
    // function handleFileUpload(e) {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     const files = e.target.files
    //     // console.log(files)
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append('files', files[i])
    //     }
    //     axios.post(services.baseUrl + services.uploadFile + '?authToken=' + sessionStorage.getItem('authToken'), formData)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(function (response) {
    //             //handle error
    //             console
    const fileNamesHtml = [];
    if (this.state.fileNames) {
      const uploadedFiles = this.state.fileNames.split(",");
      for (let i = 0; i < uploadedFiles.length; i++) {
        if (uploadedFiles[i] !== "") {
          fileNamesHtml.push(
            <React.Fragment>
              <div>
                {uploadedFiles[i]}
                <img
                  src="images/ico_close.png"
                  onClick={(e) => this.deleteFile(i, e)}
                />
              </div>
            </React.Fragment>
          );
        }
      }
    }

    let CRM_history = [];
    let crm_hisData = this.state.formData.CRM_history;
    if (crm_hisData) {
      crm_hisData.forEach((elem) => {
        let allKeys = [];
        let allValues = [];
        // let allNotes = []
        for (const key in elem) {
          // console.log("I'm displaying elem key: " + key + "elem value:" + elem[key])
          let elemVal = elem[key];
          if (
            key !== "CategoryId" &&
            key !== "Modified At" &&
            elemVal !== "" && elemVal !== null
          ) {
            elemVal =
              key === "Status"
                ? this.state.status[elemVal]
                : key === "Project Contact" ||
                  key === "Tech Contact" ||
                  key === "UserId"
                ? this.state.userList[elemVal]
                : key === "RequestTypeId"
                ? this.state.reqList[elemVal]
                : elemVal;
            if (key === "files") {
              let fileName = [];
              elemVal.forEach((elem) => {
                fileName.push(elem.originalname);
              });
              elemVal = fileName.join();
            }
            if (key === "Shipment Type") {
              let shipTypeName = this.state.shipmentTypesList[elemVal];
              console.log("shipTypeName", shipTypeName);
              elemVal = shipTypeName;
            }

            if (key === "Notes") {
              let Notes = [];

              //  elemVal = JSON.stringify(elem['Notes'])
              elem["Notes"].forEach((elem) => {
                Notes.push(elem.Text);
                // Notes.push('Text: '+ elem.Text)
              });
              elemVal = Notes.join();
            }
            allKeys.push(
              <p>
                <b>{key}</b>
              </p>
            );
            allValues.push(<p>{elemVal}</p>);
          }
        }
        CRM_history.push(
          <tr>
            <td>{elem["Modified At"]}</td>
            <td>{allKeys}</td>
            <td>{allValues}</td>
          </tr>
        );
        CRM_history.reverse();
      });
    }
    // function findShipmentTypeName(elem){
    //   return elem._id =
    // }

    let history = [];
    let hisData = this.state.formData.history;
    if (hisData) {
      hisData.forEach((elem) => {
        let allKeys = [];
        let allValues = [];
        for (const key in elem) {
          console.log("I'm displaying elem key" + key + elem[key]);
          let elemVal = elem[key];
          if (
            key !== "CategoryId" &&
            key !== "Modified At" &&
            elemVal !== "" && elemVal !== null
          ) {
            elemVal =
              key === "Status"
                ? this.state.status[elemVal]
                : key === "Project Contact" ||
                  key === "Tech Contact" ||
                  key === "UserId"
                ? this.state.userList[elemVal]
                : key === "RequestTypeId"
                ? this.state.reqList[elemVal]
                : elemVal;
            // || key === 'Shipment Type' ? this.state.shipmentTypesList[elemVal] : elemVal
            if (key === "Shipment Type") {
              let shipTypeName = this.state.shipmentTypesList[elemVal];
              console.log("shipTypeName", shipTypeName);
              elemVal = shipTypeName;
            }

            if (key === "files") {
              let fileName = [];
              elemVal.forEach((elem) => {
                fileName.push(elem.originalname);
              });
              elemVal = fileName.join();
            }
            allKeys.push(
              <p>
                <b>{key}</b>
              </p>
            );
            allValues.push(<p>{elemVal}</p>);
          }
        }
        history.push(
          <tr>
            <td>{elem["Modified At"]}</td>
            <td>{allKeys}</td>
            <td>{allValues}</td>
          </tr>
        );
        history.reverse();
      });
    }

    let messageIfNotAnApprover;
    if (this.state.currentUserData.approverLevel === "") {
      messageIfNotAnApprover = (
        <span
          style={{
            color: "gray",
            padding: "0px 10px 0px 10px",
            margin: "",
            fontSize: "0.8em",
          }}
        >
          Note: Only the approvers can assign the project contact.
        </span>
      );
    } else {
      messageIfNotAnApprover = (
        <span
          style={{
            color: "gray",
            padding: "0px 10px 0px 10px",
            margin: "",
            fontSize: "0.8em",
          }}
        >
          You are an approver. Please assign a Project Contact.
        </span>
      );
    }
    let messageForTechnicalContact = (
      <span
        style={{
          color: "gray",
          padding: "0px 10px 0px 10px",
          margin: "",
          fontSize: "0.8em",
        }}
      >
        By default the technical contact is the owner.{" "}
      </span>
    );
    // let messageForAddToCRM = <span style={{ color: "gray", padding: "0px 10px 0px 10px", margin: "", fontSize: "0.8em" }}>
    //   Please select a project contact from the dropdown below.</span>

    return (
      <React.Fragment>
        <div class="content-section">
          <div class="work-section job-section">
            <div class="container">
              <div class="work-section-inner">
                <h2>Services </h2>
              </div>
            </div>
          </div>
          <div class="jobs-table">
            <div class="container">
              <div class="jobs-table-inner">
                <span class="back-class">
                  {" "}
                  <Link to="/reqList"> Back </Link>
                </span>
                <h1>{this.state.formData.jobName} </h1>
                <div class="table-responsive">
                  <table class="table table-striped job-table ">
                    <thead>
                      <tr>
                        <th>Request Parameters </th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {/* This is commented by Jithin as requested by backend */}
                    <tbody>
                      <tr>
                        <td>Job Name</td>
                        <td>{this.state.formData.jobName}</td>
                      </tr>
                      <tr>
                        <td>Request Created By:</td>
                        <td>
                          {this.state.userList[this.state.formData.userId]}
                        </td>
                      </tr>
                      {this.state.currentUserData.role !==
                      "5eba3be3c4cf091fbc7d4307" ? (
                        <tr>
                          <td>CRM Case Number</td>
                          <div>
                            <td style={{ border: "0px" }}>
                              <div>
                                {this.state.formData.crm_id === "" ? (
                                  <div>
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      Case is not added to CRM Yet &emsp;
                                    </span>
                                    <button
                                      disabled={this.state.isButtonDisabled}
                                      onClick={this.addToCRM}
                                      type="submit"
                                      className={
                                        " btn btn-primary save " +
                                        this.state.spinnerClass
                                      }
                                    >
                                      {this.state.addToCrmInfo}
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <span style={{ color: "green" }}>
                                      {this.state.formData.crm_id}
                                    </span>
                                    <br></br>
                                    <button
                                      disabled={this.state.isButtonDisabled}
                                      onClick={this.addToCRM}
                                      type="submit"
                                      className={
                                        " btn btn-primary save " +
                                        this.state.spinnerClass
                                      }
                                    >
                                      Update Data in CRM
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </div>
                        </tr>
                      ) : (
                        ""
                      )}
                      <tr>
                        <td>Date Submitted </td>
                        <td>{this.state.formData.createdAt}</td>
                      </tr>
                      <tr>
                        <td>Quantity:</td>
                        <td>
                          <input
                            type="number"
                            disabled={!this.state.isEdit}
                            class="form-control"
                            name="quantity"
                            onChange={this.myChangeHandler}
                            value={this.state.formData.quantity}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Start Date </td>
                        <td>
                          <input
                            type="date"
                            disabled={!this.state.isEdit}
                            class="form-control"
                            name="startDate"
                            value={this.state.formData.startDate}
                            onChange={this.myChangeHandler}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Expected Completion Date:</td>
                        <td>
                          <input
                            type="date"
                            class="form-control"
                            disabled={!this.state.isEdit}
                            name="expectedCompletionDate"
                            value={this.state.formData.expectedCompletionDate}
                            onChange={this.myChangeHandler}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Requested Completion Date:</td>
                        <td>
                          <input
                            type="date"
                            class="form-control"
                            disabled={!this.state.isEdit}
                            name="requestedCompletionDate"
                            value={this.state.formData.requestedCompletionDate}
                            onChange={this.myChangeHandler}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Task Description:</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            disabled={!this.state.isEdit}
                            name="jobDetail"
                            onChange={this.myChangeHandler}
                            value={this.state.formData.jobDetail}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Status:</td>
                        <td>
                          <select
                            value={this.state.formData.status}
                            disabled={!this.state.isEdit}
                            name="status"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          >
                            {statusHtml}
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td>HW Lab Project Contact:</td>
                        <td>
                          <select
                            value={this.state.formData.projectContact}
                            disabled={
                              this.state.currentUserData.role ===
                              "5eba3be3c4cf091fbc7d4307"
                                ? true
                                : false
                            }
                            name="projectContact"
                            onChange={(e) => {
                              this.handleChange(e);
                              console.log(this.state.currentUserData.role);
                            }}
                          >
                            {projectContact}
                          </select>
                        </td>
                      </tr>
                      {messageIfNotAnApprover}
                      {/* <span></span> */}
                      <tr>
                        <td>HW Lab Technical Contact: </td>
                        <td>
                          <select
                            value={this.state.formData.techContact}
                            name="techContact"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          >
                            {techContact}
                          </select>
                        </td>
                      </tr>
                      {messageForTechnicalContact}
                      <tr>
                        <td>Shipment Method</td>
                        <td>
                          <select
                            value={this.state.formData.shipmentTypeId}
                            name="shipmentTypeId"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          >
                            {shipmentTypesListHtml}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Address to ship:</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            disabled={false}
                            name="shippingAddress"
                            onChange={this.myChangeHandler}
                            value={this.state.formData.shippingAddress}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h4>Project Files </h4>
                <div class="table-responsive">
                  <ul class="fileslisting">{files}</ul>
                  <label for="customFile" class="custom-file-upload">
                    {" "}
                    Add files{" "}
                    <input
                      type="file"
                      id="customFile"
                      multiple
                      name="file"
                      onChange={this.myChangeHandler}
                    />
                  </label>
                  <div className={"filesHTML"}>
                    {fileNamesHtml} <br />
                  </div>
                  <br />
                  <div class="button text-center">
                    <br />
                    <button
                      class="btn btn-primary submit-button"
                      onClick={(e) => {
                        this.formSubmit();
                      }}
                      align="center"
                    >
                      SAVE JOB DETAIL
                    </button>
                  </div>
                </div>

                <h4>Job History (Updated via CRM) </h4>

                <div class="table-responsive">
                  <table class="table table-striped table-2">
                    <thead>
                      <tr>
                        {/* {console.log("I'm displaying history" + history)} */}
                        <th>Rev Date </th>
                        <th>Change Description </th>
                        <th>Value </th>
                      </tr>
                    </thead>
                    <tbody>{CRM_history}</tbody>
                  </table>
                </div>
                <div>
                  <h4>Job History (Updated via MSR) </h4>
                  <h4>(In order from most recent to oldest)</h4>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-2">
                    <thead>
                      <tr>
                        {/* {console.log("I'm displaying history" + history)} */}
                        <th>Rev Date </th>
                        <th>Change Description </th>
                        <th>Value </th>
                      </tr>
                    </thead>
                    <tbody>{history}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sk-cube-grid"
          style={{ display: this.state.loading ? "block" : "none" }}
        >
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
      </React.Fragment>
    );
  }
}
