import React, {Component} from 'react'
import {CreateTaskHour} from '../../components/inserts/CreateTaskHour'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

const axios = require('axios')

class CreateTaskHourContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInput: 0,
            taskInput: 0,
            beginningHourInput: '',
            endingHourInput: '',
            dayInput: moment(new Date()).format('YYYY-MM-DD'),
            usersData: [],
            tasksData: [],
            taskHourData: [],
            isLoading: true,
            type: 'add'
        }
    }

    changeUserInput = e => this.setState({userInput: e.target.value})
    changeTaskInput = e => this.setState({taskInput: e.target.value})
    changeBeginningHourInput = e => this.setState({beginningHourInput: e.target.value})
    changeEndingHourInput = e => this.setState({endingHourInput: e.target.value})
    changeDayInput = val => this.setState({dayInput: moment(val).format('YYYY-MM-DD')})


    getUsersData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/users/', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({usersData: res.data, isLoading: false})
        })
    }

    getTasksData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get(`/api/tasks/${this.state.userInput}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'nodata'){
                this.setState({tasksData: []})
            }
            else{
                this.setState({tasksData: res.data})
            }
        })
    }

    getTaskHourData = (id) => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get(`/api/hours/id/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'nohours'){ this.setState({taskHourData: []}) }
            else{ this.setState({
                    taskHourData: res.data[0],
                    userInput: res.data[0].ref_id_users,
                    taskInput: res.data[0].ref_id_tasks,
                    beginningHourInput: res.data[0].beginning_hour,
                    endingHourInput: res.data[0].ending_hour,
                    dayInput: moment(res.data[0].day).format('YYYY-MM-DD'),
                })}
        })
    }

    insertTaskHour = (e) => {
        e.preventDefault()
        var data = {
            user: this.state.userInput,
            task: this.state.taskInput,
            beginningHour: this.state.beginningHourInput,
            endingHour: this.state.endingHourInput,
            day: this.state.dayInput
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/hours/manual', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Registo de Horas inserido',
                    text: `O Registo de Horas foi inserido com sucesso!`
                    })
                    .then(click => this.props.closeModal('hours'))
            }
        })
    }

    editTaskHour = (e) => {
        e.preventDefault()
        var data = {
            user: this.state.userInput,
            task: this.state.taskInput,
            beginningHour: this.state.beginningHourInput,
            endingHour: this.state.endingHourInput,
            day: this.state.dayInput
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put(`/api/hours/manual/${this.props.editHourId}`, data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Registo de Horas editado',
                    text: `O Registo de Horas foi editado com sucesso!`
                    })
                    .then(click => {
                        this.props.closeModal('hours')
                        this.props.changeEditHourId('')
                    })
            }
        })
    }
    
    componentDidMount(){
        this.getUsersData()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.userInput !== this.state.userInput){
            this.getTasksData()
        }
        if(prevProps.editHourId !== this.props.editHourId){
            if(this.props.editHourId !== ''){
                this.setState({type: 'edit'}, () => this.getTaskHourData(this.props.editHourId))
            }
            else{
                this.setState({
                    type: 'add',
                    userInput: 0,
                    taskInput: 0,
                    beginningHourInput: '',
                    endingHourInput: '',
                    dayInput: moment(new Date()).format('YYYY-MM-DD'),
                })
            }
        }
    }

    render(){
        return <CreateTaskHour 
                userInput={this.state.userInput}
                taskInput={this.state.taskInput}
                beginningHourInput={this.state.beginningHourInput}
                endingHourInput={this.state.endingHourInput}
                dayInput={this.state.dayInput}
                changeUserInput={this.changeUserInput}
                changeTaskInput={this.changeTaskInput}
                changeBeginningHourInput={this.changeBeginningHourInput}
                changeEndingHourInput={this.changeEndingHourInput}
                changeDayInput={this.changeDayInput}
                usersData={this.state.usersData}
                tasksData={this.state.tasksData}
                taskBeginningHour={this.state.taskBeginningHour}
                taskHourData={this.state.taskHourData}
                insertTaskHour={this.insertTaskHour}
                editTaskHour={this.editTaskHour}
                isLoading={this.state.isLoading}
                type={this.state.type}
                closeModal={this.props.closeModal}
                editHourId={this.props.editHourId}
                changeEditHourId={this.props.changeEditHourId}
                />
    }
}

export default CreateTaskHourContainer