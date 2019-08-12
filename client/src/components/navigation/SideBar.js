import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import { FiHome, FiFolder, FiFileText, FiCalendar, FiBookmark, FiUsers, FiUser, FiInbox } from 'react-icons/fi';
import { NavLink, withRouter } from 'react-router-dom';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsedSidebar: false,
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
    return this.props.location.pathname === '/createtask' || this.props.location.pathname === '/tasks' || this.props.location.pathname === '/concludedtasks' ? true : false
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
    return (
      <SidebarDiv className="sidebar-container">
        <div className={logoClass}>
            <img alt="Invisual Branding Solutions" src={logoImg}/>
        </div>
        <div className="navigation">
            <ul>
                <NavLink exact={true} to="/" activeClassName='is-active'><li><FiHome/><span>Dashboard</span></li></NavLink>

                {this.props.userInfo.ref_id_role === 2 || this.props.userInfo.ref_id_role === 3 ?
                <NavLink exact={true} to="/approvals" activeClassName='is-active'><li><FiInbox/><span>Aprovações</span></li></NavLink>
                : null }

                {this.props.userInfo.ref_id_role === 2 || this.props.userInfo.ref_id_role === 3 ?
                <li className={this.isProjectsRoute() ? 'is-active has-submenu' : 'has-submenu'} onClick={this.toggleProjectsDropdown}>
                <FiFolder/>
                <span>Projetos</span>
                <div className={this.state.projectsDropDown ? 'submenu opened-submenu' : 'submenu closed-submenu'}>
                  <NavLink to="/createproject"><div className="submenu-item">Criar Projeto</div></NavLink>
                  <NavLink to="/projects"><div className="submenu-item">Ver Todos</div></NavLink>
                  <NavLink to="/concludedprojects"><div className="submenu-item">Ver Concluídos</div></NavLink>
                </div>
              </li>
                : <NavLink exact={true} to="/projects" activeClassName='is-active'><li><FiFolder/><span>Projetos</span></li></NavLink>}

                {this.props.userInfo.ref_id_role === 2 || this.props.userInfo.ref_id_role === 3 ?
                <li className={this.isTasksRoute() ? 'is-active has-submenu' : 'has-submenu'} onClick={this.toggleTasksDropdown}>
                  <FiFileText/>
                  <span>Tarefas</span>
                  <div className={this.state.tasksDropDown ? 'submenu opened-submenu' : 'submenu closed-submenu'}>
                    <NavLink to="/createtask" activeClassName='is-active'><div className="submenu-item">Criar Tarefa</div></NavLink>
                    <NavLink to="/tasks" activeClassName='is-active'><div className="submenu-item">Ver Todas</div></NavLink>
                    <NavLink to="/concludedtasks" activeClassName='is-active'><div className="submenu-item">Ver Concluídas</div></NavLink>
                  </div>
                </li>
                : <NavLink exact={true} to="/tasks" activeClassName='is-active'><li><FiFileText/><span>Tarefas</span></li></NavLink>}

                <NavLink to="/clients" activeClassName='is-active'><li><FiUser/><span>Clientes</span></li></NavLink>
                <NavLink to="/meetings" activeClassName='is-active'><li><FiCalendar/><span>Reuniões</span></li></NavLink>
                {this.props.userInfo.ref_id_role === 2 || this.props.userInfo.ref_id_role === 3 || this.props.userInfo.ref_id_position === 3 ?
                <NavLink to="/billing" activeClassName='is-active'><li><FiBookmark/><span>Contabilidade</span></li></NavLink>
                : null}

                <li className={this.isCompanyRoute() ? 'is-active has-submenu' : 'has-submenu'} onClick={this.toggleCompanyDropdown}>
                  <FiUsers/><span>Empresa</span>
                  <div className={this.state.companyDropDown ? 'submenu opened-submenu company-submenu' : 'submenu closed-submenu company-submenu'}>
                  {this.props.userInfo.ref_id_role === 2 || this.props.userInfo.ref_id_role === 3 ?
                  <NavLink to="/budgets" activeClassName='is-active'><div className="submenu-item">Orçamentos</div></NavLink>
                  :null }
                    <NavLink to="/vacations" activeClassName='is-active'><div className="submenu-item">Férias</div></NavLink>
                    <NavLink to="/team" activeClassName='is-active'><div className="submenu-item">Equipa</div></NavLink>
                    <NavLink to="/trips" activeClassName='is-active'><div className="submenu-item">Deslocações</div></NavLink>
                    <NavLink to="/regulation" activeClassName='is-active'><div className="submenu-item">Regulamento</div></NavLink>
                  </div>
                </li>
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
