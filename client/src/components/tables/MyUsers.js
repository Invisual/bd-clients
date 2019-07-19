import React from 'react'
import SingleUser from '../singles/SingleUser'
import SingleArea from '../singles/SingleArea'
import {Link} from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi';

export const MyUsers = props => {
    var sortedTasks = props.isLoading ? [] : props.data.tasks.length > 0 ? props.data.tasks.sort((a, b) => {
        return a.deadline_date_task<b.deadline_date_task ? -1 : a.deadline_date_task>b.deadline_date_task ? 1 : 0
    }) : []

    var sortedCompletedTasks = props.isLoading ? [] : props.data.tasks.length > 0 ? props.data.tasks.sort((a, b) => {
        return a.update_status_date<b.update_status_date ? -1 : a.update_status_date>b.update_status_date ? 1 : 0
    }) : []

    var designers = props.data.users ? props.data.users.filter(user => user.ref_id_position === 6) : []
    var webDevelopers = props.data.users ? props.data.users.filter(user => user.ref_id_position === 7) : []
    var accounts = props.data.users ? props.data.users.filter(user => user.ref_id_position === 2) : []
    var marketeers = props.data.users ? props.data.users.filter(user => user.ref_id_position === 5) : []
    var press = props.data.users ? props.data.users.filter(user => user.ref_id_position === 4) : []
    var multimedia = props.data.users ? props.data.users.filter(user => user.ref_id_position === 8) : []
    var producers = props.data.users ? props.data.users.filter(user => user.ref_id_position === 9) : []
    var interns = props.data.users ? props.data.users.filter(user => user.ref_id_position === 10) : []

    return (
        <div className="myusers-container widget cards-container dashboard-cards-container">
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
                    {designers.length > 0 ? <SingleArea users={designers} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Designers" /> : null }
                    {webDevelopers.length > 0 ? <SingleArea users={webDevelopers} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Web Developers" /> : null }
                    {accounts.length > 0 ? <SingleArea users={accounts} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Accounts" /> : null }
                    {marketeers.length > 0 ? <SingleArea users={marketeers} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Marketeers" /> : null }
                    {press.length > 0 ? <SingleArea users={press} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Copy" /> : null }
                    {multimedia.length > 0 ? <SingleArea users={multimedia} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Multimedia" /> : null }
                    {producers.length > 0 ? <SingleArea users={producers} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Producers" /> : null }
                    {interns.length > 0 ?<SingleArea users={interns} allTasks={props.data.tasks} sortedTasks={sortedTasks} sortedCompletedTasks={sortedCompletedTasks} areaTitle="Estagiários" /> : null }
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