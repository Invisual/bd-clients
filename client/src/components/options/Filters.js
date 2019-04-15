import React, {Component} from 'react';

class Filters extends Component{

constructor(props){
  super(props);
  this.state = {
    projectClientFilter: '',
    projectBillingFilter: '',
    projectConcludedFilter: '',
    projectUsersFilter: []
  }
}

changeProjectClientFilter = e => this.setState({projectClientFilter: e.target.value})
changeProjectBillingFilter = e => this.setState({projectBillingFilter: e.target.value})
changeProjectConcludedFilter = e => this.setState({projectConcludedFilter: e.target.value})
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
    concluded: this.state.projectConcludedFilter,
    users: this.state.projectUsersFilter
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
  console.log(this.state)
}

removeFilters = () => {
  var filters = {
    client: '',
    billing: '',
    users: ''
  }
  this.props.changeFilters(filters)
  console.log(this.state)
}

render(){
  switch(this.props.type){
    case 'projetos':
    return (
      <div className="project-filters options-filters">

        <div className="client-filter">
          <select onChange={this.changeProjectClientFilter}>
              <option value="">Clientes</option>
              {this.props.clientsList.map(client => {
                  return <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
              })}
          </select>
        </div>

        <div className="billing-filter">
          <select onChange={this.changeProjectBillingFilter}>
              <option value="">Faturação</option>
              {this.props.billingList.map(billing => {
                return <option key={billing.id_billing_mode} value={billing.id_billing_mode}>{billing.name_billing_mode}</option>
              })}
          </select>
        </div>

        <div className="users-filter">
          {this.props.usersList.map ( user => {
             return (
              <div key={user.id_user}>
                  <label className="label-container">{user.name_user}
                      <input type="checkbox" value={user.id_user} onClick={this.changeProjectUsersFilter}/>
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
