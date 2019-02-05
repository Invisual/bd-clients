import React from 'react';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import MyToDoContainer from '../../containers/tables/MyToDoContainer';
import MyCalendarContainer from '../../containers/tables/MyCalendarContainer';

export const UserDashboard = (props) => {
    return (
      <DashboardContainer className="dashboard-container">
        <div className="widgets-grid">
          <div className="grid-widget">
            <MyTasksContainer title="As Minhas Tarefas" type="dashboard"/>
          </div>
          <div className="grid-widget">
            <MyCalendarContainer title="Calendário"/>
          </div>
          <div className="grid-widget">
            <MyProjectsContainer title="Projetos" />
          </div>
          <div className="grid-widget">
            <MyToDoContainer title="To-do List" type="dashboard"/>
          </div>
        </div>
      </DashboardContainer>
    );
}

