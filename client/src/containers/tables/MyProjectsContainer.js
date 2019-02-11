import React, { Component } from 'react';
import { MyProjects } from '../../components/tables/MyProjects';

const axios = require('axios');

class MyProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isLoading: true
    };
  }

  getProjects = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/projects/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ projects: null, isLoading: false });
      } else {
        this.setState({ projects: res.data, isLoading: false });
      }
    });
  };

  componentDidMount() {
    this.getProjects();
  }

  render() {
    return <MyProjects projects={this.state.projects} title={this.props.title} isLoading={this.state.isLoading} />;
  }
}

export default MyProjectsContainer;
