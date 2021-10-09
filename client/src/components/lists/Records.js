import React from 'react'
import { AllClientsDiv } from '../../styles/listings'
import { MonthsList } from '../../components/tables/MonthsList'
import { RecordsDetail } from '../../components/details/RecordsDetail'
import { Redirect } from 'react-router-dom'

export const Records = props => {
  if (props.redirect) {
    return <Redirect to="/" />
  }

  return (
    <AllClientsDiv className="records-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow team-members-grid">
        <div className="grid-widget tasks-title"></div>
        <div className="grid-widget tasks-options">
          <h4 className="widget-title">Registos</h4>
        </div>
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MonthsList
              monthsList={props.monthsList}
              activeMonth={props.activeMonth}
              changeActiveMonth={props.changeActiveMonth}
              isLoading={props.isLoading}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <RecordsDetail
            records={props.records}
            activeMonth={props.activeMonth}
            monthsList={props.monthsList}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </AllClientsDiv>
  )
}
