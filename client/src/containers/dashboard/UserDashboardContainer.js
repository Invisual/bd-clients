import React, { Component } from 'react';
import {UserDashboard} from '../../components/dashboard/UserDashboard';


class UserDashboardContainer extends Component {
  render() 
  {
    return <UserDashboard activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours}/>
  }
}

export default UserDashboardContainer;
