import React, {Component} from 'react';
import {CreateVacation} from '../../components/inserts/CreateVacation';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class CreateVacationContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            typeInput: 1,
            dayTypeInput: '',
            startDateInput: new Date(),
            endDateInput: new Date(),
            redirect: false,
        }
    }

    changeTypeInput = (e) => this.setState({typeInput: e.target.value})
    changeDayTypeInput = (e) => this.setState({dayTypeInput: e.target.value})
    changeStartDateInput = val => this.setState({startDateInput: val})
    changeEndDateInput = val => this.setState({endDateInput: val})

    insertVacation = (e) => {
        e.preventDefault();
        var user = JSON.parse(localStorage.getItem('user'));
        var data = {
            type: this.state.typeInput,
            dayType: this.state.dayTypeInput,
            startDate: this.state.startDateInput,
            endDate: this.state.endDateInput,
            user: user.id_user,
            nameUser: user.name_user
        }
        if(Number(this.state.typeInput) === 1){
           data.endDate = ''
        }
        else{
            data.dayType = 0
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/misc/vacations', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Pedido Submetido',
                    text: `O Pedido de Férias foi submitido. Verifique aqui mais tarde se este foi aprovado.`
                    })
                    .then(click => this.setState({redirect: true}))
            }
        })
    }

    render(){
        return <CreateVacation
                title={this.props.title}
                typeInput={this.state.typeInput}
                dayTypeInput={this.state.dayTypeInput}
                startDateInput={this.state.startDateInput}
                endDateInput={this.state.endDateInput}
                changeTypeInput={this.changeTypeInput}
                changeDayTypeInput={this.changeDayTypeInput}
                changeStartDateInput={this.changeStartDateInput}
                changeEndDateInput={this.changeEndDateInput}
                insertVacation={this.insertVacation}
                redirect={this.state.redirect}
                isLoading={this.state.isLoading}
                type={this.props.type}
                />;
    }
}

export default CreateVacationContainer;
