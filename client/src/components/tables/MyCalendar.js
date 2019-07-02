import React from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {CalendarDiv} from '../../styles/calendar';
import moment from 'moment'

export const MyCalendar = (props) => {
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
        <CalendarDiv className={props.type === 'dashboard' ? 'mycalendar-container widget cards-container dashboard-cards-container' : 'mycalendar-container widget cards-container'}>
          {props.title ? <h4 className="widget-title">{props.title}</h4> : null }
            <BigCalendar
                localizer={localizer}
                events={props.meetings}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                formats={props.formats}
                dayPropGetter={props.customDayPropGetter}
                components={props.components}
            />
        </CalendarDiv>
    )
}
 