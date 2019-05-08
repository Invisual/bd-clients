import React, { Component } from 'react';
import { ClientsList } from '../../components/tables/ClientsList';
const axios = require('axios');

class ClientsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      counter: 0,
      isLoading: true
    };
  }


  getClients = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/clients`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ clients: null, isLoading: false });
      } else {
        this.setState({ clients: res.data, isLoading: false });
      }
    });
  };

  componentDidMount() {
    this.getClients();
  }

  render() {
    var filteredClients = this.state.clients.filter(client => {
      return this.props.searchQuery === '' ? true : client.name_client.toLowerCase().includes(this.props.searchQuery.toLowerCase())
    })
    return (
      <ClientsList
        clients={filteredClients}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveClient={this.props.changeActiveClient}
        activeClient={this.props.activeClient}
      />
    );
  }
}

export default ClientsListContainer;
