import React from 'react'
import PropTypes from 'prop-types'
import Slider from './slider'
import Newsletter from '../common/newsletter'
import WorkSection from './work-section'
import Overview from './overview'
import Dialog from './dialog'
import axios from 'axios'
import { services } from '../common/constant'


export default class HomeMain extends React.Component {
    static propTypes = {
        initLoadData: PropTypes.func.isRequired,
        getInitData: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            projects: null,
            dialogState: false
        }
    }
    componentDidMount() {
        this.props.initLoadData()
        /* axios.get(services.baseUrl + services.projectList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            if (response.data.message === 'Invalid Token') {
                sessionStorage.clear()
                return this.props.history.push('/login')
            }
            this.setState({
                projects: response.data.data
            })
        }) */
        this.setState({
            projects: [
                {
                    imgPath:'images/Project Premonition.png',
                    name: 'Project Premonition',
                    url: 'https://www.microsoft.com/en-us/research/project/project-premonition/'
                },
                {
                    imgPath:'images/Microsoft Soundscape.png',
                    name: 'Microsoft Soundscape',
                    url: 'https://www.microsoft.com/en-us/research/product/soundscape/'
                },
                {
                    imgPath:'images/Spatial Audio.png',
                    name: 'Spatial Audio',
                    url: 'https://www.microsoft.com/en-us/research/project/spatial-audio/'
                },
                {
                    imgPath:'images/Multimodal Gesture Recognition.png',
                    name: 'Multimodal Gesture Recognition',
                    url: 'https://www.microsoft.com/en-us/research/video/multimodal-gesture-recognition/'
                },{
                    imgPath:'images/Project Eclipse.png',
                    name: 'Project Eclipse',
                    url: 'https://www.microsoft.com/en-us/research/project/project-eclipse/'
                },{
                    imgPath:'images/Futureof Wearables.png',
                    name: 'Future of Wearables',
                    url: 'https://www.microsoft.com/en-us/research/project/wearables/'
                },{
                    imgPath:'images/Studies in Pandemic Awareness.png',
                    name: 'Studies in Pandemic Awareness',
                    url: 'https://www.microsoft.com/en-us/research/collaboration/studies-in-pandemic-preparedness/?OCID=msr_project_studies_tw#!projects'
                },{
                    imgPath:'images/Project Natick.png',
                    name: 'Project Natick',
                    url: 'https://www.microsoft.com/en-us/research/project/natick/'
                },{
                    imgPath:'images/DNA Storage.png',
                    name: 'DNA Storage',
                    url: 'https://www.microsoft.com/en-us/research/project/dna-storage/'
                },{
                    imgPath:'images/Eye-controlled Wheelchair.png',
                    name: 'Eye-controlled Wheelchair',
                    url: 'https://www.microsoft.com/en-us/research/project/eye-controlled-wheelchair/'
                },{
                    imgPath:'images/Prism.png',
                    name: 'Prism',
                    url: 'https://www.microsoft.com/en-us/research/project/prism/'
                }
            ]
        })
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
    }
    openDialog = () => {
        this.setState({
            dialogState: true
        })
    }
    render() {
        return (
            <div>
                <WorkSection dialogOpen={this.openDialog} />
                <Overview />
                <Slider list={this.state.projects} />
                <Newsletter />
                <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} />
            </div>
        )
    }
}