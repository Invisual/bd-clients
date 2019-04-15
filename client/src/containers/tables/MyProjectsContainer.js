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

  componentDidUpdate(prevProps) {
    if (prevProps.reloadProjects !== this.props.reloadProjects) {
      this.getProjects();
    }
  }


  render() {
    console.log(this.state.projects)
    var filteredProjects
    switch(this.props.type){
      case 'allprojects':
        filteredProjects = this.state.projects.filter( project => {
          return this.props.filters.client === '' ? true : Number(project.id_client) === Number(this.props.filters.client)
        }).filter(project => {
          return this.props.filters.billing === '' ? true : Number(project.ref_id_billing_mode) === Number(this.props.filters.billing)
        }).filter(project => {
          return this.props.filters.users === [] ? true : this.props.filters.users.map(user => project.intervenientes.indexOf(user) === -1)
        })
      break;

      default:
      filteredProjects = this.state.projects
    }

    return (
      <MyProjects
        projects={filteredProjects}
        title={this.props.title}
        isLoading={this.state.isLoading}
        type={this.props.type}
        changeActiveProject={this.props.changeActiveProject}
        activeProject={this.props.activeProject}
      />
    );
  }
}

export default MyProjectsContainer;
