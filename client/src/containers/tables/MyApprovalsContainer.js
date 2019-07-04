import React, { Component } from 'react';
import { MyApprovals } from '../../components/tables/MyApprovals';
import 'sweetalert2/src/sweetalert2.scss'
 
const axios = require('axios');
 
class MyApprovalsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvalItems: [],
      filteredApprovals: [],
      isLoading: true,
    };
  }

  getApprovalItems = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var url = '/api/misc/approvals'
   
    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ approvalItems: [], filteredApprovals: [], isLoading: false });
      } else {
        var newItems = [...res.data.tasks, ...res.data.projects, ...res.data.budgets]
        newItems = newItems.sort((a, b) =>  a.conclusion_date>b.conclusion_date ? 1 : a.conclusion_date<b.conclusion_date ? -1 : 0)
        this.setState({ approvalItems: newItems, filteredApprovals: newItems, isLoading: false });
      }
    });
  }

  filterApprovals = () => {
    switch(this.props.type){
      case 'allapprovals':
        if(this.state.approvalItems){
          this.setState({filteredApprovals: this.state.approvalItems.filter( approval => {
            return this.props.filters.client === '' ? true : Number(approval.id_client) === Number(this.props.filters.client)
          }).filter(approval => {
            return this.props.searchQuery === '' ? true : approval.title.toLowerCase().includes(this.props.searchQuery.toLowerCase())
          }).filter(approval => {
            return this.props.filters.account === '' ? true : Number(approval.account) === Number(this.props.filters.account)
          }).filter(approval => {
            return this.props.filters.type === '' ? true : approval.type.toLowerCase() === this.props.filters.type.toLowerCase()
          })
          }, () => { this.props.changeActiveItem(this.state.filteredApprovals.length > 0 ? this.state.filteredApprovals[0].id : null, this.state.filteredApprovals.length > 0 ? this.state.filteredApprovals[0].type : null)}) 
        }
        else{
          this.setState({filteredApprovals : null})
        }
      break;

      default:
        this.setState({filteredApprovals : this.state.approvalItems})
    }
  }
 
  componentDidMount() {
    this.getApprovalItems()
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.reloadItems !== this.props.reloadItems) {
      this.getApprovalItems()
    }
    if(prevProps.filters !== this.props.filters || prevProps.searchQuery !== this.props.searchQuery){
      this.filterApprovals()
    }
  }
 
 
  render() {
    return (
      <MyApprovals
        approvalItems={this.state.filteredApprovals}
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
        placeholder={this.props.placeholder}
      />
    );
  }
}
 
export default MyApprovalsContainer;