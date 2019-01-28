import React, { Component } from 'react';
import { MyProjects } from '../../components/tables/MyProjects';

const axios = require('axios');

class MyProjectsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        getProjects:[],
    }
}

  getProjects = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'))

    axios.get(`/api/projects/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ getProjects: res.data });
    }); 
    
  };

  componentDidMount(){
    this.getProjects();
  }

  render() {
    return <MyProjects projects={this.state.getProjects} title={this.props.title} />;
  }
}

export default MyProjectsContainer;
