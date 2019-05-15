import React from 'react'
import { FiUser, FiClock, FiFileText, FiCheck } from 'react-icons/fi'
import moment from 'moment'
import 'moment/locale/pt';

export const TeamMemberHistoryTab = props => {
    console.log(props.memberContent)
    return (
        <div className="member-history-tab">

                {props.memberContent.projects.map(project => {
                    return (
                        <div className="single-member-project single-card" key={project.id_project}>
                            <h2>{project.title_project}</h2>
                            <div className="project-client"><FiUser /><h3>{project.name_client}</h3></div>
                            <div className="project-hours">
                                <FiClock />
                                <h6>{project.total_project_hours === null ? '0' : moment(project.total_project_hours, 'HHmmss').format('HH:mm')}</h6>
                            </div>
                            {props.memberContent.tasks.filter(task => Number(task.ref_id_project) === Number(project.id_project))
                                .map(task => {
                                   return <div className="project-single-task" key={task.id_task}>
                                        <FiFileText/>
                                        <h4>{task.title_task}</h4>
                                        <div className="single-task-hours">
                                            <FiClock />
                                            <span>{moment(task.total_task_hours, 'HHmmss').format('HH:mm')}</span>
                                        </div>
                                        {Number(task.ref_id_user_task_status) === 4 ? <FiCheck className="single-task-check"/> : null}
                                    </div>
                                })
                            }
                        </div>
                        )
                })}
            
        </div>
    )
}