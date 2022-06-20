import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { services } from '../../common/constant'

class ViewIncident extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            role: ''
        };
    }

    componentDidMount() {
        axios.get(services.baseUrl + services.getIncident + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            response.data.data.forEach(elem => {
                if (elem._id === this.props.match.params.id) {
                    this.setState({
                        data: elem
                    })
                }
            })


        })
        if (sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        this.setState({ role: element.name })
                    }
                })
            })

        } else { this.setState({ role: 'User' }) }
    }

    render() {

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
                            <h1>View Incident Report</h1>
                            <div class="table-responsive report-table">
                                <table class="table table-striped job-table">
                                    <thead>
                                        <tr>
                                            <th><strong>Date  </strong></th>
                                            <th><strong>{this.state.data.createdAt}</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Equipment</strong></td>
                                            <td>{this.state.data.equipmentValue}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description: </strong></td>
                                            <td>{this.state.data.description}</td>
                                        </tr>

                                        <tr>

                                            <td><strong>Brief description (no names):</strong></td>
                                            <td>{this.state.data.briefDescription}</td>
                                        </tr>

                                        {this.state.role === 'SuperAdmin' ? <tr>

                                            <td><strong> Detailed description (include names of all people involved):</strong></td>
                                            <td>{this.state.data.detailedDescription}</td>
                                        </tr> : ''}

                                        <tr>

                                            <td><strong>Severity Rating:</strong></td>
                                            <td>{this.state.data.severityValue}
                                            </td>
                                        </tr>

                                        <tr>

                                            <td><strong>Corrective Action </strong></td>
                                            <td>{this.state.data.actionName}</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                            <span class="back-class"> <Link to="/admin/safety"> Back to List</Link></span>
                            <span class="back-class"> <Link to="/admin"> Back to Home</Link></span>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
export default ViewIncident