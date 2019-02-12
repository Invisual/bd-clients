import React from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css' 
import moment from 'moment'

export const MyCalendar = (props) => {
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
        <div className="mycalendar-container widget cards-container">
          <h4 className="widget-title">{props.title}</h4>
            <BigCalendar
                localizer={localizer}
                events={props.meetings}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event, e) => console.log(event)}
                views={['month']}
                formats={props.formats}
                dayPropGetter={props.customDayPropGetter}
                components={props.components}
            />
        </div>
    )
}
 