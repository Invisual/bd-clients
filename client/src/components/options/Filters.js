import React, {Component} from 'react';

class Filters extends Component{

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
  switch(this.props.type){
    case 'projetos':
    return (
      <div className="project-filters options-filters">

        <div className="client-filter">
          <h4>Clientes</h4>
          <select onChange={this.changeProjectClientFilter} defaultValue={this.state.projectClientFilter}>
              <option value="">Escolha</option>
              {this.props.clientsList.map(client => {
                  return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
              })}
          </select>
        </div>

        <div className="billing-filter">
          <h4>Modo de Faturação</h4>
          <select onChange={this.changeProjectBillingFilter} defaultValue={this.state.projectBillingFilter}>
              <option value="">Escolha</option>
              {this.props.billingList.map(billing => {
                return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
              })}
          </select>
        </div>

        <div className="account-filter">
          <h4>Account</h4>
          <select onChange={this.changeProjectAccountFilter} defaultValue={this.state.projectAccountFilter}>
              <option value="">Escolha</option>
              {this.props.accountsList.map(account => {
                return <option key={account.id_user} value={account.id_user}>{account.name_user}</option>
              })}
          </select>
        </div>

        <div className="percentage-filter">
          <h4>Percentagem Realizada</h4>
          <input onChange={this.changeProjectPercentageFilter} type="range" min="1" max="100" value={this.state.projectPercentageFilter === '' ? '0' : this.state.projectPercentageFilter} />
          <span className="range-value">{this.state.projectPercentageFilter === '' ? '0' : this.state.projectPercentageFilter}</span>
        </div>

        <div className="categories-filter">
          <h4>Áreas</h4>
          {this.props.categoriesList.map ( cat => {
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

        <div className="users-filter">
          <h4>Intervenientes</h4>
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

        <div className="filters-buttons">
          <button className="btn secondary-btn" onClick={this.removeFilters}>Limpar Filtros</button>
          <button className="btn main-btn" onClick={this.setFilters}>Filtrar</button>
        </div>

      </div>
    )
  }
}

}

export default Filters
