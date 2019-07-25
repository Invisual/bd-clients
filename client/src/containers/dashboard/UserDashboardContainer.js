import React, { Component } from 'react';
import {UserDashboard} from '../../components/dashboard/UserDashboard';
import moment from 'moment';

const axios = require('axios');

class UserDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      tasks: [],
      activeDay: moment(new Date()).format('Y-MM-DD'),
      isLoading: true
    };
  }

  changeActiveDay = day => {
    this.setState({ activeDay: day });
  };
  
  getMeetings = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    var url = `/api/meetings/${idUser.id_user}`

    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nomeeting') {
        this.setState({ meetings: [], isLoading: false });
      } else {
        this.setState({ meetings: res.data, isLoading: false });
      }
    });
  };


  getTasks = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    var url = `/api/tasks/${idUser.id_user}`
    if(this.props.isAccountDashboard){ url = `/api/tasks/accounts/${idUser.id_user}`}

    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ tasks: [], isLoading: false });
      } else {
        this.setState({ tasks: res.data, isLoading: false });
      }
    });
  };

  componentDidMount(){
    this.getMeetings();
    this.getTasks();
  }

  componentDidUpdate(prevProps){
    if(prevProps.isAccountDashboard !== this.props.isAccountDashboard){
      this.getTasks()
    }
  }

  render(){
    var events = this.state.tasks.length>0 || this.state.meetings.length>0 ? [...this.state.tasks, ...this.state.meetings] : []
    return <UserDashboard 
            activeHours={this.props.activeHours} 
            getActiveHours={this.props.getActiveHours} 
            meetings={events} 
            openModal={this.props.openModal}
            userInfo={this.props.userInfo}
            userRole={this.props.userInfo.ref_id_role}
            shouldTodosUpdate={this.props.shouldTodosUpdate}
            changeShouldTodosUpdate={this.props.changeShouldTodosUpdate}
            isAccountDashboard={this.props.isAccountDashboard}
            activeDay={this.state.activeDay}
            changeActiveDay={this.changeActiveDay}
          />
  }
}

export default UserDashboardContainer;
