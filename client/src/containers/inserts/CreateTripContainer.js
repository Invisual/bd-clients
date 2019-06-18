import React, {Component} from 'react';
import {CreateTrip} from '../../components/inserts/CreateTrip';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

const axios = require('axios');

class CreateTripContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            startHourInput: '',
            endHourInput: '',
            startKmsInput: '',
            endKmsInput: '',
            descriptionInput: '',
            vehicleInput: '',
            dateInput: new Date(),
            vehiclesList: [],
            tripData: [],
            redirect: false,
        }
    }

    changeStartHourInput = (e) => this.setState({startHourInput: e.target.value})
    changeEndHourInput = (e) => this.setState({endHourInput: e.target.value})
    changeStartKmsInput = (e) => this.setState({startKmsInput: e.target.value})
    changeEndKmsInput = (e) => this.setState({endKmsInput: e.target.value})
    changeDescriptionInput = (e) => this.setState({descriptionInput: e.target.value})
    changeVehicleInput = (e) => this.setState({vehicleInput: e.target.value})
    changeDateInput = val => this.setState({dateInput: val})

    getVehiclesList = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/vehicles', { headers: { Authorization: AuthStr } })
        .then(res => this.setState({vehiclesList: res.data}, () => console.log(this.state.vehiclesList)))
    }

    getTripData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/misc/trips/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'notrip'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `A Deslocação que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                this.setState({
                    tripData: res.data[0],
                    startHourInput: res.data[0].start_hour,
                    endHourInput:res.data[0].end_hour,
                    startKmsInput:res.data[0].start_kms,
                    endKmsInput:res.data[0].end_kms,
                    descriptionInput:res.data[0].description_trip,
                    dateInput:res.data[0].date_trip,
                    vehicleInput:res.data[0].ref_id_vehicle
                })
            }
        })
    }

    insertTrip = (e) => {
        e.preventDefault()
        var user = JSON.parse(localStorage.getItem('user'))
        var data = {
            startHour: this.state.startHourInput,
            endHour: this.state.endHourInput,
            startKms: this.state.startKmsInput,
            endKms: this.state.endKmsInput,
            description: this.state.descriptionInput,
            vehicle: this.state.vehicleInput,
            date: moment(this.state.dateInput).format('YYYY-MM-DD'),
            user: user.id_user
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/misc/trips', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Deslocação Submetida',
                    text: `O registo de Deslocação foi submetido com sucesso!`
                    })
                    .then(click => this.setState({redirect: true}))
            }
        })
    }


    editTrip = (e) => {
        e.preventDefault()
        var data = {
            idTrip: this.state.tripData.id_trip,
            startHour: this.state.startHourInput,
            endHour: this.state.endHourInput,
            startKms: this.state.startKmsInput,
            endKms: this.state.endKmsInput,
            description: this.state.descriptionInput,
            vehicle: this.state.vehicleInput,
            date: moment(this.state.dateInput).format('YYYY-MM-DD')
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/misc/trips', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Deslocação Editada',
                    text: `O registo de Deslocação foi editado com sucesso!`
                    })
                    .then(click => this.setState({redirect: true}))
            }
        })
    }


    componentDidMount(){
        if(this.props.type === 'edit'){ this.getTripData() }
        this.getVehiclesList()
    }

    render(){
        return <CreateTrip
                title={this.props.title}
                startHourInput={this.state.startHourInput}
                endHourInput={this.state.endHourInput}
                startKmsInput={this.state.startKmsInput}
                endKmsInput={this.state.endKmsInput}
                descriptionInput={this.state.descriptionInput}
                vehicleInput={this.state.vehicleInput}
                dateInput={this.state.dateInput}
                changeStartHourInput={this.changeStartHourInput}
                changeEndHourInput={this.changeEndHourInput}
                changeStartKmsInput={this.changeStartKmsInput}
                changeEndKmsInput={this.changeEndKmsInput}
                changeDescriptionInput={this.changeDescriptionInput}
                changeVehicleInput={this.changeVehicleInput}
                changeDateInput={this.changeDateInput}
                vehiclesList={this.state.vehiclesList}
                insertTrip={this.insertTrip}
                editTrip={this.editTrip}
                redirect={this.state.redirect}
                type={this.props.type}
                />;
    }
}

export default CreateTripContainer;
