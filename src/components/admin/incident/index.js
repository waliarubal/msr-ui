import React from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { services } from '../../common/constant'

export default class IncidentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incidentList: [],
            monthWise: []
        }
    }
    componentDidMount() {
        axios.get(services.baseUrl + services.monthWise + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            this.setState({
                monthWise: response.data.data
            })
        })
        axios.get(services.baseUrl + services.getIncident + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            this.setState({
                incidentList: response.data.data
            })
        })

    }
    viewIncident = elem => {
        this.props.history.push('/admin/viewIncident', { elem })
    }
    render() {
        let items = []
        let list = this.state.incidentList
        if (list) {
            list.forEach((elem, index) => {
                items.push(
                    <tr key={'ins-' + index}>
                        <td>{elem.createdAt}</td>
                        <td>{elem.equipmentValue}</td>
                        <td><Link to={"/admin/viewIncident/" + elem._id}>{elem.description}</Link></td>
                    </tr>
                )
            })
        }
        let labels = []
        let counts = []
        let graphData = this.state.monthWise
        if (graphData) {
            graphData.forEach(elem => {
                labels.push(
                    elem.month + ' ' + elem.year
                )
                counts.push(elem.count)
            })
        }
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Incidents Per Month',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: counts
                }
            ]
        };
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
                        <div class="jobs-table">
                            <h1>Safety Home <div className="newincident">
                                <Link to="/admin/newincident" class="safety-btn">FILE SAFETY INCIDENT</Link>
                            </div></h1>
                            <div className="chartjs-canvas">
                            {/* <Line data={data} height={70} /> */}
                            <Line data={data} />
                            </div>

                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date  <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                                            <th> Equipment  <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <span class="back-class"> <Link to="/admin"> Back to Home</Link></span>
                    </div>
                    
                </div >
            </React.Fragment >
        )
    }
}