import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import {createBrowserHistory} from 'history'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';
const history = createBrowserHistory()

export const CreateVacation = props => {
    if (props.redirect) {
        return <Redirect to={`/team`} />
    }
    return (
        <InsertFormDiv>

                <div className="cards-container form-container">

                    <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                    <form onSubmit={props.insertVacation}>

                    <div className="grid50-50 form-grid">

                        <div className="grid-item">

                                    <div className="input-wrapper">
                                        <fieldset>
                                            <legend>Tipo</legend>
                                            <div className="input-radio-container">
                                                <label className="label-container">
                                                    <span className={Number(props.typeInput) === 1 ? 'checkradio checked' : 'checkradio'}></span>
                                                    <input type="radio" name="vacation-type" onChange={props.changeTypeInput} value="1" defaultChecked={Number(props.typeInput) === 1 ? true : false}/>
                                                    <span className="label-span">Dia</span>
                                                </label>
                                                <label className="label-container">
                                                    <span className={Number(props.typeInput) === 2 ? 'checkradio checked' : 'checkradio'}></span>
                                                    <input type="radio" name="vacation-type" onChange={props.changeTypeInput} value="2" defaultChecked={Number(props.typeInput) === 2 ? true : false}/>
                                                    <span className="label-span">Período de Dias</span>
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>

                        </div>

                        <div className="grid-item">

                            {Number(props.typeInput) === 1 ?

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Período de Tempo</legend>
                                        <select onChange={props.changeDayTypeInput} defaultValue={''}>
                                            <option value="" disabled>Selecionar</option>
                                            <option value="1">Dia Todo</option>
                                            <option value="2">Manhã</option>
                                            <option value="3">Tarde</option>
                                        </select>
                                    </fieldset>
                                </div>
                            :
                                null
                            }

                        </div>

                    </div>


                    <div className="grid50-50 form-grid mt15">

                        <div className="grid-item">

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>{Number(props.typeInput) === 1 ? 'Data' : 'Data de Início' }</legend>
                                        <DatePicker onChange={props.changeStartDateInput} format="y-MM-dd" locale="pt-PT" value={props.startDateInput} calendarIcon={<FiCalendar/>}/>
                                    </fieldset>
                                </div>

                        </div>

                        <div className="grid-item">

                            {Number(props.typeInput) === 2 ?

                                <div className="input-wrapper">
                                    <fieldset>
                                        <legend>Data de Fim</legend>
                                        <DatePicker onChange={props.changeEndDateInput} format="y-MM-dd" locale="pt-PT" value={props.endDateInput} calendarIcon={<FiCalendar/>}/>
                                    </fieldset>
                                </div>

                            :
                                null
                            }

                        </div>

                    </div>


                    <div className="form-buttons">
                        <button type="button" className="btn secondary-btn" onClick={() => history.goBack()}>Cancelar</button>
                        <button className="btn main-btn">Pedir</button>
                    </div>
                    </form>
                </div>

        </InsertFormDiv>
    );
}