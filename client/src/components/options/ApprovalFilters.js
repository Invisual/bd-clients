import React, {Component} from 'react';
import {FiltersDiv} from '../../styles/filters'

class ApprovalFilters extends Component{

constructor(props){
  super(props);
  this.state = {
    approvalClientFilter: this.props.filters.client,
    approvalAccountFilter: this.props.filters.account,
    approvalTypeFilter: this.props.filters.type,
  }
}

changeApprovalClientFilter = e => this.setState({approvalClientFilter: e.target.value})
changeApprovalAccountFilter = e => this.setState({approvalAccountFilter: e.target.value})
changeApprovalTypeFilter = e => this.setState({approvalTypeFilter: e.target.value})


setFilters = () => {
  var filters = {
    type: this.state.approvalTypeFilter,
    client: this.state.approvalClientFilter,
    account: this.state.approvalAccountFilter
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
}

removeFilters = () => {
  var filters = {
    type: '',
    client: '',
    account: '',
  }
  this.setState({approvalClientFilter: '', approvalAccountFilter: '', approvalTypeFilter: ''})
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive()
}

render(){
    return (
      <FiltersDiv className="approval-filters options-filters">

        <div className="filters-grid grid50-50">

          <div className="type-filter single-filter-container">
            <fieldset>
              <legend>Tipo</legend>
              <select onChange={this.changeApprovalTypeFilter} defaultValue={this.state.approvalTypeFilter}>
                  <option value="">Escolha</option>
                  <option value="project">Projetos</option>
                  <option value="task">Tarefas</option>
                  <option value="budget">Orçamentos</option>
              </select>
            </fieldset>
          </div>

          <div className="client-filter single-filter-container">
            <fieldset>
              <legend>Cliente</legend>
              <select onChange={this.changeApprovalClientFilter} defaultValue={this.state.approvalClientFilter}>
                  <option value="">Escolha</option>
                  {this.props.clientsList.map(client => {
                      return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                  })}
              </select>
            </fieldset>
          </div>

        </div>


        <div className="filters-grid grid50-50">

          <div className="account-filter single-filter-container">
            <fieldset>
              <legend>Account</legend>
              <select onChange={this.changeApprovalAccountFilter} defaultValue={this.state.approvalAccountFilter}>
                  <option value="">Escolha</option>
                  {this.props.accountsList.map(account => {
                    return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
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

export default ApprovalFilters
