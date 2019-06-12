import React, {Component} from 'react'
import {AllTrips} from '../../components/lists/AllTrips'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const axios = require('axios')

class AllTripsContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            trips: [],
            isLoading: true
        }
    }

    getTrips = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get(`/api/misc/trips/`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'notrips'){
                this.setState({isLoading: false})
            }
            else{
                this.setState({trips: res.data, isLoading: false})
            }
        })
    }

    deleteTrip = (id) => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Esta ação é irreversível',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, eliminar!',
            cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.value) {
                    Swal.fire('Eliminado!', '', 'success');
                    axios.delete(`api/misc/trips/${id}`, { headers: { Authorization: AuthStr } })
                    .then(res => {
                        this.getTrips()
                    })
                }
        });
    }

    componentDidMount(){
        this.getTrips()
    }

    render(){
        return <AllTrips
                trips={this.state.trips}
                isLoading={this.state.isLoading}
                userInfo={this.props.userInfo}
                deleteTrip={this.deleteTrip}
                />
    }
}

export default AllTripsContainer