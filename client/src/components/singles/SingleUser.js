import React, {Component} from 'react'
import {SingleUserDiv} from '../../styles/singles'
import { FiChevronDown, FiArrowRight } from 'react-icons/fi'
import {Link} from 'react-router-dom'
import moment from 'moment'

class SingleUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            isCardOpen: false
        }
    }

    toggleCard = () => this.setState(prevState => ({ isCardOpen: !prevState.isCardOpen }))

    render(){
        return (
            <SingleUserDiv className="single-card single-card-user">
                <div className={this.state.isCardOpen ? 'limit-width active' : 'limit-width'}>
                    <div className="single-card-grid">
                        <div className="user-avatar flex">
                            <img src={this.props.avatar} alt={this.props.name} title={this.props.name} />
                        </div>
                        <div className="user-name-position flex">
                            <h3>{this.props.name}</h3>
                            <h4>{this.props.position}</h4>
                        </div>
                        <div className="user-tasks flex">
                            <span>{this.props.tasksNumber}</span>
                        </div>
                        <div className="user-completed-tasks flex">
                            <span>{this.props.awaitingTasksNumber}</span>
                        </div>
                        <div className="card-arrow flex">
                            <FiChevronDown className={this.state.isCardOpen ? 'see-tasks-arrow up' : 'see-tasks-arrow down'} onClick={this.toggleCard}/>
                        </div>
                    </div>
                </div>

                <div className={this.state.isCardOpen ? 'user-tasks-info tasks-info-opened' : 'user-tasks-info tasks-info-closed'}>

                    <h2>Tarefas</h2>
                    <hr />
                    <div className="user-tasks">
                        {this.props.tasks.length > 0 ?
                            this.props.tasks.map(task => {
                                return (
                                    <div key={task.id_task} className="single-user-task">
                                        <div className="single-task-title-client">
                                            <h4>{task.title_task}</h4>
                                            <h5>{task.name_client}</h5>
                                        </div>
                                        <div className="single-task-hours">
                                            <span>{task.total_hours ? moment(task.total_hours, 'HH:mm').format('HH:mm') : 'sem horas'}</span>
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
                                )
                            })
                        :
                            <p className="no-tasks-placeholder">Este utilizador não tem Tarefas de momento.</p>
                        }
                    </div>

                    <h2>Tarefas Completas</h2>
                    <hr />
                    <div className="user-tasks">
                        {this.props.tasks.length > 0 ?
                            this.props.completedTasks.map(task => {
                                return (
                                    <div key={task.id_task} className="single-user-task">
                                        <div className="single-task-title-client">
                                            <h4>{task.title_task}</h4>
                                            <h5>{task.name_client}</h5>
                                        </div>
                                        <div className="single-task-hours">
                                            <span>{task.total_hours ? moment(task.total_hours, 'HH:mm').format('HH:mm') : 'sem horas'}</span>
                                        </div>
                                        <div className="single-task-deadline">
                                            {moment(task.deadline_date_task).isSameOrBefore(moment(new Date())) ? 
                                                <span className="red">{moment(task.deadline_date_task).format('DD MMM')}</span> 
                                            : 
                                                <span>{moment(task.deadline_date_task).format('DD MMM')}</span>
                                            }
                                        </div>
                                        <div className="single-task-approval-time">
                                            {moment(new Date()).diff(moment(task.update_status_date), 'days') === 0 ?
                                                <span>hoje</span>
                                            :
                                                moment(new Date()).diff(moment(task.update_status_date), 'days') === 1 ?
                                                    <span>há {moment(new Date()).diff(moment(task.update_status_date), 'days')} dia</span>
                                                :
                                                    <span>há {moment(new Date()).diff(moment(task.update_status_date), 'days')} dias</span>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        :
                            <p className="no-tasks-placeholder">Este utilizador não tem Tarefas Completas de momento.</p>
                        }
                    </div>

                    <Link to={`/team/${this.props.id}`}>
                        <div className="see-all-tasks">
                            Ver todas{' '}
                            <span className="arrow"><FiArrowRight color="#0031e6" /></span>
                        </div>
                    </Link>

                </div>

            </SingleUserDiv>
        )
    }
}

export default SingleUser