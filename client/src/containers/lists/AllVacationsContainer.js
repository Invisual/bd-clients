import React, { Component } from 'react';
import { AllVacations } from '../../components/lists/AllVacations';
import moment from 'moment';
import { createBrowserHistory } from 'history';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const axios = require('axios');
const history = createBrowserHistory();

class AllVacationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: moment(new Date()).format('Y-MM-DD'),
      vacations: [],
      isLoading: true
    };
  }

  changeActiveDay = day => {
    this.setState({ activeDay: day });
  };

  getVacations = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/vacations`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ vacations: res.data, isLoading: false });
    });
  };

  deleteVacation = id => {
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
    }).then(click => {
      axios.delete(`/api/misc/vacations/${id}`, { headers: { Authorization: AuthStr } }).then(res => {
        Swal.fire('Férias eliminadas!', '', 'success')
        this.getVacations()
      });
    })
  }

  componentDidMount() {
    this.getVacations();
    if(this.props.type === 'date'){ 
      this.changeActiveDay(this.props.match.params.date) 
      history.replace({ pathname: '/vacations' })
    }
  }

  render() {
    return (
      <AllVacations
        userRole={this.props.userInfo.ref_id_role}
        vacations={this.state.vacations}
        isLoading={this.state.isLoading}
        activeDay={this.state.activeDay}
        changeActiveDay={this.changeActiveDay}
        deleteVacation={this.deleteVacation}
      />
    );
  }
}

export default AllVacationsContainer;
