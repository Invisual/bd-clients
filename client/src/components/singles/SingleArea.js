import React, {Component} from 'react'
import SingleUser from './SingleUser'
import {SingleAreaDiv} from '../../styles/singles'

class SingleArea extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAreaOpen: false
        }
    }

    toggleArea = () => this.setState(prevState => ({ isAreaOpen: !prevState.isAreaOpen }))

    render(){
        return (
            <SingleAreaDiv className="single-card single-card-area">
                <div className="single-area-title">
                    <h5>{this.props.areaTitle}</h5>
                    {this.state.isAreaOpen ? 
                        <div className="toggle-area-card" onClick={this.toggleArea}>&#8211;</div>
                    :
                        <div className="toggle-area-card" onClick={this.toggleArea}>+</div>
                    }
                </div>
                <div className={this.state.isAreaOpen ? 'area-users area-users-opened' : 'area-users area-users-closed'}>
                    {this.props.users.map(user => {
                        return <SingleUser
                                    key={user.id_user}
                                    id={user.id_user}
                                    name={user.name_user}
                                    avatar={user.avatar_user}
                                    position={user.name_position}
                                    tasksNumber={user.total_tasks}
                                    awaitingTasksNumber={user.total_awaiting_tasks}
                                    tasks={this.props.sortedTasks.filter(task => task.ref_id_user === user.id_user && task.ref_id_user_task_status !== 4).slice(0, 3)}
                                    allTasks={this.props.allTasks}
                                    completedTasks={this.props.sortedCompletedTasks.filter(task => task.ref_id_user === user.id_user && task.ref_id_user_task_status === 4).slice(0, 3)}
                                />
                    })}
                </div>
            </SingleAreaDiv>
        )
    }
}

export default SingleArea