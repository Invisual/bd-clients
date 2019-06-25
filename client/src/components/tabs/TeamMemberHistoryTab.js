import React from 'react'
import { FiUser, FiClock, FiFileText, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/pt';

export const TeamMemberHistoryTab = props => {
    var filterByClient = task => {
        return props.filters.client === '' ? true : Number(task.ref_id_client) === Number(props.filters.client)
    }
    var projetos = props.memberContent.projects.filter(filterByClient)
    var tarefasDiarias = props.memberContent.tasks.filter(task => Number(task.ref_id_type_task) === 2).filter(filterByClient)
    var tarefasExternas = props.memberContent.tasks.filter(task => Number(task.ref_id_type_task) === 3).filter(filterByClient)
    var tarefasIsoladas = props.memberContent.tasks.filter(task => Number(task.ref_id_type_task) === 4).filter(filterByClient)
    return (
        <div className="member-history-tab">

                {projetos.map(project => {
                    return (
                        <div className="single-member-project single-card card-project" key={project.id_project}>
                            <Link to={'/projects/'+project.id_project}><h2>{project.title_project}</h2></Link>
                            <div className="project-client"><FiUser /><Link to={'/clients/'+project.ref_id_client}><h3>{project.name_client}</h3></Link></div>
                            <div className="project-hours">
                                <FiClock />
                                <h6>{project.total_project_hours === null ? '0' : moment(project.total_project_hours, 'HHmmss').format('HH:mm')}</h6>
                            </div>
                            {props.memberContent.tasks.filter(task => Number(task.ref_id_project) === Number(project.id_project))
                                .map(task => {
                                   return <>
                                            <div className="project-single-task" key={task.id_task}>
                                                <FiFileText/>
                                                <Link to={'/tasks/'+task.id_task}><h4>{task.title_task}</h4></Link>
                                                <div className="single-task-hours">
                                                    <FiClock />
                                                    <span>{moment(task.total_task_hours, 'HHmmss').format('HH:mm')}</span>
                                                </div>
                                                {Number(task.ref_id_user_task_status) === 4 ? <FiCheck className="single-task-check"/> : null}
                                            </div>
                                            <div className="task-hour-records">
                                            {props.memberContent.hours.filter(hour=> Number(hour.id_task)===Number(task.id_task)).map(hour => {

                                                return <span key={hour.id_task_hour}><b>{moment(hour.day).format('DD MMM')}:</b> {moment(hour.beginning_hour, 'HHmmss').format('HH:mm')} - {moment(hour.ending_hour, 'HHmmss').format('HH:mm')}</span>
                        
                                                })}
                                            </div>
                                         </>
                                })
                            }
                        </div>
                        )
                })}



                {tarefasDiarias.length > 0 ?
                    <div className="single-member-project single-card card-diaria">
                        <h2>Tarefas Diárias</h2>
                        {
                            tarefasDiarias.map(task => {
                                return <>
                                        <div className="project-single-task" key={task.id_task}>
                                            <FiFileText/>
                                            <Link to={'/tasks/'+task.id_task}><h4>{task.title_task}</h4></Link>
                                            <Link to={'/clients/'+task.ref_id_client}><h5>{task.name_client}</h5></Link>
                                            <div className="single-task-hours">
                                                <FiClock />
                                                <span>{moment(task.total_task_hours, 'HHmmss').format('HH:mm')}</span>
                                            </div>
                                            {Number(task.ref_id_user_task_status) === 4 ? <FiCheck className="single-task-check"/> : null}
                                        </div>
                                        <div className="task-hour-records">
                                        {props.memberContent.hours.filter(hour=> Number(hour.id_task)===Number(task.id_task)).map(hour => {

                                             return <span key={hour.id_task_hour}><b>{moment(hour.day).format('DD MMM')}:</b> {moment(hour.beginning_hour, 'HHmmss').format('HH:mm')} - {moment(hour.ending_hour, 'HHmmss').format('HH:mm')}</span>
                    
                                            })}
                                        </div>
                                       </>
                            })
                        }
                    </div>
                :
                    null    
                }



                {tarefasExternas.length > 0 ?
                    <div className="single-member-project single-card card-externa">
                        <h2>Tarefas Externas</h2>
                        {
                            tarefasExternas.map(task => {
                                return <>
                                         <div className="project-single-task" key={task.id_task}>
                                             <FiFileText/>
                                             <Link to={'/tasks/'+task.id_task}><h4>{task.title_task}</h4></Link>
                                             <Link to={'/clients/'+task.ref_id_client}><h5>{task.name_client}</h5></Link>
                                             <div className="single-task-hours">
                                                 <FiClock />
                                                 <span>{moment(task.total_task_hours, 'HHmmss').format('HH:mm')}</span>
                                             </div>
                                             {Number(task.ref_id_user_task_status) === 4 ? <FiCheck className="single-task-check"/> : null}
                                         </div>
                                         <div className="task-hour-records">
                                         {props.memberContent.hours.filter(hour=> Number(hour.id_task)===Number(task.id_task)).map(hour => {

                                             return <span key={hour.id_task_hour}><b>{moment(hour.day).format('DD MMM')}:</b> {moment(hour.beginning_hour, 'HHmmss').format('HH:mm')} - {moment(hour.ending_hour, 'HHmmss').format('HH:mm')}</span>
                        
                                             })}
                                         </div>
                                       </>
                            })
                        }
                    </div>
                :
                    null    
                }



                {tarefasIsoladas.length > 0 ?
                    <div className="single-member-project single-card card-isolada">
                        <h2>Tarefas Isoladas</h2>
                        {
                            tarefasIsoladas.map(task => {
                                return <>
                                         <div className="project-single-task" key={task.id_task}>
                                             <FiFileText/>
                                             <Link to={'/tasks/'+task.id_task}><h4>{task.title_task}</h4></Link>
                                             <Link to={'/clients/'+task.ref_id_client}><h5>{task.name_client}</h5></Link>
                                             <div className="single-task-hours">
                                                 <FiClock />
                                                 <span>{moment(task.total_task_hours, 'HHmmss').format('HH:mm')}</span>
                                             </div>
                                             {Number(task.ref_id_user_task_status) === 4 ? <FiCheck className="single-task-check"/> : null}
                                         </div>
                                         <div className="task-hour-records">
                                         {props.memberContent.hours.filter(hour=> Number(hour.id_task)===Number(task.id_task)).map(hour => {

                                             return <span key={hour.id_task_hour}><b>{moment(hour.day).format('DD MMM')}:</b> {moment(hour.beginning_hour, 'HHmmss').format('HH:mm')} - {moment(hour.ending_hour, 'HHmmss').format('HH:mm')}</span>
                        
                                             })}
                                         </div>
                                       </>
                            })
                        }
                    </div>
                :
                    null    
                }



        </div>
    )
}