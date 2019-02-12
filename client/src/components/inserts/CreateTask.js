import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';

export const CreateTask = props => {

    if (props.redirect) {
        return <Redirect to='/' />;
    }
    
    var projectsFromActiveClient = props.projectsData.filter(project => {
        return project.ref_id_client === Number(props.clientInput)
    }) 

    return (
        <InsertFormDiv>

            <div className="cards-container form-container">

                <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                <form onSubmit={props.insertTask}>
                <div className="grid50-50 form-grid">

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Tipo</legend>
                                        <select id="task-type" onChange={props.changeTypeInput} defaultValue="1">
                                            {props.typesData.map(type => {
                                                return <option key={type.id_task_type} value={type.id_task_type}>{type.name_task_types}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Cliente</legend>
                                        <select id="project-client" onChange={props.changeClientInput} defaultValue="0">
                                            <option value="0" disabled>Selecionar</option>
                                            {props.clientsData.map(client => {
                                                return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                        </div>

                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Nome</legend>
                                <input type="text" id="task-title" onChange={props.changeTitleInput} placeholder="Nome" />
                            </fieldset>
                        </div>

                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Descrição</legend>
                                <textarea id="task-briefing" onChange={props.changeDescInput} placeholder="Escrever"></textarea>
                            </fieldset>
                        </div>


                    </div>

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    {props.typeInput === '1' ?
                                        <fieldset>
                                            <legend>Projeto</legend>
                                            <select id="task-project" onChange={props.changeProjectInput} defaultValue="0">
                                                <option value="0" disabled>Selecione</option>
                                                {projectsFromActiveClient.map(project => {
                                                    return <option key={project.id_project} value={project.id_project}>{project.title_project}</option>
                                                })}
                                            </select>
                                        </fieldset>    
                                    :
                                        <fieldset>
                                            <legend>Faturação</legend>
                                            <select id="project-billing" onChange={props.changeBillingInput} defaultValue="0">
                                                <option value="0" disabled>Selecionar</option>
                                                {props.billingData.map(billing => {
                                                    return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
                                                })}
                                            </select>
                                        </fieldset> 
                                    }
                                </div>
                            </div>

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Deadline</legend>
                                        <DatePicker id="task-deadline" onChange={props.changeDeadlineInput} value={props.deadlineInput} calendarIcon={<FiCalendar/>}/>
                                    </fieldset>
                                </div>
                            </div>

                        </div>


                        <div className="grid50-50 inner-grid">
                                    
                            {props.typeInput === '1' ?
                                null
                            :
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Account</legend>
                                        <select id="task-account" onChange={props.changeAccountInput} defaultValue="0">
                                            <option value="0" disabled>Selecionar</option>
                                            {props.accountsData.map(account => {
                                                return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            }
                            
                            {props.typeInput === '3' ?
                                null
                            :
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Pessoa</legend>
                                        <select id="task-user" onChange={props.changePersonInput} defaultValue="0">
                                            <option value="0" disabled>Selecionar</option>
                                            {props.usersData.map(user => {
                                                return <option key={user.id_user} value={user.id_user}>{user.name_user}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            }
                            
                        </div>

                    </div>

                </div>

                <div className="form-buttons">
                    <button type="button" className="btn secondary-btn">Cancelar</button>
                    <button className="btn main-btn" onClick={props.insertProject}>Criar</button>
                </div>
                </form>
            </div>

        </InsertFormDiv>
    );
}