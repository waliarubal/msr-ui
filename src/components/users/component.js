import React from "react";
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
import "./style.css";
import axios from "axios";
import { services } from "../common/constant";
import { Redirect } from "react-router-dom";
import { elementAt } from "rxjs/operators";
import { assign } from "lodash";

export default class Signup extends React.Component {
  static propTypes = {
    signupReq: PropTypes.func.isRequired,
    getNewUser: PropTypes.object,
    resetSignup: PropTypes.func,
    fetchProgress: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.original_approvers = { app_i: "", app_ii: "", app_iii: "" };
    this.approver_i = "";
    this.approver_ii = "";
    this.approver_iii = "";
    // this.saveErrorMessage = 'adsax'
    this.state = {
      approver_value: "John Romualdez",
      saveErrorMessageState: "",
      saveButtonText: "SAVE",
      formData: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        otherRole: "",
        approverLevel: "",
        email: "",
        phone: "",
        role: "",
        isProjectContact: "true",
        isTechContact: "true",
      },
      is_SaveButtonDisabled: false,

      approversOfAllLevels: [],
      approvers_object: { level1: "", level2: "awwd", level3: "" },
      roles: [],
      users: [],
      level_i_approver: "",
      level_i_original_approver: "",
      level_ii_approver: "",
      level_iii_approver: "",
      level_i_approver_test: "",
    };
    this.handleApproverChange_all = this.handleApproverChange_all.bind(this);
  }
  signupuser = (e) => {
    this.props.signupReq(this.state.formData);
  };
  myChangeHandler = (event) => {
    var formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getNewUser && this.props.getNewUser !== "") {
      this.props.resetSignup();
      alert(this.props.getNewUser);
      this.props.history.push("/login");
    }
    //  if() this.setState({ level_i_original_approver: document.getElementById("approver_i_select").options[0].value})

    // console.log(`state did update ${prevState.level_i_original_approver}`)
  }
  componentDidMount() {
    let roles;
    let users;
    axios
      .get(
        services.baseUrl +
          services.roles +
          "?authToken=" +
          sessionStorage.getItem("authToken")
      )
      .then((response) => {
        roles = response.data.data;
        axios
          .get(
            services.baseUrl +
              services.getUsersList +
              "?authToken=" +
              sessionStorage.getItem("authToken")
          )
          .then((usersRes) => {
            if (usersRes.data.data) {
              users = usersRes.data.data;
              this.setState({ roles: roles, users: users });
              // console.log(users)
            }
          });
      });
    // var app_i = React.findDOMNode(this.refs.cpDev1).value;

    // this.setState({ level_i_original_approver: document.getElementById("approver_i_select").options[0].value})

    console.log(`app i is ${this.state.level_i_original_approver}`);
    // for(let i=0; i <this.state.users.length; i++){
    //   if(this.state.users[i].otherRole === 'FTE'){
    //     this.approver_level_i.push(this.state.users[i].firstname)
    //   }
    // }
    // this.approversOfAllLevels.push()
  }
  // handleChange = (event) => {
  //     var formData = { ...this.state.formData }
  //     formData['role'] = event.target.value
  //     this.setState({ formData });
  // }

  handleChange(event, level) {
    // let levelToUpdate = level
    console.log(
      `STATE value in app object : ${this.state.approvers_object.level2}`
    );
    this.setState({
      ...this.state.approvers_object,
      [level]: event.target.value,
    });
  }
  handleApproverChange_all() {
    let app_i = this.approver_i;
    let app_ii = this.approver_ii;
    let app_iii = this.approver_iii;

    console.log(
      `THE APProvers TO CHANGE are  ${app_i} and ${app_ii} and ${app_iii}`
    );

    if (app_i || app_ii || app_iii) {
      if (app_i === app_ii || app_i === app_iii || app_ii === app_iii) {
        this.setState({
          saveErrorMessageState: "Two approvers can't be the same",
          saveButtonText: "FAILED",
        });
        setTimeout(() => {
          this.setState({ saveErrorMessageState: "", saveButtonText: "SAVE" });
        }, 2000);
      } else {
        if (
          window.confirm(
            `You are about to assign ${app_i} as the First Approver. ${app_ii} as the Second Approver, and ${app_iii} as the Third Approver. Proceed?`
          )
        ) {
          console.log("changed all");
          let new_approvers = {};
          if (app_i !== this.original_approvers.app_i) {
            let user_index = this.state.users.findIndex(
              (o) => o.firstname === app_i
            );
            let app_i_id = this.state.users[user_index]._id;

            let user_index_to_pop = this.state.users.findIndex(
              (o) => o.firstname === this.original_approvers.app_i
            );
            if (user_index_to_pop !== -1) {
              let app_i_id_remove = this.state.users[user_index_to_pop]._id;
              new_approvers["app_i_remove"] = {
                _id: app_i_id_remove,
                approverLevel: "",
              };
            }

            new_approvers["app_i"] = { _id: app_i_id, approverLevel: "level1" };
          }

          if (app_ii !== this.original_approvers.app_ii) {
            let user_index = this.state.users.findIndex(
              (o) => o.firstname === app_ii
            );
            let app_ii_id = this.state.users[user_index]._id;

            let user_index_to_pop = this.state.users.findIndex(
              (o) => o.firstname === this.original_approvers.app_ii
            );
            // console.log(`user_index_to_pop ${user_index_to_pop}`)
            if (user_index_to_pop !== -1) {
              let app_ii_id_remove = this.state.users[user_index_to_pop]._id;
              new_approvers["app_ii_remove"] = {
                _id: app_ii_id_remove,
                approverLevel: "",
              };
            }

            new_approvers["app_ii"] = {
              _id: app_ii_id,
              approverLevel: "level2",
            };
          }

          if (app_iii !== this.original_approvers.app_iii) {
            let user_index = this.state.users.findIndex(
              (o) => o.firstname === app_iii
            );
            let app_iii_id = this.state.users[user_index]._id;

            let user_index_to_pop = this.state.users.findIndex(
              (o) => o.firstname === this.original_approvers.app_iii
            );

            if (user_index_to_pop !== -1) {
              let app_iii_id_remove = this.state.users[user_index_to_pop]._id;
              new_approvers["app_iii_remove"] = {
                _id: app_iii_id_remove,
                approverLevel: "",
              };
            }
            new_approvers["app_iii"] = {
              _id: app_iii_id,
              approverLevel: "level3",
            };
          }
          console.log(JSON.stringify(new_approvers));
          axios
            .post(
              services.baseUrl +
                services.changeApprover +
                "?authToken=" +
                sessionStorage.getItem("authToken"),
              new_approvers
            )
            .then((res) => {
              if (res.data) {
                // refresh page
                alert(JSON.stringify(res.data.message));
                this.setState({ saveButtonText: "DONE" });
                setTimeout(() => {
                  this.setState({ saveButtonText: "SAVE" });
                }, 1500);
              }
            });
        } else {
          window.alert("Approver change cancelled");
        }
      }
    }
  }

  changeUser = (e, elem) => {
    axios
      .post(
        services.baseUrl +
          services.changeUser +
          "?authToken=" +
          sessionStorage.getItem("authToken"),
        { _id: elem._id, role: elem.role }
      )
      .then((response) => {
        if (response.data) {
          alert(JSON.stringify(response.data.message));
        }
      });
  }; //test
  // changeOtherRole = (e, elem) => {
  //   axios.post(services.baseUrl + services.changeUser + '?authToken=' +
  //   sessionStorage.getItem('authToken'),
  //   { '_id': elem._id, otherRole: elem.otherRole }).then(response => {
  //     if (response.data) {
  //       alert(JSON.stringify(response.data.message));
  //     }
  //   })
  // }
  // getFTEUsers(){
  //    axios.get(services.baseUrl+services.getFTEUsers + '?authToken=' + sessionStorage.getItem('authToken')
  //    ).then(response => {
  //      console.log(response.data.data)
  //    })
  // }
  // changeApproversList = (e, elem) => {
  //   let changedApprovers = {
  //     'approver_i': elem.approver_i, 'approver_ii': elem.approver_ii,
  //     'approver_iii': elem.approver_iii
  //   }
  //   axios.post(services.baseUrl + services.updateApproversList + '?authToken=' +
  //     sessionStorage.getItem('authToken'), { changedApprovers })
  // }
  updateFirstApprover = (e) => {
    let user_index = this.state.users.findIndex(
      (o) => o.firstname === this.state.approver_value
    );
    let local_id;

    console.log(this.state.users);
    console.log(user_index);
    console.log(this.state.approver_value);
    if (this.state.users[user_index]) {
      if (this.state.users[user_index].otherRole !== "FTE") {
        alert(
          "Can not make this person an approver because he does not have the role of FTE"
        );
      } else {
        console.log("posting!");
        local_id = this.state.users[user_index]._id;
        console.log(`local id is ${local_id}`);
        // console.log(`_id of the user is ${local_id}`)
        axios
          .post(
            services.baseUrl +
              services.changeApprover +
              "?authToken=" +
              sessionStorage.getItem("authToken"),
            { _id: local_id, approverLevel: "level1" }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("no such user exists");
    }
  };

  approverLevel_i_Changed(e) {
    //  alert(`approver 1 is ${this.approver_i}`)
    if (e.target) {
      // console.log(`approvers : ${e}`)

      let valE = e.target.value;
      this.setState(function(prevState) {
        // console.log(`prevState is ${JSON.stringify(prevState.level_i_approver)}`)
        console.log(`original approver set as : ${this.approver_i}`);

        if (
          valE === this.approver_i ||
          valE === this.approver_ii ||
          valE === this.approver_iii
        ) {
          console.log(`val is again equal`);
          this.setState({
            is_i_SaveButtonDisabled: true,
            level_i_approver: valE,
          });
        } else if (
          valE !== this.approver_i &&
          valE !== this.approver_ii &&
          valE !== this.approver_iii
        ) {
          this.setState({
            is_i_SaveButtonDisabled: false,
            level_i_approver: valE,
          });
          // this.state.level_i_approver =
          console.log(`approver_ i in state is ${this.state.level_i_approver}`);
        } else if (valE === "--NO ONE IS ASSIGNED AS AN APPROVER YET--") {
          this.setState({
            is_i_SaveButtonDisabled: false,
            level_i_approver: valE,
          });
        } else if (valE === "REMOVE APPROVER") {
          this.setState({
            is_i_SaveButtonDisabled: false,
            level_i_approver: "REMOVE APPROVER",
          });
        }

        return {
          level_i_approver: valE,
        };
      });
    } else {
      // this.setState({level_i_approver: String(e)})
    }
  }
  approverLevel_ii_Changed(e) {
    if (e.target) {
      // console.log(`approvers : ${e}`)

      let valE = e.target.value;
      this.setState(function(prevState) {
        // console.log(`prevState is ${JSON.stringify(prevState.level_i_approver)}`)
        console.log(`original approver set as : ${this.approver_ii}`);

        if (
          valE === this.approver_i ||
          valE === this.approver_ii ||
          valE === this.approver_iii
        ) {
          console.log(`val is again equale`);
          this.setState({
            is_ii_SaveButtonDisabled: true,
            level_ii_approver: valE,
          });
        } else if (
          valE !== this.approver_i &&
          valE !== this.approver_ii &&
          valE !== this.approver_iii
        ) {
          this.setState({
            is_ii_SaveButtonDisabled: false,
            level_ii_approver: valE,
          });
          console.log(``);
        } else if (valE === "--NO ONE IS ASSIGNED AS AN APPROVER YET--") {
          this.setState({
            is_ii_SaveButtonDisabled: false,
            level_ii_approver: valE,
          });
        }

        return {
          level_ii_approver: valE,
        };
      });
    } else {
      // this.setState({level_i_approver: String(e)})
    }
  }
  approverLevel_iii_Changed(e) {
    if (e.target) {
      // console.log(`approvers : ${e}`)

      let valE = e.target.value;
      this.setState(function(prevState) {
        // console.log(`prevState is ${JSON.stringify(prevState.level_i_approver)}`)
        console.log(`original approver set as : ${this.approver_i}`);

        if (
          valE === this.approver_i ||
          valE === this.approver_ii ||
          valE === this.approver_iii
        ) {
          console.log(`val is again equale`);

          this.setState({
            is_iii_SaveButtonDisabled: true,
            level_iii_approver: valE,
          });
        } else if (
          valE !== this.approver_i &&
          valE !== this.approver_ii &&
          valE !== this.approver_iii
        ) {
          this.setState({
            is_iii_SaveButtonDisabled: false,
            level_iii_approver: valE,
          });
          console.log(``);
        } else if (valE === "--NO ONE IS ASSIGNED AS AN APPROVER YET--") {
          this.setState({
            is_iii_SaveButtonDisabled: false,
            level_iii_approver: valE,
          });
        } else if (valE === "REMOVE APPROVER") {
          this.setState({
            is_iii_SaveButtonDisabled: false,
            level_iii_approver: "REMOVE APPROVER",
          });
          // this.state.level_iii_approver = 'REMOVE APPROVER'
        }

        return {
          level_iii_approver: valE,
        };
      });
    } else {
      // this.setState({level_i_approver: String(e)})
    }
  }
  getUserOtherRole(event) {}
  htmlForRole = function(X) {
    return <option>{X}</option>;
  };

  render() {
    // const HWLAB_FTE = ["John Romualdez", "Teresa LaScala", "Lex Story", "Becky Gagnon"]
    // const HWLAB_STAFF = ["Todd Jurgenson", "Michael Fassbind", "Cheuk Kwan Li", "Sokunthea Neang"]
    // const { fetchProgress } = this.props
    const role = sessionStorage.getItem("role");
    if (role !== "SuperAdmin") {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    const roleItems = [];
    if (this.state.roles) {
      for (let i = 0; i < this.state.roles.length; i++) {
        roleItems.push(
          <option key={"req" + i} value={this.state.roles[i]._id}>
            {this.state.roles[i].name}
          </option>
        );
      }
    }
    let items = [];
    let list = this.state.users;

    // if (!list.includes({ 'level2': 'default' })) {
    //   list.push({ 'level1': 'default' })
    //   list.push({ 'level2': 'default' })
    //   list.push({ 'level3': 'default' })
    // }
    // else{
    //   list.push({ 'level1': 'no one' })
    // }
    console.log(list);
    let assignable_approvers_level_i = [
      <option>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>,
    ];
    // let approver_level_i_names = []
    let assignable_approvers_level_ii = [
      <option>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>,
    ];
    let assignable_approvers_level_iii = [
      <option>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>,
    ];
    // assignable_approvers_level_iii = [...assignable_approvers_level_i]
    // let indexOfLevel1
    // let indexOfLevel2
    // let indexOfLevel3
    // let approvers = {}
    // let app_i = ''

    if (list) {
      // let app_i = ''
      list.map((elem, index) => {
        if (elem.otherRole === "FTE") {
          // && (elem.approverLevel !== 'level1' && elem.approverLevel !== 'level2' && elem.approverLevel !== 'level3')
          if (elem.approverLevel !== "level1") {
            assignable_approvers_level_i.push(
              <option key={"req-" + index + 1} value={elem.firstname}>
                {elem.firstname}
              </option>
            );
          }
          if (elem.approverLevel !== "level2") {
            assignable_approvers_level_ii.push(
              <option key={"req-" + index + 1} value={elem.firstname}>
                {elem.firstname}
              </option>
            );
          }
          if (elem.approverLevel !== "level3") {
            assignable_approvers_level_iii.push(
              <option key={"req-" + index + 1} value={elem.firstname}>
                {elem.firstname}
              </option>
            );
            // assignable_approvers_level_iii.shift()
          }
        }
        return list;
      });

      list.map((elem, index) => {
        if (elem.approverLevel === "level1") {
          assignable_approvers_level_i.shift();
          assignable_approvers_level_i.unshift(
            <option key={"req-" + index} value={elem.firstname}>
              {elem.firstname}
            </option>
          );
          assignable_approvers_level_i.push(
            <option style={{ color: "red" }}>REMOVE APPROVER</option>
          );
          // this.setState({})
          this.approver_i = elem.firstname;
          // console.log(this.approver_i)
        }
        if (elem.approverLevel === "level2") {
          assignable_approvers_level_ii.shift();
          assignable_approvers_level_ii.unshift(
            <option key={"req-" + index} value={elem.firstname}>
              {elem.firstname}
            </option>
          );
          assignable_approvers_level_ii.push(
            <option style={{ color: "red" }}>REMOVE APPROVER</option>
          );
          this.approver_ii = elem.firstname;
          console.log(`app 2 is set as ${this.approver_ii}`);
        } else if (elem.approverLevel === "level3") {
          assignable_approvers_level_iii.shift();
          assignable_approvers_level_iii.unshift(
            <option key={"req-" + index} value={elem.firstname}>
              {elem.firstname}
            </option>
          );
          assignable_approvers_level_iii.push(
            <option style={{ color: "red" }}>REMOVE APPROVER</option>
          );
          this.approver_iii = elem.firstname;
        }
        return list;
      });

      // for(let i=0; i < list.length; i++){
      //   if(i.approverLevel === 'level1'){
      //     app_i = i.firstname
      //     console.log(app_i)
      //   }
      // }

      // console.log(`approvers in local ${approvers}`)
    }
    // this.approverLevel_i_Changed(approvers)
    // alert('select is gonna form')
    let approver_level_i_select = (
      <select
        className="form-control"
        id="approver_i_select"
        style={{ width: "50%" }}
        // value={this.state.level_i_approver}
        onChange={(e) => {
          this.approver_i = e.target.value;
        }}
      >
        {list.map(
          (value, index) => {
            let options = [];
            if (value.otherRole === "FTE") {
              options.push(
                <option
                  selected={value.approverLevel === "level1" ? true : false}
                  key={"req-" + index}
                  value={value.firstname}
                >
                  {value.firstname}
                </option>
              );
              if (value.approverLevel === "level1") {
                this.original_approvers.app_i = value.firstname;
                this.approver_i = value.firstname;
                // options.push(<option style={{ color: "red" }} key={'req-' + index} value="REMOVE APPROVER">REMOVE APPROVER</option>)
                console.log(`approver 1 is set ${this.approver_i}`);
              }
            }

            // options.push(<option>something</option>)
            return options;
          }
          // this.approver_i  =
        )}
        {
          // <option selected={this.approver_i === '' ? true : false}>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>
        }
      </select>
    );

    let approver_level_ii_select = (
      <select
        className="form-control"
        id="approver_i_select"
        style={{ width: "50%" }}
        // value={this.state.level_i_approver}
        onChange={(e) => {
          this.approver_ii = e.target.value;
        }}
      >
        {list.map(
          (value, index) => {
            let options = [];
            if (value.otherRole === "FTE") {
              options.push(
                <option
                  selected={value.approverLevel === "level2" ? true : false}
                  key={"req-" + index}
                  value={value.firstname}
                >
                  {value.firstname}
                </option>
              );
              if (value.approverLevel === "level2") {
                this.original_approvers.app_ii = value.firstname;
                this.approver_ii = value.firstname;
                // options.push(<option style={{ color: "red" }} key={'req-' + index} value="REMOVE APPROVER">REMOVE APPROVER</option>)
                console.log(`approver 1 is set ${this.approver_i}`);
              }
            }

            // options.push(<option>something</option>)
            return options;
          }
          // this.approver_i  =
        )}
        {
          // <option selected={this.approver_ii === '' ? true : false}>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>
        }
      </select>
    );

    let approver_level_iii_select = (
      <select
        className="form-control"
        id="approver_i_select"
        style={{ width: "50%" }}
        // value={this.state.level_i_approver}
        onChange={(e) => {
          this.approver_iii = e.target.value;
        }}
      >
        {list.map(
          (value, index) => {
            let options = [];
            if (value.otherRole === "FTE") {
              options.push(
                <option
                  selected={value.approverLevel === "level3" ? true : false}
                  key={"req-" + index}
                  value={value.firstname}
                >
                  {value.firstname}
                </option>
              );
              if (value.approverLevel === "level3") {
                this.original_approvers.app_iii = value.firstname;
                this.approver_iii = value.firstname;
                // options.push(<option style={{ color: "red" }} key={'req-' + index} value="REMOVE APPROVER">REMOVE APPROVER</option>)
                console.log(`approver 3 is set ${this.approver_iii}`);
              }
            }

            // options.push(<option>something</option>)
            return options;
          }
          // this.approver_i  =
        )}
        {/* {<option selected={this.approver_iii===''?true:false}>--NO ONE IS ASSIGNED AS AN APPROVER YET--</option>} */}
      </select>
    );

    if (list) {
      list.forEach((elem, index) => {
        items.push(
          <tr key={"req-" + index}>
            <td>{elem.firstname}</td>
            <td>{elem.username}</td>
            <td>
              <select
                className="form-control"
                value={elem.role}
                onChange={(e) => {
                  this.handleChange(e);
                  elem.role = e.target.value;
                }}
              >
                {roleItems}
              </select>
            </td>
            <td>
              <button
                type="submit"
                className="btn btn-primary save save-draft"
                onClick={(e) => {
                  this.changeUser(e, elem);
                }}
              >
                Update
              </button>
            </td>
          </tr>
        );
        // console.log(`Elem.role is ${elem.role}`)
      });
    }
    return (
      <React.Fragment>
        <div className="content-section user-section content-wrapper">
          <div className="privacy-section">
            <div className="container">
              <div className="overview-section-inner">
                <h1> Approvers </h1>
                <p style={{ color: "gray", fontSize: "0.8em" }}>
                  Note: Only people who are FTE can be an approver
                </p>
                <div className="table-responsive">
                  <table
                    className="table table-striped"
                    style={{ width: "70%" }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              gap: "20px",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              First Approver:
                            </span>
                            {approver_level_i_select}

                            {/* <button onClick={this.handleApproverChange_i}
                              disabled={this.state.is_i_SaveButtonDisabled}
                              type="submit" className="btn btn-primary save save-draft" 
                              style={{ width: '100px', margin: "20px 0px 20px 0px" }}>SAVE</button> */}
                          </div>
                        </td>
                      </tr>
                      {/* <input type="text" value={this.state.approver_value}
                        onChange={this.handleApproverChange}></input>
                      <button type="submit" class="btn btn-primary save save-draft" 
                      style={{  margin: "20px 0px 20px 0px" }}
                       onClick={this.updateFirstApprover}>Change First Approver</button> */}

                      <tr>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              gap: "20px",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              Second Approver:
                            </span>
                            {approver_level_ii_select}

                            {/* <button onClick={this.handleApproverChange_ii}
                              disabled={this.state.is_ii_SaveButtonDisabled}
                              type="submit" className="btn btn-primary save save-draft"
                               style={{ width: '100px', margin: "20px 0px 20px 0px" }}>SAVE</button> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              gap: "20px",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              Third Approver:
                            </span>
                            {approver_level_iii_select}
                          </div>
                        </td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                  <button
                    onClick={this.handleApproverChange_all}
                    disabled={this.state.is_SaveButtonDisabled}
                    type="submit"
                    className="btn save save-draft"
                    style={{
                      width: "100px",
                      margin: "20px 0px 20px 0px",
                      color: "white",
                      ...(this.state.saveButtonText === "SAVE"
                        ? { backgroundColor: "blue" }
                        : {}),
                      ...(this.state.saveButtonText === "FAILED"
                        ? { backgroundColor: "red" }
                        : {}),
                      ...(this.state.saveButtonText === "DONE"
                        ? { backgroundColor: "green" }
                        : {}),
                    }}
                  >
                    {this.state.saveButtonText}
                  </button>
                  <p style={{ color: "red", fontSize: "1.2em" }}>
                    <strong> {this.state.saveErrorMessageState}</strong>
                  </p>
                  {/* <b></b>                 */}
                </div>
                <h1>Users </h1>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name </th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
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
      // <div class='register'>
      //     <h1>User Registration</h1>
      //     <p><label>First Name</label><input type='text' placeholder='First Name' name='firstname' onChange={this.myChangeHandler} /></p>
      //     <p><label>Last Name</label><input type='text' placeholder='Last Name' name='lastname' onChange={this.myChangeHandler} /></p>
      //     <p><label>Email</label><input type='text' placeholder='Email' name='email' onChange={this.myChangeHandler} /></p>
      //     <p><label>Password</label><input type='password' placeholder='Password' name='password' onChange={this.myChangeHandler} /></p>
      //     <p><label>Phone</label><input type='text' placeholder='Phone No' name='phone' onChange={this.myChangeHandler} /></p>
      //     <p><label>Role</label>
      //         <select class="form-control" style={{ width: '250px' }}
      //             value={this.state.formData.role}
      //             onChange={this.handleChange}
      //         >{roleItems}
      //         </select></p>
      //     <p><label>Username</label><input type='text' placeholder='Username' name='username' onChange={this.myChangeHandler} /></p>
      //     <p><button onClick={e => this.signupuser(e)}>Signup</button> <Link to="/login">Back to Login</Link></p>
      //     {fetchProgress ? <CircularProgress color="secondary" /> : ''}
      // </div>
    );
  }
  afterRender() {
    console.log("rendering done");
  }
}
