import React, { Component } from 'react';
import { ClientDetail } from '../../components/details/ClientDetail';

class ClientDetailContainer extends Component {
  render() {
    return (
      <ClientDetail
        clientContent={this.props.clientContent}
        activeClient={this.props.activeClient}
        isLoading={this.props.isLoading}
        changeActiveTab={this.props.changeActiveTab}
        activeTab={this.props.activeTab}
      />
    );
  }
}

export default ClientDetailContainer;
