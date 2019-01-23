import React, { Component } from 'react';
import MyProjects from '../tables/MyProjects';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';

class UserDashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <div className="widgets-grid">
          <div className="grid-widget"><MyTasksContainer title="As Minhas Tarefas"/></div>
          <div className="grid-widget"><MyProjects/></div>
          <div className="grid-widget"><MyProjects/></div>
          <div className="grid-widget"><MyProjects/></div>
        </div>
      </DashboardContainer>
    );
  }
}

export default UserDashboard;
