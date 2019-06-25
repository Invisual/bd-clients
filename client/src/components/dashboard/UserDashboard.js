import React from 'react';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import MyToDoContainer from '../../containers/tables/MyToDoContainer';
import MyCalendarContainer from '../../containers/tables/MyCalendarContainer';
import MyApprovalsContainer from '../../containers/tables/MyApprovalsContainer';
import MyUsersContainer from '../../containers/tables/MyUsersContainer';

export const UserDashboard = (props) => {
    return (
      <DashboardContainer className="dashboard-container">
        <div className="widgets-grid">
          <div className={props.userInfo.id_position === 2 ?'grid-widget mt15 full-row-grid-widget' : 'grid-widget mt15'}>
            {props.userInfo.id_position === 2 ? <MyUsersContainer title="Equipa" type="dashboard" userRole={props.userInfo.ref_id_role}/> : <MyTasksContainer title="Tarefas" type="dashboard" activeHours={props.activeHours} getActiveHours={props.getActiveHours} userRole={props.userInfo.ref_id_role}/> }
          </div>
          <div className="grid-widget mt15">
            <MyCalendarContainer title="Calendário" type="dashboard" meetings={props.meetings}/>
          </div>
          {props.userInfo.id_position === 2 ? null : 
            <div className="grid-widget mt15">
              <MyProjectsContainer title="Projetos" type="dashboard" userRole={props.userInfo.ref_id_role}/>
            </div>
          }
          <div className="grid-widget mt15">
            {props.userInfo.id_position === 1 ? <MyApprovalsContainer title="Aprovações" type="dashboard" />: <MyToDoContainer openModal={props.openModal} title="To-do List" type="dashboard" shouldTodosUpdate={props.shouldTodosUpdate} changeShouldTodosUpdate={props.changeShouldTodosUpdate}/>}
          </div>
        </div>
      </DashboardContainer>
    );
}