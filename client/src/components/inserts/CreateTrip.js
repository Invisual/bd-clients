import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import {createBrowserHistory} from 'history'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';
const history = createBrowserHistory()

export const CreateTrip = props => {
    if (props.redirect) {
        return <Redirect to={`/trips`} />
    }
    return (
        <InsertFormDiv>

                <div className="cards-container form-container">

                    <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                    <form onSubmit={props.type === 'edit' ? props.editTrip : props.insertTrip}>

                    <div className="grid50-50 form-grid">

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Hora de Início</legend>
                                    <input required type="text" onChange={props.changeStartHourInput} value={props.startHourInput} placeholder="hh:mm"/>
                                </fieldset>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Hora de Fim</legend>
                                    <input required type="text" onChange={props.changeEndHourInput} value={props.endHourInput} placeholder="hh:mm"/>
                                </fieldset>
                            </div>
                        </div>

                    </div>


                    <div className="grid50-50 form-grid">

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Km Iniciais</legend>
                                    <input required type="text" onChange={props.changeStartKmsInput} value={props.startKmsInput} placeholder="Inserir números"/>
                                </fieldset>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Km Finais</legend>
                                    <input required type="text" onChange={props.changeEndKmsInput} value={props.endKmsInput} placeholder="Inserir números"/>
                                </fieldset>
                            </div>
                        </div>

                    </div>


                    <div className="grid50-50 form-grid">

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Data</legend>
                                    <DatePicker onChange={props.changeDateInput} format="y-MM-dd" locale="pt-PT" value={new Date(props.dateInput)} calendarIcon={<FiCalendar/>}/>
                                </fieldset>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Veículo</legend>
                                    <select required onChange={props.changeVehicleInput} defaultValue={props.type === 'edit' ? props.vehicleInput : ''}>
                                        <option value="" disabled>Selecionar</option>
                                        {props.vehiclesList.map(vehicle => {
                                            return <option key={vehicle.id_vehicle} value={vehicle.id_vehicle}>{vehicle.name_vehicle}</option>
                                        })}
                                    </select>
                                </fieldset>
                            </div>
                        </div>

                    </div>


                    <div className="grid100 form-grid">

                        <div className="grid-item">
                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Descrição</legend>
                                    <textarea required onChange={props.changeDescriptionInput} placeholder="Escrever" value={props.type === 'edit' ? props.descriptionInput : undefined}></textarea>
                                </fieldset>
                            </div>
                        </div>

                    </div>



                    <div className="form-buttons">
                        <button type="button" className="btn secondary-btn" onClick={() => history.goBack()}>Cancelar</button>
                        <button className="btn main-btn">Inserir</button>
                    </div>
                    </form>
                </div>

        </InsertFormDiv>
    );
}