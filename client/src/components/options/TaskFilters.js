import React, {Component} from 'react';
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';
import {FiltersDiv} from '../../styles/filters'

class TaskFilters extends Component{

constructor(props){
  super(props);
  this.state = {
    taskClientFilter: this.props.filters.client,
    taskBillingFilter: this.props.filters.billing,
    taskUserFilter: this.props.filters.user,
    taskTypeFilter: this.props.filters.type,
    taskStatusFilter: this.props.filters.status,
    taskProjectFilter: this.props.filters.project,
    taskDeadlineFilter: this.props.filters.deadline,
    taskIsDeadlineSet: this.props.filters.isDeadlineSet,
    taskDateFilter: this.props.filters.date
  }
}

changeTaskClientFilter = e => this.setState({taskClientFilter: e.target.value})
changeTaskBillingFilter = e => this.setState({taskBillingFilter: e.target.value})
changeTaskUserFilter = e => this.setState({taskUserFilter: e.target.value})
changeTaskTypeFilter = e => this.setState({taskTypeFilter: e.target.value})
changeTaskStatusFilter = e => this.setState({taskStatusFilter: e.target.value})
changeTaskProjectFilter = e => this.setState({taskProjectFilter: e.target.value})
changeTaskDeadlineFilter = val => this.setState({taskDeadlineFilter: val, taskIsDeadlineSet: true})
changeTaskDateFilter = e => this.setState({taskDateFilter: e.target.value})

setFilters = () => {
  var filters = {
    client: this.state.taskClientFilter,
    billing: this.state.taskBillingFilter,
    user: this.state.taskUserFilter,
    status: this.state.taskStatusFilter,
    project: this.state.taskProjectFilter,
    deadline: this.state.taskDeadlineFilter,
    isDeadlineSet: this.state.taskIsDeadlineSet,
    type: this.state.taskTypeFilter,
    date: this.state.taskDateFilter
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive()
}

removeFilters = () => {
  var filters = {
    client: '',
    billing: '',
    user: '',
    status: '',
    project: '',
    deadline: new Date(),
    isDeadlineSet: false,
    type: '',
    date: '',
  }
  this.setState({taskClientFilter: '', taskBillingFilter: '', taskUserFilter: '', taskStatusFilter: '', taskProjectFilter: '', taskDeadlineFilter: new Date(), taskIsDeadlineSet:false, taskTypeFilter: '', taskDateFilter: ''})
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
  this.props.changePlaceholder()
}

render(){

  var projectsList;
    if(this.state.taskClientFilter === ''){
      projectsList = this.props.projectsList
    }
    else{
      projectsList = this.props.projectsList.filter(project => Number(project.ref_id_client) === Number(this.state.taskClientFilter))
    }

    const months = [
      {val: '01', name: 'Janeiro'}, {val: '02', name: 'Fevereiro'}, {val: '03', name: 'Março'}, {val: '04', name: 'Abril'}, {val: '05', name: 'Maio'}, {val: '06', name: 'Junho'},
      {val: '07', name: 'Julho'}, {val: '08', name: 'Agosto'}, {val: '09', name: 'Setembro'}, {val: '10', name: 'Outubro'}, {val: '11', name: 'Novembro'}, {val: '12', name: 'Dezembro'},
    ]
    
    return (
      <FiltersDiv className="task-filters options-filters">

        <div className="filters-grid grid50-50">
        
          <div className="client-filter single-filter-container">
            <fieldset>
              <legend>Clientes</legend>
              <select onChange={this.changeTaskClientFilter} defaultValue={this.state.taskClientFilter}>
                  <option value="">Escolha</option>
                  {this.props.clientsList.map(client => {
                      return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="project-filter single-filter-container">
            <fieldset>
              <legend>Projeto</legend>
              <select onChange={this.changeTaskProjectFilter} defaultValue={this.state.taskProjectFilter}>
                  <option value="">Escolha</option>
                  {projectsList.map(project => {
                    return <option key={project.id_project} value={project.id_project}>{project.title_project}</option>
                  })}
              </select>
            </fieldset>
          </div>

        </div>


        <div className="filters-grid grid50-50">
        
          <div className="type-filter single-filter-container">
            <fieldset>
              <legend>Tipo</legend>
              <select onChange={this.changeTaskTypeFilter} defaultValue={this.state.taskTypeFilter}>
                  <option value="">Escolha</option>
                  {this.props.taskTypesList.map(type => {
                    return <option key={type.id_task_type} value={type.id_task_type}>{type.name_task_types}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="billing-filter single-filter-container">
          <fieldset>
            <legend>Modo de Faturação</legend>
            <select onChange={this.changeTaskBillingFilter} defaultValue={this.state.taskBillingFilter}>
                <option value="">Escolha</option>
                {this.props.billingList.map(billing => {
                  return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
                })}
            </select>
          </fieldset>
          </div>

        </div>


        <div className="filters-grid grid50-50">
        
          <div className="user-filter single-filter-container">
            <fieldset>
            <legend>Colaborador</legend>
              <select onChange={this.changeTaskUserFilter} defaultValue={this.state.taskUserFilter}>
                  <option value="">Seleccione um</option>
                  {this.props.usersList.map(user => {
                    return <option key={user.id_user} value={user.id_user}>{user.name_user}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="status-filter single-filter-container">
            <fieldset>
              <legend>Estado</legend>
              <select onChange={this.changeTaskStatusFilter} defaultValue={this.state.taskStatusFilter}>
                  <option value="">Escolha</option>
                  {this.props.tasksStatusList.map(status => {
                    return <option key={status.id_user_task_status} value={status.id_user_task_status}>{status.name_user_task_status}</option>
                  })}
              </select>
            </fieldset>
          </div>
        
        </div>


        <div className="filters-grid grid50-50">

          <div className="status-filter single-filter-container">
            <fieldset>
              <legend>Mês</legend>
              <select onChange={this.changeTaskDateFilter} defaultValue={this.state.taskDateFilter}>
                  <option value="">Seleccione</option>
                  {months.map(month => {
                    return <option key={month.val} value={month.val}>{month.name}</option>
                  })}
              </select>
            </fieldset>
          </div>


          <div className="deadline-filter single-filter-container">
            <fieldset>
              <legend>Deadline</legend>
              <DatePicker id="project-deadline" onChange={this.changeTaskDeadlineFilter} value={new Date(this.state.taskDeadlineFilter)} calendarIcon={<FiCalendar/>}/>
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

export default TaskFilters
