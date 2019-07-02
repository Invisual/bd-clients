import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()

export const CreateBudget = props => {
    if (props.redirect) {
        switch(props.type) {
            case 'edit':
            return <Redirect to={`/budgets/${props.budgetData.id_budget}`} />
            case 'add':
            return <Redirect to={`/budgets/${props.lastInsertedId}`} />
            default:
            return <Redirect to={`/budgets`} />
        }
    }
    
    return (
        <InsertFormDiv>
            
            {props.accountsData.length > 0 ? 

            <div className="cards-container form-container">

                <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                <form onSubmit={props.type === 'edit' ? props.editBudget : props.insertBudget}>
                <div className="form-grid">

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Tipo de Cliente</legend>
                                        <select id="task-type" onChange={props.changeClientTypeInput} defaultValue={props.type === 'edit' ? props.clientTypeInput : '2'}>
                                
                                            <option value="1">Novo cliente</option>
                                            <option value="2">Cliente existente</option>

                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                                {props.clientTypeInput.toString() === '2' ?

                            <div className="innergrid-item">

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Cliente</legend>
                                        <select required id="project-client" onChange={props.changeClientInput} defaultValue={props.type === 'edit' ? props.clientInput : '0'}>
                                            <option value="0" disabled>Selecionar</option>
                                            {props.clientsData.map(client => {
                                                return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>

                            </div>
                                :
                            
                            <div className="innergrid-item">

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Novo Cliente</legend>
                                        <input type="text" id="task-title" onChange={props.changePotentialClientInput} placeholder="Nome do novo cliente" value={props.type === 'edit' ? props.potentialClientInput : undefined} required/>
                                    </fieldset>
                                </div>

                            </div>
                                }

                        </div>

                        <div className="grid50-50 inner-grid">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Nome</legend>
                                        <input type="text" id="task-title" onChange={props.changeTitleInput} placeholder="Nome" value={props.type === 'edit' ? props.titleInput : undefined} required/>
                                    </fieldset>
                                </div>

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Account</legend>
                                        <select id="task-account" onChange={props.changeAccountInput} defaultValue={props.type === 'edit' ? props.accountInput : '0'}>
                                            <option value="0" disabled>Selecionar</option>
                                            {props.accountsData.map(account => {
                                                return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                        </div>

                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Descrição</legend>
                                <textarea id="task-briefing" onChange={props.changeDescInput} placeholder="Escrever" value={props.type === 'edit' ? props.descInput : undefined}></textarea>
                            </fieldset>
                        </div>
                        </div>

                </div>

                <div className="form-buttons">
                    <button type="button" className="btn secondary-btn" onClick={() => history.goBack()}>Cancelar</button>
                    <button className="btn main-btn">{props.type === 'edit' ? 'Editar' : 'Criar'}</button>
                </div>
                </form>
            </div>

            :

            <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />

            }

        </InsertFormDiv>
    );
}