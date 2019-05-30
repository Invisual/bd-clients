import React, { Component } from 'react';
import { BillingDetail } from '../../components/details/BillingDetail';

class BillingDetailContainer extends Component {

  render() {
    return (
      <BillingDetail
        activeItem={this.props.activeItem}
        activeType={this.props.activeType}
        itemContent={this.props.itemContent}
        isLoading={this.props.isLoading}
        openCostsModal={this.props.openCostsModal}
      />
    );
  }
}

export default BillingDetailContainer;
