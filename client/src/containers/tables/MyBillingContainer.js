import React, { Component } from 'react';
import { MyBilling } from '../../components/tables/MyBilling';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class MyBillingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
    };
  }


  getItems = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));
    
    axios.get(`api/billing/${this.props.activeType}/${this.props.activeItem}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ items: null, isLoading: false });
      } else {
        var newItems = [...res.data.tasks, ...res.data.projects]
        this.setState({ items: newItems, isLoading: false });
      }
    });
  };

  componentDidMount() {
    this.getItems()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadTasks !== this.props.reloadTasks) {
      this.getTasks()
    }
    if(prevProps.currentTaskList !== this.props.currentTaskList){
      this.getTasks()
    }
  }


  render() {
    var filteredItems
    switch(this.props.type){
      case 'alltasks':
      if(this.state.tasks !== null){
        filteredItems = this.state.tasks.filter( task => {
          return this.props.filters.client === '' ? true : Number(task.ref_id_client) === Number(this.props.filters.client)
        }).filter(task => {
          return this.props.searchQuery === '' ? true : task.title_task.toLowerCase().includes(this.props.searchQuery.toLowerCase())
        }).filter(task => {
          return this.props.filters.billing === '' ? true : Number(task.ref_id_billing_mode) === Number(this.props.filters.billing)
        }).filter(task => {
          return this.props.filters.type === '' ? true : Number(task.ref_id_type_task) === Number(this.props.filters.type)
        }).filter(task => {
          return this.props.filters.user === '' ? true : Number(task.ref_id_user) === Number(this.props.filters.user)
        }).filter(task => {
          return this.props.filters.status === '' ? true : Number(task.ref_id_user_task_status) === Number(this.props.filters.status)
        }).filter(task => {
          return this.props.filters.project === '' ? true : Number(task.ref_id_project) === Number(this.props.filters.project)
        }).filter(task => {
          return this.props.filters.isDeadlineSet === false ? true : moment(task.deadline_date_task).isSameOrBefore(this.props.filters.deadline, 'day')
        })
      }
      else{
        filteredItems = null
      }
      
      break;

      default:
        filteredItems = this.state.items
    }

    return (
      <MyBilling
        items={filteredItems}
        title={this.props.title}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveItem={this.props.changeActiveItem}
        activeItem={this.props.activeItem}
        activeType={this.props.activeType}
        copyAlert={this.props.copyAlert}
      />
    );
  }
}

export default MyBillingContainer;
