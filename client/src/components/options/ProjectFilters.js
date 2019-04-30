import React, {Component} from 'react';
import {FiltersDiv} from '../../styles/filters'

class ProjectFilters extends Component{

constructor(props){
  super(props);
  this.state = {
    projectClientFilter: this.props.filters.client,
    projectBillingFilter: this.props.filters.billing,
    projectAccountFilter: this.props.filters.account,
    projectPercentageFilter: this.props.filters.percentage,
    projectCategoriesFilter: this.props.filters.categories,
    projectUsersFilter: this.props.filters.users,
  }
}

changeProjectClientFilter = e => this.setState({projectClientFilter: e.target.value})
changeProjectBillingFilter = e => this.setState({projectBillingFilter: e.target.value})
changeProjectAccountFilter = e => this.setState({projectAccountFilter: e.target.value})
changeProjectPercentageFilter = e => this.setState({projectPercentageFilter: e.target.value})
changeProjectCategoriesFilter = e => {
  var val = e.target.value
  var index = this.state.projectCategoriesFilter.indexOf(val)
  if(index !== -1){
    var arr = this.state.projectCategoriesFilter;
    arr.splice(index, 1);
    this.setState({projectCategoriesFilter: arr})
  }
  else{
    this.setState((prevState) => ({projectCategoriesFilter: [...prevState.projectCategoriesFilter, val]}))
  }
}
changeProjectUsersFilter = e => {
  var val = e.target.value
  var index = this.state.projectUsersFilter.indexOf(val)
  if(index !== -1){
    var arr = this.state.projectUsersFilter;
    arr.splice(index, 1);
    this.setState({projectUsersFilter: arr})
  }
  else{
    this.setState((prevState) => ({projectUsersFilter: [...prevState.projectUsersFilter, val]}))
  }
}

setFilters = () => {
  var filters = {
    client: this.state.projectClientFilter,
    billing: this.state.projectBillingFilter,
    account: this.state.projectAccountFilter,
    percentage: this.state.projectPercentageFilter,
    categories: this.state.projectCategoriesFilter,
    users: this.state.projectUsersFilter
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
}

removeFilters = () => {
  var filters = {
    client: '',
    billing: '',
    account: '',
    percentage: '',
    categories: [],
    users: []
  }
  this.setState({projectClientFilter: '', projectBillingFilter: '', projectAccountFilter: '', projectPercentageFilter: '', projectCategoriesFilter: [], projectUsersFilter: []})
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
}

render(){
    return (
      <FiltersDiv className="project-filters options-filters">

        <div className="filters-grid grid50-50">

          <div className="client-filter single-filter-container">
            <fieldset>
              <legend>Cliente</legend>
              <select onChange={this.changeProjectClientFilter} defaultValue={this.state.projectClientFilter}>
                  <option value="">Escolha</option>
                  {this.props.clientsList.map(client => {
                      return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="billing-filter single-filter-container">
            <fieldset>
              <legend>Modo de Faturação</legend>
              <select onChange={this.changeProjectBillingFilter} defaultValue={this.state.projectBillingFilter}>
                  <option value="">Escolha</option>
                  {this.props.billingList.map(billing => {
                    return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
                  })}
              </select>
            </fieldset>
          </div>

        </div>


        <div className="filters-grid grid50-50">

          <div className="account-filter single-filter-container">
            <fieldset>
              <legend>Account</legend>
              <select onChange={this.changeProjectAccountFilter} defaultValue={this.state.projectAccountFilter}>
                  <option value="">Escolha</option>
                  {this.props.accountsList.map(account => {
                    return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
                  })}
              </select>
            </fieldset>
          </div>

          <div className="percentage-filter single-filter-container">
          <fieldset>
              <legend>Percentagem Realizada</legend>
              <div className="range-input-container">
                <input className="range-input" onChange={this.changeProjectPercentageFilter} type="range" min="1" max="100" value={this.state.projectPercentageFilter === '' ? '0' : this.state.projectPercentageFilter} />
                <span className="range-value">{this.state.projectPercentageFilter === '' ? '0%' : this.state.projectPercentageFilter+'%'}</span>
              </div>
            </fieldset>
          </div>

        </div>

        <div className="filters-grid grid100">

          <div className="categories-filter single-filter-container">
            <fieldset>
              <legend>Áreas</legend>
                <div className="categories-card">
                  <div className="categories-flex checkmark-container">
                  {this.props.categoriesList.map (cat => {
                    return (
                      <div key={cat.id_category}>
                          <label className="label-container">{cat.name_category}
                              {this.state.projectCategoriesFilter.indexOf(cat.id_category.toString()) !== -1 ?
                                <input type="checkbox" value={cat.id_category} onClick={this.changeProjectCategoriesFilter} defaultChecked/>
                              :
                                <input type="checkbox" value={cat.id_category} onClick={this.changeProjectCategoriesFilter} />
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

        <div className="filters-grid grid100">

          <div className="users-filter single-filter-container">
            <fieldset>
              <legend>Intervenientes</legend>
              <div className="users-card">
                <div className="users-grid checkmark-container">
                {this.props.usersList.map ( user => {
                  return (
                    <div key={user.id_user}>
                        <label className="label-container">{user.name_user}
                            {this.state.projectUsersFilter.indexOf(user.id_user.toString()) !== -1 ?
                              <input type="checkbox" value={user.id_user} onClick={this.changeProjectUsersFilter} defaultChecked/>
                            :
                              <input type="checkbox" value={user.id_user} onClick={this.changeProjectUsersFilter} />
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

        <div className="filters-buttons">
          <button className="btn secondary-btn" onClick={this.removeFilters}>Limpar</button>
          <button className="btn main-btn" onClick={this.setFilters}>Filtrar</button>
        </div>

      </FiltersDiv>
    )
}

}

export default ProjectFilters
