import React from 'react'
import SingleUser from '../singles/SingleUser'
import {Link} from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi';

export const MyUsers = props => {

    var sortedTasks = props.isLoading ? [] : props.data.tasks.length > 0 ? props.data.tasks.sort((a, b) => {
        return a.deadline_date_task<b.deadline_date_task ? -1 : a.deadline_date_task>b.deadline_date_task ? 1 : 0
    }) : []

    var sortedCompletedTasks = props.isLoading ? [] : props.data.tasks.length > 0 ? props.data.tasks.sort((a, b) => {
        return a.update_status_date<b.update_status_date ? -1 : a.update_status_date>b.update_status_date ? 1 : 0
    }) : []

    return (
        <div className="myusers-container widget cards-container">
            {props.isLoading ? 
                <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
            :
                <div>
                    <h4 className="widget-title">{props.title}</h4>
                    <div className="user-labels">
                        <span></span>
                        <span></span>
                        <span>Tarefas</span>
                        <span>Completas</span>
                        <span></span>
                    </div>
                    {props.data.users.map(user => {
                        return <SingleUser
                                    key={user.id_user}
                                    id={user.id_user}
                                    name={user.name_user}
                                    avatar={user.avatar_user}
                                    position={user.name_position}
                                    tasksNumber={user.total_tasks}
                                    awaitingTasksNumber={user.total_awaiting_tasks}
                                    tasks={sortedTasks.filter(task => task.ref_id_user === user.id_user && task.ref_id_user_task_status !== 4).slice(0, 3)}
                                    allTasks={props.data.tasks}
                                    completedTasks={sortedCompletedTasks.filter(task => task.ref_id_user === user.id_user && task.ref_id_user_task_status === 4).slice(0, 3)}
                                />
                    })}
                    <Link to="/team">
                        <div className="see-all">
                            Ver todos{' '}
                            <span className="arrow"><FiArrowRight color="#0031e6" /></span>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}