import React from 'react'
import axios from 'axios'
import { services } from '../../common/constant'
import Autocomplete from 'react-autocomplete'

export default class Learning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learningList: [],
            userList: [],
            userId: '',
            userName: ''
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                if (response.data.message === 'Invalid Token') {
                    sessionStorage.clear()
                    return this.props.history.push('/login')
                }
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        this.setState({ role: element.name })
                    }
                })
            })

        } else this.setState({ role: 'User' })
        this.setState({
            userId: JSON.parse(sessionStorage.getItem('user'))._id,
            userName: JSON.parse(sessionStorage.getItem('user')).firstname + ' ' + JSON.parse(sessionStorage.getItem('user')).lastname
        })
        axios.get(services.baseUrl + services.getLearning + '?authToken=' + sessionStorage.getItem('authToken') + '&userId=' + JSON.parse(sessionStorage.getItem('user'))._id).then(response => {
            this.setState({
                learningList: response.data.data
            })
            axios.get(services.baseUrl + services.getUsersList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                this.setState({
                    userList: response.data.data
                })
            })
        })
    }
    handleTraining = (e, status) => {
        axios.post(services.baseUrl + services.changeTrainingStatus + '?authToken=' + sessionStorage.getItem('authToken'), { 'id': e, statusId: status, userId: this.state.userId }).then(response => {
            axios.get(services.baseUrl + services.getLearning + '?authToken=' + sessionStorage.getItem('authToken') + '&userId=' + this.state.userId).then(response => {
                this.setState({
                    learningList: response.data.data
                })
            })
        })
    }
    handleSearch = (val, e) => {
        const userName = e ? val : this.state.userName
        const userId = e ? e._id : this.state.userId
        this.setState({ userName, userId })
        axios.get(services.baseUrl + services.getLearning + '?authToken=' + sessionStorage.getItem('authToken') + '&userId=' + userId).then(response => {
            this.setState({
                learningList: response.data.data
            })
        })
    }
    matchString = (state, value) => {
        let name = state.firstname + ' ' + state.lastname
        return name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
    render() {
        let items = []
        let list = this.state.learningList
        if (list) {
            list.forEach((elem, index) => {
                items.push(
                    <tr key={'learn-' + index}>
                        <td>{elem.training}</td>
                        <td>{elem.status}</td>
                        <td>{elem.startDate}</td><td> {elem.endDate}</td>
                        <td>{this.state.role !== 'User' && elem.status === 'Complete' ? <a class="request-button align-left" onClick={event => { this.handleTraining(elem.trainingId, '5eaa4eada111ad0cfce91ef1') }}> Mark incomplete
</a> : ''} </td>
                    </tr>
                )
            })
        }
        return (
            <React.Fragment>
                <div class="content-section">
                    <div class="work-section job-section">
                        <div class="container">
                            <div class="work-section-inner">
                                <h2>Admin Home </h2>
                            </div>
                        </div>
                    </div>
                    
                        <div class="container">
                        <div class="jobs-table pb-3">
                            <h1>User Learning Tracking</h1>
                            <div class="form-group example">
                                {/* <select style={{ display: 'inline-block', width: '250px' }} class="form-control" value={this.state.userId} onChange={e => { this.setState({ userId: e.target.value, userName: e.currentTarget.options[e.currentTarget.selectedIndex].innerText }) }}>{userItems}</select> */}
                                <Autocomplete
                                    getItemValue={(item) => item.firstname + ' ' + item.lastname}
                                    items={this.state.userList}
                                    renderItem={(item, isHighlighted) =>
                                        <div style={{ background: isHighlighted ? 'lightgray' : 'white', padding: '7px' }}>
                                            {item.firstname + ' ' + item.lastname}
                                        </div>
                                    }
                                    shouldItemRender={this.matchString}
                                    value={this.state.userName}
                                    onChange={(event, value) => this.setState({ userName: value })}
                                    onSelect={(val, e) => this.handleSearch(val, e)}
                                >
                                </Autocomplete><button onClick={this.handleSearch}><i class="fa fa-search"></i></button>
                            </div>
                            <h1>{this.state.userName} Learning History:</h1>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Training Name </th>
                                            <th>Status </th>
                                            <th>StartDate</th><th> EndDate</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}