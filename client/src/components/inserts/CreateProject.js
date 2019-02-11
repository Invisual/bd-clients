import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';


export const CreateProject = props => {

    if (props.redirect) {
        return <Redirect to='/' />;
    }

    return (
        <InsertFormDiv>

            <div className="cards-container form-container">

                <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>

                <div className="grid50-50 form-grid">

                    <div className="grid-item">
                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Nome do Projeto</legend>
                                <input type="text" id="project-title" onChange={props.changeTitleInput} placeholder="Nome" />
                            </fieldset>
                        </div>
                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Briefing</legend>
                                <textarea id="project-briefing" onChange={props.changeBriefingInput} placeholder="Escrever"></textarea>
                            </fieldset>
                        </div>
                    </div>

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">

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

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Account</legend>
                                        <select id="project-account" onChange={props.changeAccountInput} defaultValue="0">
                                            <option value="0" disabled>Selecionar</option>
                                            {props.accountsData.map(account => {
                                                return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                        </div>


                        <div className="grid50-50 inner-grid">

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Deadline</legend>
                                        <DatePicker id="project-deadline" onChange={props.changeDeadlineInput} value={props.deadlineInput} calendarIcon={<FiCalendar/>}/>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Faturação</legend>
                                        <select id="project-billing" onChange={props.changeBillingInput} defaultValue="0">
                                            <option value="0" disabled>Selecionar</option>
                                            {props.billingData.map(billing => {
                                                return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                        </div>


                        <div className="grid-100 inner-grid">
                            <div className="innergrid-item">
                                <div className="inputwrapper">
                                    <fieldset>
                                        <legend>Áreas</legend>
                                        <div className="categories-card">
                                            <div className="categories-grid">
                                                {props.categoriesData.map(category => {
                                                    return (
                                                        <div key={category.id_category}>
                                                            <label className="label-container">{category.name_category}
                                                                <input type="checkbox" value={category.id_category} onClick={props.changeCategoriesArr} />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <div className="form-buttons">
                    <button className="btn secondary-btn">Cancelar</button>
                    <button className="btn main-btn" onClick={props.insertProject}>Criar</button>
                </div>

            </div>

        </InsertFormDiv>
    );
}