import React from 'react';
import MyProjects from '../tables/MyProjects';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';

export const UserDashboard = (props) => {
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

