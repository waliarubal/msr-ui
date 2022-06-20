import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { services } from '../../common/constant'

class NewIncident extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipments: '',
            actions: '',
            severity: '',
            formData: {
                description: '',
                briefDescription: '',
                detailedDescription: '',
                correctiveActionId: '',
                equipmentId: '',
                severityId: '',
                userId: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : ''
            }
        };
    }

    componentDidMount() {
        axios.get(services.baseUrl + services.getEquipments + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            let resData = response.data.data
            let elem = []
            var formData = { ...this.state.formData }
            formData['equipmentId'] = resData[0]._id
            resData.forEach((element, index) => {
                elem.push(
                    <option key={'eqp-' + index} value={element._id}>{element.name}</option>
                )
            })
            this.setState({
                equipments: elem,
                formData: formData
            })
        })
        axios.get(services.baseUrl + services.getActions + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            let resData = response.data.data
            let elem = []
            var formData = { ...this.state.formData }
            formData['correctiveActionId'] = resData[0]._id
            resData.forEach((element, index) => {
                elem.push(
                    <option key={'act-' + index} value={element._id}>{element.name}</option>
                )
            })
            this.setState({
                actions: elem,
                formData: formData
            })
        })
        axios.get(services.baseUrl + services.getSeverity + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            let resData = response.data.data
            let elem = []
            var formData = { ...this.state.formData }
            formData['severityId'] = resData[0]._id
            resData.forEach((element, index) => {
                elem.push(
                    <option key={'sev-' + index} value={element._id}>{element.value}</option>
                )
            })
            this.setState({
                severity: elem,
                formData: formData
            })
        })
    }
    myChangeHandler = (event) => {
        var formData = { ...this.state.formData }
        formData[event.target.name] = event.target.value
        this.setState({ formData });
    }
    validation = () => {
        let allReqFields = this.state.formData
        let retVal = true
        for (let key in allReqFields) {
            if (allReqFields[key] === "") {
                retVal = false
                alert('Please enter ' + key + " value.")
                break
            }
        }
        return retVal
    }
    formSubmit = () => {
        if (this.validation()) {
            axios.post(services.baseUrl + services.submitIncident + '?authToken=' + sessionStorage.getItem('authToken'), this.state.formData).then(response => {
                alert('New Incident created successfully!')
                this.setState({ formData: {} })
                this.props.history.push('/admin/safety')
            })
        }
    }
    render() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return (
            <React.Fragment>
                <div class="content-section">
                    <div class="work-section job-section">
                        <div class="container">
                            <div class="work-section-inner">
                                <h2>Safety Home </h2>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                    <div class="jobs-table new-report">
                        
                            <h1>New Incident Report</h1>
                            <div class="table-responsive report-table">
                                <table class="table table-striped job-table">
                                    <thead>
                                        <tr>
                                            <th><strong>Date  </strong></th>
                                            <th><strong>{today}</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Equipment</strong></td>
                                            <td>
                                                <select className="form-control" name='equipmentId' value={this.state.formData.equipmentId} onChange={this.myChangeHandler}>
                                                    {this.state.equipments}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description: </strong></td>
                                            <td><input type="text" class="form-control" name='description' onChange={this.myChangeHandler} value={this.state.formData.description} /></td>
                                        </tr>

                                        <tr>

                                            <td><strong>Brief description (no names):</strong></td>
                                            <td><input type="text" class="form-control" name='briefDescription' onChange={this.myChangeHandler} value={this.state.formData.briefDescription} /></td>
                                        </tr>

                                        <tr>

                                            <td><strong> Detailed description (include names of all people involved):</strong></td>
                                            <td><textarea rows="3" class="form-control" name='detailedDescription' onChange={this.myChangeHandler} value={this.state.formData.detailedDescription} /></td>
                                        </tr>

                                        <tr>

                                            <td><strong>Severity Rating:</strong></td>
                                            <td>

                                                <select style={{'max-width': '100px'}} className="form-control" value={this.state.formData.severityId} name='severityId' onChange={this.myChangeHandler}>
                                                    {this.state.severity}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>

                                            <td><strong>Corrective Action </strong></td>
                                            <td>

                                                <select className="form-control" value={this.state.formData.correctiveActionId} name='correctiveActionId' onChange={this.myChangeHandler}>
                                                    {this.state.actions}
                                                </select></td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                           <div className="text-center"> <button class="btn btn-primary submit-button" onClick={this.formSubmit}>SUBMIT </button></div>
                            <span class="back-class"> <Link to="/admin/safety"> Back to List</Link></span>
                            <span class="back-class"> <Link to="/admin"> Back to Home</Link></span>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
export default NewIncident