import React, {Component} from 'react';
import {FiltersDiv} from '../../styles/filters'

class BillingFilters extends Component{

constructor(props){
  super(props);
  this.state = {
    billingClientFilter: this.props.filters.client,
    billingTypeFilter: this.props.filters.type,
  }
}

changeBillingClientFilter = e => this.setState({billingClientFilter: e.target.value})
changeBillingTypeFilter = e => this.setState({billingTypeFilter: e.target.value})


setFilters = () => {
  var filters = {
    client: this.state.billingClientFilter,
    type: this.state.billingTypeFilter,
  }
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive();
}

removeFilters = () => {
  var filters = {
    client: '',
    type: ''
  }
  this.setState({billingClientFilter: '', billingTypeFilter: ''})
  this.props.changeFilters(filters)
  this.props.changeFiltersAreActive()
}

render(){
    return (
      <FiltersDiv className="billing-filters options-filters">

        <div className="filters-grid grid50-50">

          <div className="type-filter single-filter-container">
            <fieldset>
                <legend>Tipo</legend>
                <label className="radio-label-container">Projeto
                    <input type="radio" value="project" name="radio-type" onClick={this.changeBillingTypeFilter}/>
                    <span className="checkmark"></span>
                </label>
                <label className="radio-label-container">Tarefa
                    <input type="radio" value="task" name="radio-type" onClick={this.changeBillingTypeFilter}/>
                    <span className="checkmark"></span>
                </label>
            </fieldset>
          </div>

          <div className="client-filter single-filter-container">
            <fieldset>
              <legend>Cliente</legend>
              <select onChange={this.changeBillingClientFilter}>
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

export default BillingFilters
