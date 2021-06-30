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

  render(){
    var events = this.state.tasks.length>0 || this.state.meetings.length>0 ? [...this.state.tasks, ...this.state.meetings] : []
    return <UserDashboard 
            openModal={this.props.openModal}
            userInfo={this.props.userInfo}
            userRole={this.props.userInfo.ref_id_role}
            isAccountDashboard={this.props.isAccountDashboard}
          />
  }
}

export default UserDashboardContainer;
