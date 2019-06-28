import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const TeamMemberTasksTab = props => {
    console.log(props.memberContent)
  return (
    <div className="user-tasks-content">
        {props.memberContent.currentTasks.length === 0 ?
            <div className="no-tasks no-content">
                <div className="empty-placeholder">Este utilizador não tem Tarefas em curso.</div>
            </div>
        :
            <div className="user-tasks">
                {props.memberContent.currentTasks.map(task => {
                    return (
                        <Link to={`/tasks/${task.id_task}`} target="_blank" key={task.id_task}>
                            <div className="single-user-task">
                                <div className="single-task-title-client">
                                    <h4>{task.title_task}</h4>
                                    <h4 className="task-client">{task.name_client.charAt(0).toUpperCase()+task.name_client.slice(1).toLowerCase()}</h4>
                                </div>
                                <div className="single-task-hours">
                                    <span>{task.total_hours ? moment(task.total_hours, 'HH:mm').format('HH:mm')+'h' : 'sem horas'}</span>
                                </div>
                                <div className="single-task-deadline">
                                    {moment(task.deadline_date_task).isSameOrBefore(moment(new Date())) ? 
                                        <span className="red">{moment(task.deadline_date_task).format('DD MMM')}</span> 
                                    : 
                                        <span>{moment(task.deadline_date_task).format('DD MMM')}</span>
                                    }
                                </div>
                                <div className="single-task-status">
                                    <span>{task.name_user_task_status}</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        }
    </div>
  );
};
