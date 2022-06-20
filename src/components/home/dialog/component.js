import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { services } from "../../common/constant";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: this.props.enable,
      categoryList: [],
      shipmentTypesList: [],
      reqList: [],
      fileName: "",
      reqName: "",
      closeFromEdit: false,
      isEdit: false,
      customFiles: [],
      loading: false,
      formData: {
        categoryId: "5eaa4fb2a111ad0cfce91efe",
        requestedCompletionDate: new Date(),
        requestTypeId: "5eaa501ca111ad0cfce91f04",
        isImmediate: "",
        quantity: "",
        jobName: "",
        jobDetail: "",
        contactPerson: "",
        shipmentTypeId: "6246992c391477902c1e9640",
        shippingAddress: "",
        description: "",
        timeline: "",
        reqStatus: "",
        hardwareFilmware: "",
        // mailSent: false,
        status: "5ec8eb047ef9d51f3cc63813",
        userId: sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user"))._id
          : "",
      },
    };
  }
  closeDialog = () => {
    this.setState({
      enable: false,
      fileName: "",
      closeFromEdit: this.state.isEdit,
      isEdit: false,
      customFiles: [],
      formData: {
        requestedCompletionDate: new Date(),
        isImmediate: "",
        quantity: "",
        jobName: "",
        jobDetail: "",
        contactPerson: "",
        shipmentTypeId: "",
        shippingAddress: "",
        description: "",
        timeline: "",
        mailSent: false,
        reqStatus: "",
        hardwareFilmware: "",
        status: "5ec8eb047ef9d51f3cc63813",
        userId: sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user"))._id
          : "",
      },
    });
    this.props.closeDialog();
  };
  formattedDate = (date) => {
    return date < 10 && date.length === 1 ? 0 + date : date;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.enable !== this.props.enable) {
      this.setState({ enable: this.props.enable });
      if (
        (this.props.reqId && prevProps.reqId !== this.props.reqId) ||
        prevState.closeFromEdit
      ) {
        this.setState({ closeFromEdit: false });
        axios
          .post(
            services.baseUrl +
              services.getById +
              "?authToken=" +
              sessionStorage.getItem("authToken"),
            { _id: this.props.reqId }
          )
          .then((response) => {
            if (response.data.message === "Invalid Token") {
              sessionStorage.clear();
              return this.props.history.push("/login");
            }
            var data = response.data.data;
            var formData = { ...this.state.formData };
            for (let key in data) {
              if (key === "requestedCompletionDate") {
                formData[key] = data[key]
                  ? data[key].split("/")[2] +
                    "-" +
                    this.formattedDate(data[key].split("/")[0]) +
                    "-" +
                    this.formattedDate(data[key].split("/")[1])
                  : "";
              } else {
                formData[key] = data[key];
              }
            }
            /* formData['categoryId'] = data.categoryId
                    formData['requestTypeId'] = data.requestTypeId
                    formData['isImmediate'] = data.isImmediate
                    formData['quantity'] = data.quantity
                    formData['jobName'] = data.jobName
                    formData['contactPerson'] = data.contactPerson
                    formData['shippingAddress'] = data.shippingAddress
                    formData['hardwareFilmware'] = data.hardwareFilmware
                    formData['timeline'] = data.timeline
                    formData['description'] = data.description
                    formData['status'] = data.status
                    formData['_id'] = data._id */
            let filesName = [];
            if (data.files) {
              for (let i = 0; i < data.files.length; i++) {
                filesName.push(data.files[i].originalname);
              }
              this.setState({ fileName: filesName.join() });
            }
            let reqName = "";
            this.state.reqList.forEach((value) => {
              if (value._id === data.requestTypeId) {
                reqName = value.name;
              }
            });

            if (reqName !== "") {
              this.handleChangeReq("", data.requestTypeId, reqName, true);
            }
            this.setState({ formData, isEdit: true });
          });
      }
    }
  }
  componentDidMount() {
    axios
      .get(
        services.baseUrl +
          services.reqList +
          "?authToken=" +
          sessionStorage.getItem("authToken")
      )
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          reqList: response.data.data,
        });
        this.handleChangeReq(
          "",
          response.data.data[0]._id,
          response.data.data[0].name
        );
      })
      .then(() => {
        axios
          .get(
            services.baseUrl +
              services.shipmentTypesList +
              "?authToken=" +
              sessionStorage.getItem("authToken")
          )
          .then((response) => {
            this.setState({
              shipmentTypesList: response.data.data,
            });
          })
          .then(() => {
            console.log("shipmentTypes state", this.state.shipmentTypesList);
          });
      });
  }
  handleChangeReq = (e, id, name, isupdate = false) => {
    var formData = { ...this.state.formData };
    const valueId = e !== "" ? e.target.value : id;
    formData["requestTypeId"] = valueId;
    this.setState({ formData });

    if (!name) {
      let selectedIndex = e.currentTarget.selectedIndex;
      this.setState({
        reqName: e.currentTarget.options[selectedIndex].getAttribute("name"),
      });
    } else {
      this.setState({
        reqName: name,
      });
    }
    axios
      .post(
        services.baseUrl +
          services.categoryList +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        { _id: valueId }
      )
      .then((response) => {
        this.setState({
          categoryList: response.data.data,
        });
        this.handleChangeCatagory(
          "",
          response.data.data[0].categoryId,
          isupdate
        );
      });
    // axios.get(services.baseUrl + services.shipmentTypesList + '?authToken=' + sessionStorage.getItem('authToken'), { '_id': valueId }).then(response => {
    //   this.setState({
    //     shipmentTypesList: response.data.data
    //   })
    // this.handleChangeShipment('', response.data.data[0].id, isupdate)
    // })
  };
  handleChangeShipment = (e, id, isupdate = false) => {
    var formData = { ...this.state.formData };
    const valueId = e !== "" ? e.target.value : id;
    formData["shipmentTypeId"] = isupdate ? formData.id : valueId;
    this.setState({ formData });
    // console.log(formData)
  };

  handleChangeCatagory = (e, id, isupdate = false) => {
    var formData = { ...this.state.formData };
    const valueId = e !== "" ? e.target.value : id;
    formData["categoryId"] = isupdate ? formData.categoryId : valueId;
    this.setState({ formData });
  };
  handleisImmediate = (e) => {
    var formData = { ...this.state.formData };
    formData["isImmediate"] = e.target.value;
    this.setState({ formData });
  };
  myChangeHandler = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };
  onInputClick = (event) => {
    event.target.value = "";
  };
  myFileChangeHandler = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    const inputFile = document.getElementById("customFile");
    let fileName = [];
    const customFiles = [];
    for (let i = 0; i < inputFile.files.length; i++) {
      fileName.push(inputFile.files.item(i).name);
      customFiles.push(inputFile.files[i]);
    }
    this.setState({ customFiles, formData, fileName: fileName.join() });
  };

  isValidate = (type) => {
    let isValidate = true;
    if (type === "Draft") {
      if (
        this.state.formData.jobName === "" ||
        this.state.formData.jobName.match(
          /[~!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/
        )
      ) {
        alert(
          "Please enter Job Name and avoid use of special characters such as ~#%&*{}+/:<>?|‘”"
        );
        isValidate = false;
      }
      // put regex check to job name to not allow ~#%&*{}+/\:<>?|‘”
      else if (
        this.state.formData.jobName.match(/[~#%&*+\-\[\]{};':"\\|<>\/?]/)
      ) {
        alert(
          "Please enter valid Job Name without using special characters such as ~#%&*{}+/:<>?|‘”"
        );
        isValidate = false;
      }
      return isValidate;
    }
    if (this.state.reqName === "Consultation") {
      //  this.setState({formData:{
      //    jobName: 'Consultation'}
      //   })
      this.setState((prevState) => {
        let formData = Object.assign({}, prevState.formData); // creating copy of state variable jasper
        this.state.formData.jobName = "Consultation"; // update the name property, assign a new value
        // return { jasper };                                 // return new object jasper object
      });
      this.state.formData.jobName = "Consultation";
      return isValidate;
    } else {
      if (
        this.state.formData.jobName === "" ||
        this.state.formData.jobName.match(/[~#%&*+\-\[\]{};':"\\|<>\/?]/)
      ) {
        alert(
          "Please enter Job Name and avoid use of special characters such as ~#%&*{}+/:<>?|‘”"
        );
        isValidate = false;
      } else if (this.state.formData.contactPerson === "") {
        alert("Please enter Request Contact.");
        isValidate = false;
      }
      //  else if (this.state.formData.shippingAddress === '') {
      //     alert('Please enter Shipping Address.')
      //     isValidate = false
      // }
    }
    return isValidate;
  };
  formSubmit = (type) => {
    var bodyFormData = new FormData();
    const data = this.state.formData;
    if (this.isValidate(type)) {
      this.setState({ loading: true });
      for (let x in data) {
        if (
          x === "startDate" ||
          x === "endDate" ||
          x === "projectContact" ||
          x === "techContact"
        ) {
          continue;
        }
        if (x === "quantity" && data[x] === null) {
          bodyFormData.set(x, 0);
          continue;
        }
        bodyFormData.set(x, data[x]);
      }
      bodyFormData.set("reqStatus", type);
      console.log("bodyFormData", bodyFormData);
      var fileInst = this.state.customFiles;
      if (fileInst) {
        for (let i = 0; i < fileInst.length; i++) {
          bodyFormData.append("file", fileInst[i]);
        }
      }
      let params = this.state.isEdit
        ? services.baseUrl +
          services.updateRequest +
          "?authToken=" +
          sessionStorage.getItem("authToken") +
          "&_id=" +
          this.state.formData._id
        : services.baseUrl +
          services.createRequest +
          "?authToken=" +
          sessionStorage.getItem("authToken");
      axios({
        method: this.state.isEdit ? "put" : "post",
        url: params,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.setState({ loading: false });
          console.log("response.data", response.data);
          if (
            type === "Draft" &&
            (response.data.message === "New Request Created" ||
              response.data.message === " Request Updated Successfully ")
          ) {
            alert("New Draft created.");
          } else {
            alert(response.data.message);
          }
          //this.state.isEdit ? alert(response.data.message) : alert('New Draft created.')
          this.closeDialog();
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };
  deleteFile(i, e) {
    const stateFileNames = this.state.fileName.split(",");
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

    this.setState({ customFiles: files, fileName: fileNames.join() });
  }
  render() {
    const enable = this.state.enable;
    const isEnable = enable ? "show" : "";
    const styleEnable = enable ? "block" : "none";
    const reqListItems = [];

    if (this.state.reqList) {
      for (let i = 0; i < this.state.reqList.length; i++) {
        reqListItems.push(
          <option
            key={"req" + i}
            value={this.state.reqList[i]._id}
            name={this.state.reqList[i].name}
          >
            {this.state.reqList[i].name}
          </option>
        );
      }
    }
    const shipmentListItems = [];
    if (this.state.shipmentTypesList) {
      for (let i = 0; i < this.state.shipmentTypesList.lengt; i++) {
        shipmentListItems.push(
          <option
            key={"req" + i}
            value={this.state.shipmentTypesList[i]._id}
            name={this.state.shipmentTypesList[i].name}
          >
            {this.state.shipmentTypesList[i].name}
          </option>
        );
      }
      console.log(this.state.shipmentTypesList);
    }
    const categoryListItems = [];
    if (this.state.categoryList) {
      for (let i = 0; i < this.state.categoryList.length; i++) {
        categoryListItems.push(
          <option
            key={"cat-" + i}
            value={this.state.categoryList[i].categoryId}
          >
            {this.state.categoryList[i].categoryName}
          </option>
        );
      }
    }

    const shipmentTypeItems = [];
    if (this.state.shipmentTypesList.length > 0) {
      for (let i = 0; i < this.state.shipmentTypesList.length; i++) {
        shipmentTypeItems.push(
          <option key={"cat-" + i} value={this.state.shipmentTypesList[i]._id}>
            {this.state.shipmentTypesList[i].name}
          </option>
        );
      }
      console.log("render shpment", this.state.shipmentTypesList);
    }

    const fileNamesHtml = [];
    if (this.state.fileName) {
      const uploadedFiles = this.state.fileName.split(",");
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
    return (
      <div
        className={"modal right fade " + isEnable}
        id="myModal2"
        tabIndex="-1"
        role="dialog"
        style={{ display: styleEnable }}
        aria-labelledby="myModalLabel2"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel2">
                <i class="fa fa-file-o" aria-hidden="true"></i>
                {this.state.isEdit ? "Edit" : "Create"} a request
              </h4>
              <button
                type="button"
                class="close dialogClose"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={this.closeDialog}>
                  {" "}
                  <img src="images/ico_close.png" />
                </span>
              </button>
            </div>

            <div class="modal-body">
              <div class="form-first">
                <form class="form-horizontal form-1">
                  <div class="form-group">
                    <div class="row">
                      <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                        Request for:{" "}
                      </label>
                      <div class="col-lg-8 col-md-8 col-sm-12">
                        <select
                          class="form-control"
                          value={this.state.formData.requestTypeId}
                          onChange={this.handleChangeReq}
                        >
                          {reqListItems}
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
                <form class="form-horizontal">
                  <div class="form-group">
                    <div class="row">
                      <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                        {this.state.reqName === "Turnkey Request"
                          ? ""
                          : "Category"}{" "}
                      </label>
                      <div class="col-lg-8 col-md-8 col-sm-12">
                        {this.state.reqName === "Turnkey Request" ? (
                          ""
                        ) : (
                          <select
                            class="form-control"
                            value={this.state.formData.categoryId}
                            onChange={this.handleChangeCatagory}
                          >
                            {categoryListItems}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  {this.state.reqName === "Consultation" ? (
                    ""
                  ) : (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                          Of immediate interest to Microsoft product group?{" "}
                        </label>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                          <select
                            class="form-control"
                            value={this.state.formData.isImmediate}
                            onChange={this.handleisImmediate}
                          >
                            <option value={"NO"}>No</option>
                            <option value={"YES"}>Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.reqName === "Consultation" ? (
                    ""
                  ) : (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4 col-md-4 control-label">
                          Quantity{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <input
                            type="number"
                            min="0"
                            max="999999"
                            class="form-control"
                            name="quantity"
                            onChange={this.myChangeHandler}
                            value={this.state.formData.quantity}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.reqName === "Consultation" ? (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                          Type{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <input
                            type="text"
                            maxLength="47"
                            class="form-control"
                            name="jobName"
                            value="Consultation"
                            onChange={this.myChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                          Job Name{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <input
                            type="text"
                            class="form-control"
                            maxLength="47"
                            name="jobName"
                            value={this.state.formData.jobName}
                            onChange={this.myChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.reqName === "Consultation" ? (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                          Description{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <textarea
                            maxLength="20000"
                            class="form-control"
                            name="jobDetail"
                            value={this.state.formData.jobDetail}
                            onChange={this.myChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                          Job Description{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <textarea
                            maxLength="20000"
                            class="form-control"
                            name="jobDetail"
                            value={this.state.formData.jobDetail}
                            onChange={this.myChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.reqName === "Consultation" ? (
                    ""
                  ) : (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                          Requested Completion Date
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <input
                            type="date"
                            class="form-control"
                            placeholder="mm-dd-yyyy"
                            name="requestedCompletionDate"
                            value={this.state.formData.requestedCompletionDate}
                            onChange={this.myChangeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.reqName === "Turnkey Request" ? (
                    <div>
                      <div class="form-group">
                        <div class="row">
                          <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                            Timeline{" "}
                          </label>
                          <div class="col-sm-12 col-lg-8 col-md-8">
                            <textarea
                              class="form-control"
                              name="timeline"
                              value={this.state.formData.timeline}
                              onChange={this.myChangeHandler}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <label class="col-sm-12 col-lg-4  col-md-4 control-label">
                            Hardware, Firmware, or both?{" "}
                          </label>
                          <div class="col-sm-12 col-lg-8 col-md-8">
                            <textarea
                              class="form-control"
                              name="hardwareFilmware"
                              value={this.state.formData.hardwareFilmware}
                              onChange={this.myChangeHandler}
                            ></textarea>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  <div class="form-group">
                    <div class="row">
                      <label class="col-sm-12 col-lg-4 col-md-4 control-label">
                        Request contact email
                      </label>
                      <div class="col-sm-12 col-lg-8 col-md-8">
                        <input
                          type="email"
                          placeholder="Please put a valid email address"
                          class="form-control"
                          value={this.state.formData.contactPerson}
                          name="contactPerson"
                          onChange={this.myChangeHandler}
                        />
                      </div>
                    </div>
                  </div>

                  {this.state.reqName === "Consultation" ? (
                    ""
                  ) : (
                    <div>
                      <div class="row">
                        <label class="col-lg-4 col-md-4 col-sm-12 control-label">
                          Shipment Type:{" "}
                        </label>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                          <select
                            class="form-control"
                            value={this.state.formData.shipmentTypeId}
                            onChange={this.handleChangeShipment}
                          >
                            {shipmentTypeItems}
                          </select>
                        </div>
                      </div>
                      {/* switch case condition for shippingAddress box for different values of shipmentTypeId */}

                      {this.state.formData.shipmentTypeId ===
                      "62469917391477902c1e963f"
                        ? ""
                        : ""}
                      {this.state.formData.shipmentTypeId ===
                      "6246992c391477902c1e9640" ? (
                        <div class="form-group">
                          <div class="row">
                            <label class="col-sm-12 col-lg-4 col-md-4 control-label">
                              Shipping Address{" "}
                            </label>
                            <div class="col-sm-12 col-lg-8 col-md-8">
                              <textarea
                                type="text"
                                class="form-control"
                                maxLength="5000"
                                placeholder="5000 character limit"
                                value={this.state.formData.shippingAddress}
                                name="shippingAddress"
                                onChange={this.myChangeHandler}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.formData.shipmentTypeId ===
                      "6246995a391477902c1e9642"
                        ? ""
                        : ""}
                      {this.state.formData.shipmentTypeId ===
                      "6246996c391477902c1e9644" ? (
                        <div class="form-group">
                          <div class="row">
                            <label class="col-sm-12 col-lg-4 col-md-4 control-label">
                              Other{" "}
                            </label>
                            <div class="col-sm-12 col-lg-8 col-md-8">
                              <textarea
                                type="text"
                                maxLength="20000"
                                placeholder="20000 character limit"
                                class="form-control"
                                value={this.state.formData.shippingAddress}
                                name="shippingAddress"
                                onChange={this.myChangeHandler}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  <div class="form-group">
                    <div class="row">
                      <a
                        target="_blank"
                        href="http://go.microsoft.com/fwlink/?LinkId=518021"
                      >
                        Notice & Consent Statement
                      </a>
                      <br />
                    </div>
                  </div>
                  {this.state.reqName !== "Turnkey Request" ? (
                    <div class="form-group">
                      <div class="row">
                        <label class="col-sm-12 col-lg-4 col-md-4 control-label">
                          Design File Upload{" "}
                        </label>
                        <div class="col-sm-12 col-lg-8 col-md-8">
                          <div class="custom-file">
                            {this.state.reqName ===
                            "Mechanical Engineering Request" ? (
                              <label
                                for="customFile"
                                class="custom-file-upload"
                              >
                                {" "}
                                Choose Files!{" "}
                                <input
                                  type="file"
                                  id="customFile"
                                  multiple
                                  name="file"
                                  value={this.state.formData.fileName}
                                  onClick={this.onInputClick}
                                  onChange={this.myFileChangeHandler}
                                />
                              </label>
                            ) : (
                              <label
                                for="customFile"
                                class="custom-file-upload"
                              >
                                {" "}
                                Choose Files!{" "}
                                <input
                                  type="file"
                                  id="customFile"
                                  name="file"
                                  value={this.state.formData.fileName}
                                  onChange={this.myFileChangeHandler}
                                  multiple
                                />
                              </label>
                            )}
                            {/* <FilePond
                                                            ref={ref => (this.pond = ref)}
                                                            name="file"
                                                            files={this.state.formData.fileName}
                                                            allowReorder={true}
                                                            allowMultiple={true}
                                                            oninit={() => this.handleInit()}
                                                            oninitfile={fileItems => {
                                                                if (fileItems.length !== 0) {
                                                                    var formData = { ...this.state.formData }
                                                                    formData['file'] = fileItems.map(fileItem => fileItem.file)
                                                                    // Set currently active file objects to this.state
                                                                    this.setState({ formData });
                                                                }
                                                            }}
                                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                                        /> */}
                            <div className={"filesHTML"}>{fileNamesHtml}</div>
                            <span>
                              To upload multiple files, select multiple files
                              and click 'open'
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
                <div class="button">
                  <button
                    class="btn btn-primary submit-button"
                    onClick={(e) => {
                      this.formSubmit("Submit");
                    }}
                  >
                    SUBMIT JOB{" "}
                  </button>
                  {this.state.formData.reqStatus !== "Submit" ? (
                    <button
                      type="submit"
                      class={"btn btn-primary save save-draft"}
                      onClick={(e) => {
                        this.formSubmit("Draft");
                      }}
                    >
                      SAVE AS DRAFT
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <p>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.closeDialog}
                  >
                    Close
                  </button>{" "}
                  | &nbsp; Questions?{" "}
                  <a href="mailto:hardlabsupport@microsoft.com"> Contact Us </a>
                </p>
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
      </div>
    );
  }
}
