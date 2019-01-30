import React from 'react';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import {DashboardContainer} from '../../styles/dashboard';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import MyToDoContainer from '../../containers/tables/MyToDoContainer';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

export const UserDashboard = (props) => {
    var myEvents = [
      {
        title: 'teste evento',
        start: '2019-02-02',
        end: '2019-02-02',
        allDay: true,
        resource: 2,
      }
    ]
    return (
      <DashboardContainer className="dashboard-container">
        <div className="widgets-grid">
          <div className="grid-widget"><MyTasksContainer title="As Minhas Tarefas"/></div>
          <div className="grid-widget"><BigCalendar
      localizer={localizer}
      events={myEvents}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(event, e) => console.log(event)}
    /></div>
          <div className="grid-widget"><MyProjectsContainer title="Projetos" /></div>
          <div className="grid-widget"><MyToDoContainer title="To-do List" /></div>
        </div>
      </DashboardContainer>
    );
}

