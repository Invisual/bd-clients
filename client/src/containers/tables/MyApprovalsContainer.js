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
 
  changeTaskStatus = (taskId, currStatus, projectId, account) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
 
    var nextStatus = '';
    switch (currStatus) {
      case 1:
        nextStatus = 2;
        break;
      case 2:
        nextStatus = 3;
        break;
      case 3:
        nextStatus = 4;
        break;
      case 4:
        nextStatus = 1;
        break;
      default:
        nextStatus = 1;
    }
    const data = {
      task: taskId,
      status: nextStatus,
      user: idUser.id_user,
      project: projectId,
      account: account,
    };
    axios.put('/api/tasks/userTaskStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.getTasks();
    });
  };
 
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
    if (prevProps.reloadApprovalItems !== this.props.reloadApprovalItems) {
      this.getApprovalItems()
    }
  }
 
 
  render() {
    return (
      <MyApprovals
        approvalItems={this.state.approvalItems}
        title={this.props.title}
        changeTaskStatus={this.changeTaskStatus}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveTask={this.props.changeActiveTask}
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