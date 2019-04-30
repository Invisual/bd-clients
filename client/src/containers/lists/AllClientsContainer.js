import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllClients } from '../../components/lists/AllClients';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const axios = require('axios');
const history = createBrowserHistory();

class AllClientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClient: '',
      activeTab: 'clientinfo',
      clientContent: [],
      isLoading: true
    };
  }

  getClientDetails = () => {
    const {
      match: { params }
    } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    if (this.state.activeClient) {
      axios.get(`/api/clients/details/${this.state.activeClient}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ clientContent: res.data, isLoading: false });
      });
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/clients' });
        axios
          .get(`/api/clients/details/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeClient:  res.data.details[0].id_client });
          })
          .then(res => {
            axios.get(`/api/clients/details/${this.state.activeClient}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ clientContent: null, isLoading: false });
              } else {
                this.setState({ clientContent: res.data, isLoading: false });
              }
            });
          });
      } else {
        axios
          .get(`/api/clients`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeClient: res.data[0].id_client });
          })
          .then(res => {
            axios.get(`/api/clients/details/${this.state.activeClient}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ clientContent: null, isLoading: false });
              } else {
                this.setState({ clientContent: res.data, isLoading: false });
              }
            });
          });
      }
    }
  };

  changeActiveClient = clientId => {
    if (clientId === this.state.activeClient) {
      return null;
    } else {
      this.setState({ activeClient: clientId, isLoading: true });
    }
  };

  changeActiveTab = activeTab => {
    this.setState({ activeTab: activeTab });
  };

  copyAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000
    });

    Toast.fire({
      type: 'success',
      title: 'Link copiado com sucesso!'
    });
  };

  deleteActiveTask = taskId => {
    window.alert('Delete task ' + taskId + '?');
  };
  duplicateActiveTask = taskId => {
    window.alert('Duplicate task ' + taskId + '?');
  };
  editActiveTask = taskId => {
    window.alert('Edit task ' + taskId + '?');
  };

  componentDidMount() {
    this.getClientDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeClient !== this.state.activeClient) {
      this.getClientDetails();
      this.setState({ activeTab: 'clientinfo' });
    }
  }

  render() {
    return (
      <AllClients
        userRole={this.props.userInfo.ref_id_role}
        clientContent={this.state.clientContent}
        isLoading={this.state.isLoading}
        activeClient={this.state.activeClient}
        changeActiveClient={this.changeActiveClient}
        deleteActiveTask={this.deleteActiveTask}
        duplicateActiveTask={this.duplicateActiveTask}
        editActiveTask={this.editActiveTask}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        changeActiveTab={this.changeActiveTab}
        activeTab={this.state.activeTab}
      />
    );
  }
}

export default AllClientsContainer;
