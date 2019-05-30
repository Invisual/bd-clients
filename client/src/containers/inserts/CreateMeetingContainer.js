import React, {Component} from 'react';
import {CreateMeeting} from '../../components/inserts/CreateMeeting';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';

const axios = require('axios');

class CreateMeetingContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateInput: new Date(),
            startHourInput: '',
            endHourInput: '',
            clientInput: '',
            topicInput: '',
            placeTypeInput: 1,
            placeInput: '',
            usersArr: [],
            clientsData: [],
            usersData: [],
            meetingData: [],
            redirect: false,
            isLoading: true,
        }
    }

    changeDateInput = (val) => {
        this.setState({ dateInput: val })
    }

    changeStartHourInput = (e) => {
        this.setState({ startHourInput: e.target.value })
    }

    changeEndHourInput = (e) => {
        this.setState({ endHourInput: e.target.value })
    }

    changeClientInput = (e) => {
        this.setState({ clientInput: e.target.value })
    }

    changeTopicInput = (e) => {
        this.setState({ topicInput: e.target.value })
    }

    changePlaceTypeInput = (e) => {
        this.setState({ placeTypeInput: e.target.value })
    }

    changePlaceInput = (e) => {
        this.setState({ placeInput: e.target.value })
    }

    changeUsersArr = (e) =>{
        var usersArr = [...this.state.usersArr];
        const value = e.target.value
        const index = usersArr.findIndex(user => user === value);
        if(index > -1) {
            usersArr = [...usersArr.slice(0, index), ...usersArr.slice(index + 1)]
        } else {
            usersArr.push(value);
        }
        this.setState({usersArr: usersArr});
    }


    getClientsData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/clients/basic', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({clientsData: res.data})
        })
    }

    getUsersData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/users/', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({usersData: res.data})
        })
    }

    getMeetingData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/meetings/basic/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'nomeeting'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `A Reunião que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                this.setState({
                    meetingData: res.data[0],
                    dateInput: res.data[0].date_meeting,
                    startHourInput:res.data[0].start_hour_meeting,
                    endHourInput:res.data[0].end_hour_meeting,
                    clientInput:res.data[0].ref_id_clients,
                    topicInput:res.data[0].title_meeting,
                    placeTypeInput:res.data[0].type_meeting,
                    placeInput:res.data[0].place_meeting,
                    usersArr:res.data[0].intervenientes ? res.data[0].intervenientes.split(',') : []
                })
            }
        })
    }

    insertMeeting = (e) => {
        e.preventDefault();
        var data = {
            date: moment(this.state.dateInput).format('Y-MM-DD'),
            startHour: this.state.startHourInput,
            endHour: this.state.endHourInput,
            client: this.state.clientInput,
            topic: this.state.topicInput,
            placeType: this.state.placeTypeInput,
            place: this.state.placeInput,
            users: this.state.usersArr
        }

        if(Number(this.state.placeTypeInput) === 1){ data.place = 'Invisual';}
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/meetings/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Nova Reunião Inserida',
                    text: `A Reunião foi inserida com sucesso!`
                  })
                  .then(click => {
                    this.setState({redirect: true})
                  })
            }
        })
    }


    editMeeting = (e) => {
        e.preventDefault();
        var data = {
            id: this.props.match.params.id,
            date: this.state.dateInput,
            startHour: this.state.startHourInput,
            endHour: this.state.endHourInput,
            client: this.state.clientInput,
            topic: this.state.topicInput,
            placeType: this.state.placeTypeInput,
            place: this.state.placeInput,
            users: this.state.usersArr
        }

        if(Number(this.state.placeTypeInput) === 1){ data.place = 'Invisual';}
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/meetings/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Reunião Editada',
                    text: `A Reunião foi editada com sucesso!`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
        })
    }

    
    componentDidMount(){
        if(this.props.type === 'edit'){ this.getMeetingData();}
        this.getUsersData();
        this.getClientsData();
    }

    render(){
        const hoursInterval = [
            '09:00',
            '09:15',
            '09:30',
            '09:45',
            '10:00',
            '10:15',
            '10:30',
            '10:45',
            '11:00',
            '11:15',
            '11:30',
            '11:45',
            '12:00',
            '12:15',
            '12:30',
            '12:45',
            '13:00',
            '13:15',
            '13:30',
            '13:45',
            '14:00',
            '14:15',
            '14:30',
            '14:45',
            '15:00',
            '15:15',
            '15:30',
            '15:45',
            '16:00',
            '16:15',
            '16:30',
            '16:45',
            '17:00',
            '17:15',
            '17:30',
            '17:45',
            '18:00',
            '18:15',
            '18:30',
            '18:45',
            '19:00'
        ]

        return <CreateMeeting
                title={this.props.title}
                changeDateInput={this.changeDateInput}
                changeStartHourInput={this.changeStartHourInput}
                changeEndHourInput={this.changeEndHourInput}
                changeClientInput={this.changeClientInput}
                changeTopicInput={this.changeTopicInput}
                changePlaceTypeInput={this.changePlaceTypeInput}
                changePlaceInput={this.changePlaceInput}
                changeUsersArr={this.changeUsersArr}
                dateInput={this.state.dateInput}
                startHourInput={this.state.startHourInput}
                endHourInput={this.state.endHourInput}
                clientInput={this.state.clientInput}
                topicInput={this.state.topicInput}
                placeTypeInput={this.state.placeTypeInput}
                placeInput={this.state.placeInput}
                usersArr={this.state.usersArr}
                insertMeeting={this.insertMeeting}
                editMeeting={this.editMeeting}
                clientsData={this.state.clientsData}
                usersData={this.state.usersData}
                meetingData={this.state.meetingData}
                hoursInterval={hoursInterval}
                redirect={this.state.redirect}
                isLoading={this.state.isLoading}
                type={this.props.type}
                />;
    }
}

export default CreateMeetingContainer;
