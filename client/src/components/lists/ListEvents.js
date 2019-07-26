import React from 'react'
import { ListEventsDiv } from '../../styles/listings'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const ListEvents = props => {
    return(
        <ListEventsDiv className="accounts-events">
            {props.isLoading ?
                <img src="img/loading.svg" alt="loading" className="loading-spinner" />
            :
                <>
                    <p className="events-date">{moment(props.activeDay).format('D MMM YYYY')}</p>
                    <div className="events-container">
                        {props.tasks.length > 0 || props.meetings.length > 0 ?
                        <>
                            {props.tasks.length > 0 ?
                                props.tasks.map(task => (
                                    <Link to={`/tasks/${task.id_task}`} key={task.id_task}>
                                        <div className="single-event task-event">
                                            <div className="type-client">
                                                <span>Deadline</span>
                                                <h5>{task.name_client}</h5>
                                            </div>
                                            <h3>{task.title_task}</h3>
                                            <img src={task.avatar_user} alt={task.name_user} title={task.name_user} />
                                        </div>
                                    </Link>
                                ))
                            :
                                null
                            }
                        
                            {props.meetings.length > 0 ?
                                props.meetings.map(meeting => {

                                    var meetingUsers = meeting.intervenientes ? meeting.intervenientes
                                    .split(';')
                                    .map(e => e.split(','))
                                    .map(avatar => {
                                        return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} title={avatar[1]} />
                                    }): null

                                    return (
                                        <div className="single-event meeting-event" key={meeting.id_meeting}>
                                            <div className="type-client">
                                                <span className="is-meeting">{meeting.start_hour_meeting} - {meeting.end_hour_meeting}</span>
                                                <h5>{meeting.name_client}</h5>
                                                <h5 className="place">{meeting.place_meeting}</h5>
                                            </div>
                                            <h3>{meeting.title}</h3>
                                            <div className="meeting-users">{meetingUsers}</div>
                                        </div>
                                        )
                                })
                            : 
                                null
                            }
                        
                        </>      
                        :
                            <div className="no-data"> Não existem eventos neste dia.</div>
                        }
                    </div>
                </>
            }
        </ListEventsDiv>
    )
}