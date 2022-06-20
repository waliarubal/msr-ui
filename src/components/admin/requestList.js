import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Dialog from '../home/dialog'
import { services } from '../common/constant'

export default class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            reqestList: [],
            statusList: [],
            contactList: [],
            dates: [],
            expectedDates: [],
            requestedDates: [],
            projectCont: [],
            techCont: [],
            status: [],
            userList: {},
            classList: []
        }
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
        window.location.reload(false);
    }
    openDialog = (e, id) => {
        this.setState({
            dialogState: true,
            reqId: id
        })
    }
    formattedDate = date => {
        return date < 10 && date.length === 1 ? 0 + date : date
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(services.baseUrl + services.historyList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            var dates = [...this.state.dates];
            let projectCont = [...this.state.projectCont]
            var expectedDates = [...this.state.expectedDates];
            var requestedDates = [...this.state.requestedDates];
            let techCont = [...this.state.techCont]
            let status = [...this.state.status]
			response.data.data.sort(function(a, b) {
				var c = new Date(a.createdAt);
				var d = new Date(b.createdAt);
				return d-c;
			});
            response.data.data.forEach((elem, i) => {
                dates[i] = elem.startDate ? elem.startDate.split('/')[2] + '-' + this.formattedDate(elem.startDate.split('/')[0]) + '-' + this.formattedDate(elem.startDate.split('/')[1]) : '';
                expectedDates[i] = elem.expectedCompletionDate ? elem.expectedCompletionDate.split('/')[2] + '-' + this.formattedDate(elem.expectedCompletionDate.split('/')[0]) + '-' + this.formattedDate(elem.expectedCompletionDate.split('/')[1]) : '';
                requestedDates[i] = elem.requestedCompletionDate ? elem.requestedCompletionDate.split('/')[2] + '-' + this.formattedDate(elem.requestedCompletionDate.split('/')[0]) + '-' + this.formattedDate(elem.requestedCompletionDate.split('/')[1]) : '';
                projectCont[i] = elem.projectContact
                techCont[i] = elem.techContact
                status[i] = elem.status
            })
            this.setState({ requestedDates, expectedDates, dates, reqestList: response.data.data, projectCont, techCont, status })
            axios.get(services.baseUrl + services.getStatus + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                this.setState({
                    statusList: response.data.data
                })
                axios.get(services.baseUrl + services.getUsersList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                    let userList = {}
                    response.data.data.forEach(elem => {
                        if (elem.role !== '5eba3be3c4cf091fbc7d4307') {
                            userList[elem._id] = elem.firstname + ' ' + elem.lastname
                        }
                    })
                    this.setState({ userList })
                })
                axios.get(services.baseUrl + services.getContactUser + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {

                    this.setState({ contactList: response.data.data, loading: false })
                })
            })
        })


    }
    handleChange = (event, i, col) => {
        if (col === 'dates') {
            let dates = [...this.state.dates];
            dates[i] = event.target.value;
            this.setState({ dates });
        } else if (col === 'expectedDates') {
            let expectedDates = [...this.state.expectedDates];
            expectedDates[i] = event.target.value;
            this.setState({ expectedDates });
        } else if (col === 'requestedDates') {
            let requestedDates = [...this.state.requestedDates];
            requestedDates[i] = event.target.value;
            this.setState({ requestedDates });
        } else if (col === 'status') {
            let status = [...this.state.status];
            status[i] = event.target.value;
            this.setState({ status });
        } else if (col === 'projectCont') {
            let projectCont = [...this.state.projectCont];
            projectCont[i] = event.target.value;
            this.setState({ projectCont });
        } else if (col === 'techCont') {
            let techCont = [...this.state.techCont];
            techCont[i] = event.target.value;
            this.setState({ techCont });
        }

    }
    validate = elem => {
        let validate = true
        if (!elem.projectContact) {
            alert('Please select projectContact')
            validate = false
        } else if (!elem.techContact) {
            alert('Please select techContact')
            validate = false
        } else if (!elem.status) {
            alert('Please select status')
            validate = false
        } else if (!elem.startDate) {
            alert('Please select startDate')
            validate = false
        }
        return validate
    }
    assignJob = (e, elem) => {
        if (this.validate(elem)) {
            var bodyFormData = new FormData();
            for (let x in elem) {
                if (elem[x]) {
                    bodyFormData.set(x, elem[x])
                }
            }
            axios({
                method: 'put',
                url: services.baseUrl + services.updateRequest + '?authToken=' + sessionStorage.getItem('authToken') + '&_id=' + elem._id,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                alert("Request assign successfully")
                window.location.reload(false);
            })
        }
    }

    deleteJob = (e, elem) => {
        var r = window.confirm("Are you sure you want to delete this job?");
        if (r == true) {
            axios({
                method: 'delete',
                url: services.baseUrl + services.deleteRequestById + '?authToken=' + sessionStorage.getItem('authToken') + '&_id=' + elem._id
            }).then(response => {
                alert("Request deleted successfully")
                window.location.reload(false);
            })
        }
    }
    searchByName = e => {
        let currentValue = e.target.value.toLowerCase()
        let items = []
        this.state.reqestList.forEach((elem, index) => {
            if (elem.jobName && elem.jobName.toLowerCase().includes(currentValue)) {
                items.push('show')
            }
            else {
                items.push('hide')
            }
        })
        this.setState({
            classList: items
        })
    }
    render() {
        let status = []
        if (this.state.statusList) {
            this.state.statusList.forEach((elem, i) => {
                status.push(
                    <option value={elem._id}>{elem.name}</option>
                )
            })
        }
        let projectContct = []
        let techContact = []

        if (this.state.userList) {
            projectContct.push(<option value='-1'></option>)
            techContact.push(<option value='-1'></option>)
            for (var key in this.state.userList) {
                projectContct.push(<option value={key}>{this.state.userList[key]}</option>)
                techContact.push(<option value={key}>{this.state.userList[key]}</option>)
            }
        }
        let items = []
        let draftItems = []
        let list = this.state.reqestList

        if (list) {
            const loggedInUser = JSON.parse(sessionStorage.getItem('user'))._id
            const isUser = sessionStorage.getItem('role') === 'User'
            list.forEach((elem, index) => {
                if (elem.reqStatus === "Draft" && elem.userId === loggedInUser) {
                    draftItems.push(
                        <tr key={'req-' + index} className={this.state.classList[index]}>
                            <td>{(elem.reqStatus === "Draft") ? <a onClick={e => { this.openDialog(e, elem._id) }} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>{elem.jobName}</a> : elem.jobName}</td>
                            <td>{elem.createdAt}</td>
                            {/* <td><input type='date' disabled onChange={e => { this.handleChange(e, index, 'dates'); elem.startDate = e.target.value }} value={this.state.dates[index]} /></td>
                            <td><select disabled value={this.state.status[index]} onChange={e => { this.handleChange(e, index, 'status'); elem.status = e.target.value }}>
                                {status}
                            </select></td>
                            <td><select disabled value={this.state.projectCont[index]} onChange={e => { this.handleChange(e, index, 'projectCont'); elem.projectContact = e.target.value }}>
                                {projectContct}
                            </select></td>
                            <td><select disabled value={this.state.techCont[index]} onChange={e => { this.handleChange(e, index, 'techCont'); elem.techContact = e.target.value }}>
                                {techContact}
                            </select></td> */}
                            <td>  {/*  {(elem.reqStatus === "Submit") ? <a class="fa fa-external-link" style={{ cursor: 'pointer', color: 'blue' }} onClick={e => { this.assignJob(e, elem) }}>Save</a> : <a class="fa fa-external-link" style={{ cursor: 'not-allowed', color: 'grey' }} >Save</a>} */}
                                <a class="fa fa-trash" aria-hidden="true" style={{ cursor: 'pointer', color: 'red' }} onClick={e => { this.deleteJob(e, elem) }}> Delete</a></td>
                        </tr>
                    )
                }

                if (elem.reqStatus !== "Draft" && (!isUser || (isUser && elem.userId === loggedInUser))) {
                    console.log(elem, isUser, loggedInUser)
                    items.push(
                        <tr key={'req-' + index} className={this.state.classList[index]} style={{display:"relative"}}>
                        <td style={{ padding: "10px", margin: "5px" }}><Link to={"/jobDetail/" + elem._id}>{elem.jobName}</Link></td>
                        <td style={{ padding: "0px 5px 0px 5px", maxWidth:"5em" }} >{elem.createdAt}</td>
                        <td style={{ width: "fit-content", maxWidth: "7em", padding: "0px 5px 0px 5px" }}>
                            <input type='date' disabled onChange={e => { this.handleChange(e, index, 'dates'); elem.startDate = e.target.value }}
                             value={this.state.dates[index]} /></td>
                        <td style={{ padding: "0px 5px 0px 5px"}} ><input type='date' disabled onChange={e => { this.handleChange(e, index, 'requestedDates'); elem.requestedCompletionDate = e.target.value }} value={this.state.requestedDates[index]} /></td>
                        <td style={{ padding: "0px 5px 0px 5px"}}><input type='date' disabled onChange={e => { this.handleChange(e, index, 'expectedDates'); elem.expectedCompletionDate = e.target.value }} value={this.state.expectedDates[index]} /></td>
                        <td style={{ padding: "0px 5px 0px 5px"}}><select disabled value={this.state.status[index]} onChange={e => { this.handleChange(e, index, 'status'); elem.status = e.target.value }}>
                                {status}
                            </select></td>
                        <td style={{ padding: "0px 5px 0px 5px"}}><select disabled value={this.state.projectCont[index]} onChange={e => { this.handleChange(e, index, 'projectCont'); elem.projectContact = e.target.value }}>
                                {projectContct}
                            </select></td>
                            <td><select disabled value={this.state.techCont[index]} onChange={e => { this.handleChange(e, index, 'techCont'); elem.techContact = e.target.value }}>
                                {techContact}
                            </select></td>
                            <td>{/* {(elem.reqStatus === "Submit") ? <a class="fa fa-external-link" style={{ cursor: 'pointer', color: 'blue' }} onClick={e => { this.assignJob(e, elem) }}>Save</a> : <a class="fa fa-external-link" style={{ cursor: 'not-allowed', color: 'grey' }} >Save</a>} */}
                                <a class="fa fa-trash" aria-hidden="true" style={{ cursor: 'pointer', color: 'red' }} onClick={e => { this.deleteJob(e, elem) }}> Delete</a></td>
                        </tr>
                    )
                }
            })
        }
        return (
            <React.Fragment>
            <div class="content-section" > 
                    <div class="work-section job-section">
                        <div class="container-fluid">
                            <div class="work-section-inner">
                                <h2>Services </h2>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                    <div class="jobs-table">
                      

                            <h1>My Draft Requests</h1>
                            <input type='text' class='form-control' placeholder='Search By Job Name' style={{ width: '200px', marginBottom: '20px' }} onChange={this.searchByName} />
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Title </th>
                                            <th>Date Submitted</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {draftItems}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="jobs-table">
                        <div class="container-fluid">

                            <h1>New Request Queue</h1>
                            <input type='text' class='form-control' placeholder='Search By Job Name' style={{ width: '30%', marginBottom: '20px' }} onChange={this.searchByName} />
                            <div class="table-responsive" style={{height:"50vh"}}>
                                <table class=" table-striped">
                                    <thead>
                                        <tr>
                                            <th>Title </th>
                                            <th>Date Submitted</th>
                                            <th>Start Date</th>
                                            <th>Requested Completion Date</th>
                                            <th>Expected Completion Date</th>
                                            <th>Status </th>
                                            <th>Project Contact</th>
                                            <th>Tech Contact</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                     <tbody >
                                        {items}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="p-3">
                    <span class="back-class"> <Link to="/admin"> Back to Home</Link></span>
                    </div>
                </div>
                <div class="sk-cube-grid" style={{ 'display': this.state.loading ? 'block' : 'none' }} >
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
                {/* <CircularProgress style={{ 'display': this.state.loading ? 'block' : 'none' }} /> */}
                <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} reqId={this.state.reqId} />
            </React.Fragment >
        )
    }
}