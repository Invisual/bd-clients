import React from 'react';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';

export const UserDashboard = (props) => {
    return (
      <DashboardContainer className="dashboard-container">
        <div className="widgets-grid">
          <div className="grid-widget"><MyTasksContainer title="As Minhas Tarefas"/></div>
          <div className="grid-widget"></div>
          <div className="grid-widget"><MyProjectsContainer title="Projetos" /></div>
          <div className="grid-widget"></div>
        </div>
      </DashboardContainer>
    );
}

