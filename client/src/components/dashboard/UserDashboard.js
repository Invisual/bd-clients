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
          <div className="grid-widget mt15">
            <MyTasksContainer title="Tarefas" type="dashboard" activeHours={props.activeHours} getActiveHours={props.getActiveHours}/>
          </div>
          <div className="grid-widget mt15">
            <MyCalendarContainer title="Calendário" type="dashboard" meetings={props.meetings}/>
          </div>
          <div className="grid-widget mt15">
            <MyProjectsContainer title="Projetos" type="dashboard"/>
          </div>
          <div className="grid-widget mt15">
            <MyToDoContainer title="To-do List" type="dashboard"/>
          </div>
        </div>
      </DashboardContainer>
    );
}

