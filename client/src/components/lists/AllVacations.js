import React from 'react';
import { AllProjectsDiv } from '../../styles/listings';
import MyVacationsContainer from '../../containers/tables/MyVacationsContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import MyVacationsCalendarContainer from '../../containers/tables/MyVacationsCalendarContainer';
import VacationsOnActiveDay from '../misc/VacationsOnActiveDay';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const AllVacations = props => {
  var novacations = [{id_vacation: 1, start_date: '2010-06-01', end_date: '2010-06-01'}]
  return (
    <AllProjectsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow meetings-grid">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Férias</h4>
          <div className="grid-widget left-options">
          {props.userRole === 3 || props.userRole === 2 ? (
            <div className="tooltip-container">
              <Link to="/createvacations">
                <FiPlusSquare />
                <span className="tooltip">Pedir Férias</span>
              </Link>
            </div>
          )
            : null }
            </div>
        </div>
          <OptionsContainer
          userRole={props.userRole}
          isLoading={props.isLoading}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyVacationsContainer
              type="allvacations"
              title={props.title}
              vacations={props.vacations}
              isLoading={props.isLoading}
              deleteVacation={props.deleteVacation}
              userRole={props.userRole}
            />
          </div>
        </div>
        <div className="grid-widget meetings-calendar">
          <MyVacationsCalendarContainer 
            type="allvacations"
            title={props.title}
            changeActiveDay={props.changeActiveDay}
            vacations={props.vacations ? props.vacations : novacations}
          />
          <VacationsOnActiveDay 
            activeDay={props.activeDay}
            vacations={props.vacations}
            isLoading={props.isLoading}
            userRole={props.userRole}
          />
        </div>
      </div>
    </AllProjectsDiv>
  );
};
