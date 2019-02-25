import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';

export const CreateMeeting = props => {

    if (props.redirect) {
        return <Redirect to='/' />;
    }
    
    return (
        <InsertFormDiv>
            
            {props.usersData.length > 0 ? 

            <div className="cards-container form-container">

                <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                <form onSubmit={props.type === 'edit' ? props.editMeeting : props.insertMeeting}>
                <div className="grid50-50 form-grid">

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Data</legend>
                                        <DatePicker onChange={props.changeDateInput} value={new Date(props.dateInput)} calendarIcon={<FiCalendar/>}/>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Hora Início</legend>
                                        <select onChange={props.changeStartHourInput} defaultValue={props.type === 'edit' ? props.startHourInput : '0'}>
                                            <option value="0" disabled>Selecionar</option>
                                            {props.hoursInterval.map(hour => {
                                                return <option key={hour} value={hour}>{hour}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                        </div>

                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Assunto</legend>
                                <input type="text" onChange={props.changeTopicInput} placeholder="Escrever" value={props.type === 'edit' ? props.topicInput : undefined}/>
                            </fieldset>
                        </div>

                    </div>

                    <div className="grid-item">

                        <div className="grid50-50 inner-grid">

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Hora Fim</legend>
                                        <select onChange={props.changeEndHourInput} defaultValue={props.type === 'edit' ? props.endHourInput : '0'}>
                                            <option value="0" disabled>Selecionar</option>
                                            {props.hoursInterval.map(hour => {
                                                return <option key={hour} value={hour}>{hour}</option>
                                            })}
                                        </select>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Cliente</legend>
                                        <select id="project-client" onChange={props.changeClientInput} defaultValue={props.type === 'edit' ? props.clientInput : '0'}>
                                            <option value="0" disabled>Selecionar</option>
                                            {props.clientsData.map(client => {
                                                return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
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
                                        <legend>Tipo</legend>
                                        <label className="radio-label-container">Interna
                                            <input type="radio" value="1" name="radio-place-type" onClick={props.changePlaceTypeInput} defaultChecked/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="radio-label-container">Externa
                                            {Number(props.placeTypeInput) === 2 ?
                                            <input type="radio" value="2" name="radio-place-type" onClick={props.changePlaceTypeInput} defaultChecked/>
                                            :
                                            <input type="radio" value="2" name="radio-place-type" onClick={props.changePlaceTypeInput}/>
                                            }
                                            <span className="checkmark"></span>
                                        </label>
                                    </fieldset>
                                </div>
                            </div>
                            
                            {Number(props.placeTypeInput) === 2 ?
                            <div className="innergrid-item">
                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Local</legend>
                                        <input type="text" onChange={props.changePlaceInput} placeholder="Escrever" value={props.type === 'edit' ? props.placeInput : undefined}/>
                                    </fieldset>
                                </div>
                            </div>
                            :
                            null
                            }
                        </div>

                    </div>

                </div>

                <div className="grid100">
                    <div className="input-wrapper">
                        <fieldset>
                            <legend>Pessoas</legend>
                            <div className="categories-card">
                                <div className="categories-grid users-grid">
                                    {props.usersData.map(user => {
                                        return (
                                            <div key={user.id_user}>
                                                <label className="label-container">{user.name_user}
                                                    {props.usersArr.indexOf(user.id_user.toString()) === -1 ?
                                                        <input type="checkbox" value={user.id_user} onClick={props.changeUsersArr} />
                                                    :
                                                        <input type="checkbox" value={user.id_user} onClick={props.changeUsersArr} defaultChecked/>
                                                    }    
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

                <div className="form-buttons">
                    <button type="button" className="btn secondary-btn">Cancelar</button>
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