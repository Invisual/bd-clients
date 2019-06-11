import React, {Component} from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Redirect } from 'react-router'
const axios = require('axios');

class VacationsApprovalContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            vacationId: '',
            vacationContent:[],
            type: '',
            redirect: false
        }
    }

    componentDidMount(){
        this.getVacationContent()
        this.setState({vacationId: this.props.match.params.id, type: this.props.match.params.type})
        Swal.fire({
            title: 'Quer aprovar este pedido de férias?',
            text: 'Se não pretender aprovar, clique em Cancelar',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, aprovar!',
            cancelButtonText: 'Cancelar'
          }).then(result => {
            if (result.value) {
              Swal.fire('Pedido Aprovado!', '', 'success').then(result => {
                if (result.value) {
                  this.approveVacation()
                }
              });
            }
            else{
                Swal.fire('Pedido Não Aprovado!', '', 'error').then(click => {
                    this.setState({redirect:true})
                })
            }
          });
    }

    getVacationContent = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get(`/api/misc/vacations/${this.props.match.params.id}`, { headers: { Authorization: AuthStr } })
        .then(res => this.setState({vacationContent: res.data}))
    }

    approveVacation = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var data = {
            id: this.state.vacationId,
            approv: 2,
            idUser: this.state.vacationContent[0].id_user,
            nameUser: this.state.vacationContent[0].name_user,
            emailUser: this.state.vacationContent[0].email_user,
            startDate: this.state.vacationContent[0].start_date,
            endDate: this.state.vacationContent[0].end_date,
            dayType: this.state.vacationContent[0].type_single_day,
            type: this.state.vacationContent[0].type_vacation,
        }
        axios.put(`/api/misc/approvevacation/${this.state.type}`, data, { headers: { Authorization: AuthStr } })
        .then((res) => { 
            if(res.data !== 'error'){this.setState({redirect: true}) }
            else{console.log('error')}
        })
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to='/'/>;
        }
        return (
            <div></div>
        )
    }
}


export default VacationsApprovalContainer