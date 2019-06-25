import React, { Component } from 'react';
import { MyApprovals } from '../../components/tables/MyApprovals';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
 
const axios = require('axios');
 
class MyApprovalsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvalItems: [],
      isLoading: true,
    };
  }

  getApprovalItems = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));
    var url = '/api/misc/approvals'
   
    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ approvalItems: null, isLoading: false });
      } else {
        var newItems = [...res.data.tasks, ...res.data.projects, ...res.data.budgets]
        newItems = newItems.sort((a, b) =>  a.conclusion_date>b.conclusion_date ? 1 : a.conclusion_date<b.conclusion_date ? -1 : 0)
        this.setState({ approvalItems: newItems, isLoading: false });
      }
    });
  };
 
  componentDidMount() {
    this.getApprovalItems()
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.reloadItems !== this.props.reloadItems) {
      this.getApprovalItems()
    }
  }
 
 
  render() {
    return (
      <MyApprovals
        approvalItems={this.state.approvalItems}
        title={this.props.title}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveItem={this.props.changeActiveItem}
        activeItem={this.props.activeItem}
        activeType={this.props.activeType}
        copyAlert={this.props.copyAlert}
        startCountingHours={this.startCountingHours}
        stopCountingHours={this.stopCountingHours}
        activeHours={this.props.activeHours}
        activeBudgetHours={this.props.activeBudgetHours}
        concluded={this.props.concluded}
      />
    );
  }
}
 
export default MyApprovalsContainer;