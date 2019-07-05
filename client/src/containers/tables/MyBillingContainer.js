import React, { Component } from 'react';
import { MyBilling } from '../../components/tables/MyBilling';
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class MyBillingContainer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems:[],
      isLoading: true,
    };
  }

  getItems = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`api/billing/`, { headers: { Authorization: AuthStr } }).then(res => {
      if (this._isMounted) {
        if (res.data === 'nodata') {
          this.setState({ items: [], filteredItems: [], isLoading: false });
        } else {
          var newItems = [...res.data.tasks, ...res.data.projects]
          newItems = newItems.sort((a, b) =>  a.conclusion_date>b.conclusion_date ? 1 : a.conclusion_date<b.conclusion_date ? -1 : 0)
          this.setState({ items: newItems, filteredItems: newItems, isLoading: false });
        }
      }
    });
  };


  filterItems = () => {
    switch(this.props.type){
      case 'allbilling':
      if(this.state.items){
        this.setState({filteredItems: this.state.items.filter( item => {
          return this.props.filters.client === '' ? true : Number(item.id_client) === Number(this.props.filters.client)
        }).filter(item => {
          return this.props.searchQuery === '' ? true : item.title.toLowerCase().includes(this.props.searchQuery.toLowerCase())
        }).filter(item => {
          return this.props.filters.type === '' ? true : item.type.toLowerCase() === this.props.filters.type.toLowerCase()
        })
        }, () => this.props.changeActiveItem(this.state.filteredItems.length > 0 ? this.state.filteredItems[0].id : null, this.state.filteredItems.length > 0 ? this.state.filteredItems[0].type : null))
      }
      else{
        this.setState({filteredItems : this.state.items})
      }
      break;

      default:
        this.setState({filteredItems : this.state.items})
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getItems()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadItems !== this.props.reloadItems) {
      this.getItems()
    }
    if(prevProps.filters !== this.props.filters || prevProps.searchQuery !== this.props.searchQuery){
      this.filterItems()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
      <MyBilling
        items={this.state.filteredItems}
        title={this.props.title}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveItem={this.props.changeActiveItem}
        activeItem={this.props.activeItem}
        activeType={this.props.activeType}
        copyAlert={this.props.copyAlert}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default MyBillingContainer;
