import React, { Component } from 'react';
import { AllMeetings } from '../../components/lists/AllMeetings';
import moment from 'moment';
import { createBrowserHistory } from 'history';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const axios = require('axios');
const history = createBrowserHistory();

class AllMeetingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: moment(new Date()).format('Y-MM-DD'),
      meetings: [],
      isLoading: true
    };
  }

  changeActiveDay = day => {
    this.setState({ activeDay: day });
  };

  getMeetings = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/meetings/`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nomeeting') {
        this.setState({ meetings: null, isLoading: false });
      } else {
        this.setState({ meetings: res.data, isLoading: false });
      }
    });
  };

  deleteMeeting = id => {
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
      axios.delete(`/api/meetings/${id}`, { headers: { Authorization: AuthStr } }).then(res => {
        Swal.fire('Tarefa eliminada!', '', 'success')
        this.getMeetings()
      });
    })
  }

  componentDidMount() {
    this.getMeetings();
    if(this.props.match.params.date){ 
      this.changeActiveDay(this.props.match.params.date) 
      history.replace({ pathname: '/meetings' })
    }
  }

  render() {
    return (
      <AllMeetings
        userRole={this.props.userInfo.ref_id_role}
        meetings={this.state.meetings}
        isLoading={this.state.isLoading}
        activeDay={this.state.activeDay}
        changeActiveDay={this.changeActiveDay}
        deleteMeeting={this.deleteMeeting}
      />
    );
  }
}

export default AllMeetingsContainer;
