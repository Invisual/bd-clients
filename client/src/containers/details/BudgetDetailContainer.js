import React, { Component } from 'react';
import { BudgetDetail } from '../../components/details/BudgetDetail';

class BudgetDetailContainer extends Component {
  render() {
    return (
      <BudgetDetail
        budgetContent={this.props.budgetContent}
        activeBudget={this.props.activeBudget}
        isLoading={this.props.isLoading}
        changeCommentVal={this.props.changeCommentVal}
        submitComment={this.props.submitComment}
      />
    );
  }
}

export default BudgetDetailContainer;
