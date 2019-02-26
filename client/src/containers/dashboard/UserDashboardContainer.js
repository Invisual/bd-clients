import React, { Component } from 'react';
import {UserDashboard} from '../../components/dashboard/UserDashboard';
const axios = require('axios');

class UserDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      isLoading: true
    };
  }
  
  getMeetings = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/meetings/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nomeeting') {
        this.setState({ meetings: [], isLoading: false });
      } else {
        this.setState({ meetings: res.data, isLoading: false });
      }
    });
  };

  componentDidMount(){
    this.getMeetings();
  }

  render() 
  {
    return <UserDashboard activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} meetings={this.state.meetings}/>
  }
}

export default UserDashboardContainer;
