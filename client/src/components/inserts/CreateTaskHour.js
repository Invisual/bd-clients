import React from 'react'
import { FiX } from 'react-icons/fi';
import { HoursModalDiv } from '../../styles/modals'
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-date-picker'

export const CreateTaskHour = props => {
    return (
        <HoursModalDiv className="cards-container create-hour-modal modal">
            <div className="todo-close"><FiX onClick={() => props.closeModal('hours')}/></div>
            {props.isLoading ?
                <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
            :
                <div className="todo-content">
                    <h4 className="widget-title">{props.type === 'edit' ? 'Editar Registo de Horas' : 'Inserir Registo de Horas'}</h4>
                    <form onSubmit={props.type === 'add' ? props.insertTaskHour : props.editTaskHour}>

                        <div className="hours-form-row">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Pessoa</legend>
                                    <select value={props.userInput} onChange={props.changeUserInput}>
                                        <option value="0" disabled>Selecionar</option>
                                        {props.usersData.map(user => {
                                            return <option key={user.id_user} value={user.id_user}>{user.name_user}</option>
                                        })}
                                    </select>
                                </fieldset>
                            </div>

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Tarefa</legend>
                                    <select required value={props.taskInput} onChange={props.changeTaskInput}>
                                        {props.tasksData.length > 0 ? 
                                            <><option value="0" disabled>Selecionar</option>
                                            {props.tasksData.map(task => {
                                                return <option key={task.id_task} value={task.id_task}>{task.title_task} - {task.name_client}</option>
                                            })}</>
                                        :
                                            <option value="0" disabled>Esta pessoa não tem Tarefas</option>
                                        }
                                    </select>
                                </fieldset>
                            </div>

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Hora Início</legend>
                                    <input required type="text" placeholder="hh:mm" onChange={props.changeBeginningHourInput} value={props.beginningHourInput}/>
                                </fieldset>
                            </div>

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Hora Fim</legend>
                                    <input required type="text" placeholder="hh:mm" onChange={props.changeEndingHourInput} value={props.endingHourInput}/>
                                </fieldset>
                            </div>

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Dia</legend>
                                    <DatePicker onChange={props.changeDayInput} format="y-MM-dd" locale="pt-PT" value={new Date(props.dayInput)} calendarIcon={<FiCalendar/>}/>
                                </fieldset>
                            </div>

                        </div>

                        <div className="hours-form-buttons form-buttons">
                            <button type="button" className="btn secondary-btn" onClick={() => props.closeModal('hours')}>Cancelar</button>
                            <button className="btn main-btn">{props.type === 'edit' ? 'Editar' : 'Inserir'}</button>
                        </div>

                    </form>
                </div>
            }
        </HoursModalDiv>
    )
}