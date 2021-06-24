import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import { FiUsers, FiUser } from 'react-icons/fi';
import { NavLink, withRouter } from 'react-router-dom';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsedSidebar: true,
      projectsDropDown: false,
      tasksDropDown: false,
      companyDropDown: false
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => ({ collapsedSidebar: !prevState.collapsedSidebar }))
  }

  toggleProjectsDropdown = () => {
    this.setState(prevState => ({ projectsDropDown: !prevState.projectsDropDown, tasksDropDown: false, companyDropDown: false }))
  }

  toggleTasksDropdown = () => {
    this.setState(prevState => ({ tasksDropDown: !prevState.tasksDropDown, projectsDropDown: false, companyDropDown: false }))
  }

  toggleCompanyDropdown = () => {
    this.setState(prevState => ({ companyDropDown: !prevState.companyDropDown, tasksDropDown: false, projectsDropDown: false }))
  }

  isProjectsRoute = () => {
    return this.props.location.pathname === '/createproject' || this.props.location.pathname === '/projects' || this.props.location.pathname === '/concludedprojects' ? true : false
  }

  isTasksRoute = () => {
    return this.props.location.pathname === '/createtask' || this.props.location.pathname === '/tasks' || this.props.location.pathname === '/concludedtasks' || this.props.location.pathname === '/bothtasks' ? true : false
  }

  isCompanyRoute = () => {
    return this.props.location.pathname === '/budgets' || this.props.location.pathname === '/vacations' || this.props.location.pathname === '/team' ? true : false
  }

  componentDidUpdate(prevProps, prevState){
    this.state.collapsedSidebar ? document.body.classList.add('collapsed-sidebar') : document.body.classList.remove('collapsed-sidebar')
    if(prevState.projectsDropDown !== this.state.projectsDropDown){
      if(this.state.projectsDropDown){ this.setState({collapsedSidebar: false}) }
    }
    if(prevState.tasksDropDown !== this.state.tasksDropDown){
      if(this.state.tasksDropDown){ this.setState({collapsedSidebar: false}) }
    }
    if(prevState.companyDropDown !== this.state.companyDropDown){
      if(this.state.companyDropDown){ this.setState({collapsedSidebar: false}) }
    }
    if(prevState.collapsedSidebar !== this.state.collapsedSidebar){
      if(this.state.collapsedSidebar){ this.setState({projectsDropDown: false, tasksDropDown: false, companyDropDown: false}) }
    }
  }


  render() {
    var logoImg = this.state.collapsedSidebar ? '/img/in.png' : '/img/logo.png';
    var logoClass = this.state.collapsedSidebar ? 'logo logo-small' : 'logo logo-big';
    var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role
    return (
      <SidebarDiv className="sidebar-container">
        <div className={logoClass}>
            <img alt="Invisual Branding Solutions" src={logoImg}/>
        </div>
        <div className="navigation">
            <ul>
                <NavLink to="/clients" activeClassName='is-active'><li><FiUsers/><span>Clientes</span></li></NavLink>
                {userRole === 3 && <NavLink to="/team" activeClassName='is-active'><li><FiUser/><span>Equipa</span></li></NavLink>}
            </ul>
        </div>
        <div className="sidebar-toggle">
          <label className="switch">
              <input type="checkbox" />
              <span className="slider rounded-slider" onClick={this.toggleSideBar}></span>
          </label>
        </div>
      </SidebarDiv>
    );
  }
}

export default withRouter(SideBar)
