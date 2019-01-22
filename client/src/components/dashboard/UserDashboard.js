import React, { Component } from 'react';
import MyProjects from '../MyProjects';
import MyTasks from '../MyTasks';
import {DashboardContainer} from '../../styles/dashboard';

class UserDashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <div className="widgets-grid">
          <div className="grid-widget"><MyTasks title="As Minhas Tarefas"/></div>
          <div className="grid-widget"><MyProjects/></div>
          <div className="grid-widget"><MyProjects/></div>
          <div className="grid-widget"><MyProjects/></div>
        </div>
      </DashboardContainer>
    );
  }
}

export default UserDashboard;
