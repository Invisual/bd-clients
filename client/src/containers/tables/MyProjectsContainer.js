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
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var idUser = JSON.parse(localStorage.getItem('user'))
    var url = ''
    if(this.props.concluded){
      url = '/api/projects/concluded'
    } else {
        if(idUser.ref_id_role === 3 || idUser.ref_id_role  === 2){
          if(this.props.type === 'dashboard' && idUser.ref_id_position === 1){
            url = '/api/projects'
          } 
          else {
          url = this.props.currentProjectList === 'all' ? `/api/projects` : `/api/projects/${idUser.id_user}`
          }
      }
      else{
        url = `/api/projects/${idUser.id_user}`
      }
    }
    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
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
    if(prevProps.currentProjectList !== this.props.currentProjectList){
      this.getProjects()
    }
  }


  render() {
    var filteredProjects
    switch(this.props.type){
      case 'allprojects':
        if(this.state.projects){
          filteredProjects = this.state.projects.filter( project => {
            return this.props.filters.client === '' ? true : Number(project.id_client) === Number(this.props.filters.client)
          }).filter(project => {
            return this.props.searchQuery === '' ? true : project.title_project.toLowerCase().includes(this.props.searchQuery.toLowerCase())
          }).filter(project => {
            return this.props.filters.billing === '' ? true : Number(project.ref_id_billing_mode) === Number(this.props.filters.billing)
          }).filter(project => {
            return this.props.filters.account === '' ? true : Number(project.ref_id_user_account) === Number(this.props.filters.account)
          }).filter(project => {
            return this.props.filters.percentage === '' ? true : Number(project.percentage_tasks) >= Number(this.props.filters.percentage)
          }).filter(project => {
            if(this.props.filters.users.length <= 0){return true}
            else{
              for(var i=0, count=this.props.filters.users.length; i<count; i++){
                var x = 0
                if(project.intervenientes.indexOf(this.props.filters.users[i]) === -1){
                  return false
                }
                else{
                  x++
                }
              }
              return x > 0 ? true : null
            }
          }).filter(project => {
            if(this.props.filters.categories.length <= 0){return true}
            if(project.categories ===  null){return false}
            else{
              for(var i=0, count=this.props.filters.categories.length; i<count; i++){
                var x = 0
                if(project.categories.indexOf(this.props.filters.categories[i]) === -1){
                  return false
                }
                else{
                  x++
                }
              }
              return x > 0 ? true : null
            }
          })
        }
        else{
          filteredProjects = this.state.projects
        }
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
        concluded={this.props.concluded}
      />
    );
  }
}

export default MyProjectsContainer;
