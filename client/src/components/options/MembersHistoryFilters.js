import React, {Component} from 'react';
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';
import {FiltersDiv} from '../../styles/filters'

class MembersHistoryFilters extends Component{
    constructor(props){
        super(props)
        this.state = {
            historyClientFilter: this.props.filters.client,
            historyStartDateFilter: this.props.filters.startDate,
            historyEndDateFilter: this.props.filters.endDate,
            historyIsStartDateSet: this.props.filters.isStartDateSet,
            historyIsEndDateSet: this.props.filters.isEndDateSet
        }
    }

    changeHistoryClientFilter = e => this.setState({historyClientFilter: e.target.value})
    changeHistoryStartDateFilter = val => this.setState({historyStartDateFilter: val, historyIsStartDateSet: true})
    changeHistoryEndDateFilter = val => this.setState({historyEndDateFilter: val, historyIsEndDateSet: true})

    setFilters = () => {
        var filters = {
            client: this.state.historyClientFilter,
            startDate: this.state.historyStartDateFilter,
            endDate: this.state.historyEndDateFilter,
            isStartDateSet: this.state.historyIsStartDateSet,
            isEndDateSet: this.state.historyIsEndDateSet
        }
        this.props.changeFilters(filters)
        this.props.changeFiltersAreActive()
    }

    removeFilters = () => {
        var filters = {
            client: '',
            startDate: new Date().setMonth(new Date().getMonth()-1),
            endDate: new Date(),
            isStartDateSet: false,
            isEndDateSet: false
        }
        this.setState({historyClientFilter: '', historyStartDateFilter: new Date().setMonth(new Date().getMonth()-1), historyEndDateFilter: new Date(), historyIsStartDateSet: false, historyIsEndDateSet: false})
        this.props.changeFilters(filters)
        this.props.changeFiltersAreActive();
    }

    render(){
        console.log(this.props.filters.startDate)
        return (
            <FiltersDiv className="members-history-filters options-filters">

                <div className="filters-grid grid50-50">

                    <div className="startdate-filter single-filter-container">
                        <fieldset>
                            <legend>Data de Início</legend>
                            <DatePicker id="history-startdate" onChange={this.changeHistoryStartDateFilter} value={new Date(this.state.historyStartDateFilter)} calendarIcon={<FiCalendar/>}/>
                        </fieldset>
                    </div>

                    <div className="startdate-filter single-filter-container">
                        <fieldset>
                            <legend>Data de Fim</legend>
                            <DatePicker id="history-enddate" onChange={this.changeHistoryEndDateFilter} value={new Date(this.state.historyEndDateFilter)} calendarIcon={<FiCalendar/>}/>
                        </fieldset>
                    </div>
                    
                </div>

                <div className="filters-grid grid50-50">

                    <div className="client-filter single-filter-container">
                        <fieldset>
                        <legend>Clientes</legend>
                        <select onChange={this.changeHistoryClientFilter} defaultValue={this.state.historyClientFilter}>
                            <option value="">Escolha</option>
                            {this.props.clientsList.map(client => {
                                return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                            })}
                        </select>
                        </fieldset>
                    </div>

                </div>

                <div className="filters-buttons">
                    <button className="btn secondary-btn" onClick={this.removeFilters}>Limpar</button>
                    <button className="btn main-btn" onClick={this.setFilters}>Filtrar</button>
                </div>

            </FiltersDiv>
        )
    }
}

export default MembersHistoryFilters