import React, { Component } from 'react';
import { BudgetDetail } from '../../components/details/BudgetDetail';

const axios = require('axios');

class BudgetDetailContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      externalList:[]
    };
  }

  getExternalStatus = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/externalStatus`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ externalList: res.data});
    });
  }

  changeExternalStatus = (budgetId, statusId) => {
    
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    const data = {
      budget: budgetId,
      status: statusId,
      user: idUser.id_user
    };
    axios.put('/api/budgets/externalBudgetStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.getBudgetDetails();
    });
  }

  componentDidMount(){
    this.getExternalStatus()
  }

  render() {
    return (
      <BudgetDetail
        budgetContent={this.props.budgetContent}
        activeBudget={this.props.activeBudget}
        isLoading={this.props.isLoading}
        changeCommentVal={this.props.changeCommentVal}
        submitComment={this.props.submitComment}
        externalList={this.state.externalList}
        changeExternalStatus={this.changeExternalStatus}
        type={this.props.type}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default BudgetDetailContainer;
