import React, {Component} from 'react';
import {FiltersDiv} from '../../styles/filters'

class BudgetFilters extends Component{

constructor(props){
  super(props);
  this.state = {
    budgetClientFilter: this.props.filters.client,
    budgetAccountFilter: this.props.filters.account,
    budgetInternalStatusFilter: this.props.filters.internalStatus,
    budgetExternalStatusFilter: this.props.filters.externalStatus,
  }
}

changeBudgetClientFilter = e => this.setState({budgetClientFilter: e.target.value})
changeBudgetAccountFilter = e => this.setState({budgetAccountFilter: e.target.value})
changeBudgetInternalStatusFilter = e => this.setState({budgetInternalStatusFilter: e.target.value})
changeBudgetExternalStatusFilter = e => this.setState({budgetExternalStatusFilter: e.target.value})

setFilters = () => {
  var filters = {
    client: this.state.budgetClientFilter,
    account: this.state.budgetAccountFilter,
    internalStatus: this.state.budgetInternalStatusFilter,
    externalStatus: this.state.budgetExternalStatusFilter
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive()
}

removeFilters = () => {
  var filters = {
    client: '',
    account: '',
    internalStatus: '',
    externalStatus: ''
  }
  this.setState({budgetClientFilter: '', budgetAccountFilter: '', budgetInternalStatusFilter: '', budgetExternalStatusFilter: ''})
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
  this.props.changePlaceholder()
}

render(){
    return (
      <FiltersDiv className="task-filters options-filters">

        <div className="filters-grid grid50-50">
        
          <div className="single-filter-container">
            <fieldset>
              <legend>Clientes</legend>
              <select onChange={this.changeBudgetClientFilter} defaultValue={this.state.budgetClientFilter}>
                  <option value="">Escolha</option>
                  {this.props.clientsList.map(client => {
                      return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="single-filter-container">
            <fieldset>
              <legend>Account</legend>
              <select onChange={this.changeBudgetAccountFilter} defaultValue={this.state.budgetAccountFilter}>
                  <option value="">Escolha</option>
                  {this.props.accountsList.map(account => {
                    return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
                  })}
              </select>
            </fieldset>
          </div>

        </div>


        <div className="filters-grid grid50-50">
        
          <div className="single-filter-container">
            <fieldset>
              <legend>Estado Interno</legend>
              <select onChange={this.changeBudgetInternalStatusFilter} defaultValue={this.state.budgetInternalStatusFilter}>
                  <option value="">Escolha</option>
                  {this.props.internalStatusList.map(status => {
                      return <option key={status.id_budget_internal_status} value={status.id_budget_internal_status}>{status.name_budget_internal_status}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="single-filter-container">
            <fieldset>
              <legend>Estado Externo</legend>
              <select onChange={this.changeBudgetExternalStatusFilter} defaultValue={this.state.budgetExternalStatusFilter}>
                  <option value="">Escolha</option>
                  {this.props.externalStatusList.map(status => {
                      return <option key={status.id_budget_external_status} value={status.id_budget_external_status}>{status.name_budget_external_status}</option>
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

export default BudgetFilters
