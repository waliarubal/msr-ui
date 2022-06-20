import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { services } from '../common/constant'
import Grid from '../common/grid'
import Dialog from './dialog'


export default class Tours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            selectedTime: '',
            dataSet: null,
            role: ''
        }
    }
    openDialog = (e, data) => {
        this.setState({
            dialogState: true,
            selectedTime: data
        })
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false,
            viewTour: null
        })
        this.handleData()
    }
    handleData = () => {
        axios.get(services.baseUrl + services.getTour + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            let data = response.data.data
            let dataset = {
                '11AM': [],
                '12PM': [],
                '1PM': [],
                '2PM': [],
                '3PM': [],
                '4PM': []
            }
            const tourTimes = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM']
            for (let i = 0; i < tourTimes.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (tourTimes[i] === data[j].time) {
                        dataset[tourTimes[i]].push(
                            data[j]
                        )
                    }
                }
            }
            this.setState({
                dataSet: dataset
            })
        })
    }
    componentDidMount() {
        if (sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        this.setState({ role: element.name })
                    }
                })
            })

        } else { this.setState({ role: 'User' }) }
        this.handleData()
    }
    deleteTour = id => {
        if (this.state.role !== 'User') {
            axios.get(services.baseUrl + services.tourDelete + '?authToken=' + sessionStorage.getItem('authToken') + '&id=' + id).then(response => {
                alert(response.data.message)
                this.handleData()
            })
        }
    }
    viewTour = data => {
        if (this.state.role !== 'User') {
            this.setState({
                dialogState: true,
                viewTour: data
            })
        }
    }
    
    render() {
        const dataItems = []
        
        const dayPusher = dateObj => {
            if(dateObj.getDay() == 5) {
                return dateObj.setDate(dateObj.getDate() + 3)
            }
            else {
                return dateObj.setDate(dateObj.getDate() + 1)
            }
        }

        const today = new Date()
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const tomorrow = new Date(today)
        dayPusher(tomorrow)
        const tomorrowp1 = new Date(tomorrow)
        dayPusher(tomorrowp1)
        const tomorrowp2 = new Date(tomorrowp1)
        dayPusher(tomorrowp2)
        const tomorrowp3 = new Date(tomorrowp2)
        dayPusher(tomorrowp3)
        const tomorrowp4 = new Date(tomorrowp3)
        dayPusher(tomorrowp4)
        
        if (this.state.dataSet) {
            const tourTimes = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM']
            for (let i = 0; i < 6; i++) {
                let cols = []
                let columnSet = this.state.dataSet[tourTimes[i]]
                for (let j = 0; j < columnSet.length; j++) {
                    if (columnSet[j].tourData) {
                        cols.push(<td class="table-color"><a onClick={e => { this.viewTour(columnSet[j].tourData) }}>{columnSet[j].tourData.title}</a> <i class="fa fa-times" aria-hidden="true" onClick={e => { this.deleteTour(columnSet[j].tourData._id) }}></i></td>)
                    } else {
                        cols.push(<td class="table-hover"><a class="tour-popup" onClick={e => { this.openDialog(e, columnSet[j]) }}> <i class="fa fa-plus" aria-hidden="true"></i>  </a></td>)
                    }

                }
                dataItems.push(<tr>
                    <th>{tourTimes[i]}</th>
                    {cols}
                </tr>)
            }
        }
        return (<div>
            <div class="work-section job-section">
                <div class="container">
                    <div class="work-section-inner">
                        <h2>Tour </h2>
                    </div>
                </div>
            </div>
            <div class="jobs-table">
                <div class="container">
                    <div class="jobs-table-inner">
                        <p>Tours of the Hardware Lab happen every Tuesday at 3pm. </p>
                        <p>Alternatively you can schedule a tour by picking an available time here: </p>
                        <div class="table-responsive tour-table">
                            <table class="table table-striped ">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{days[tomorrow.getDay()]} {tomorrow.getMonth() + 1}/{tomorrow.getDate()}</th>
                                        <th>{days[tomorrowp1.getDay()]} {tomorrowp1.getMonth() + 1}/{tomorrowp1.getDate()}</th>
                                        <th>{days[tomorrowp2.getDay()]} {tomorrowp2.getMonth() + 1}/{tomorrowp2.getDate()}</th>
                                        <th>{days[tomorrowp3.getDay()]} {tomorrowp3.getMonth() + 1}/{tomorrowp3.getDate()}</th>
                                        <th>{days[tomorrowp4.getDay()]} {tomorrowp4.getMonth() + 1}/{tomorrowp4.getDate()}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} selectedTime={this.state.selectedTime} viewTour={this.state.viewTour} />
        </div >
        )
    }
}