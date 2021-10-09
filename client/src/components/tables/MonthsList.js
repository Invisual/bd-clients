import React from 'react'
import { SingleMonth } from '../singles/SingleMonth'

export const MonthsList = props => {
  return (
    <div className="mytasks-container widget">
      {props.isLoading ? (
        <img src="img/loading.svg" alt="loading" className="loading-spinner" />
      ) : (
        <div>
          <h4 className="widget-title">{props.title}</h4>
          {props.monthsList.map(month => (
            <SingleMonth
              key={month.id}
              id={month.id}
              name={month.name}
              activeMonth={props.activeMonth}
              changeActiveMonth={props.changeActiveMonth}
            />
          ))}
        </div>
      )}
    </div>
  )
}
