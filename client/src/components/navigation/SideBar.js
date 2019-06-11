import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import { FiHome, FiFolder, FiLogOut, FiFileText, FiCalendar, FiBookmark, FiUsers, FiEdit, FiUser } from 'react-icons/fi';
import { NavLink} from 'react-router-dom';

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
    this.setState(prevState => ({ projectsDropDown: !prevState.projectsDropDown }))
  }

  toggleTasksDropdown = () => {
    this.setState(prevState => ({ tasksDropDown: !prevState.tasksDropDown }))
  }

  toggleCompanyDropdown = () => {
    this.setState(prevState => ({ companyDropDown: !prevState.companyDropDown }))
  }

  componentDidUpdate(){
    this.state.collapsedSidebar ? document.body.classList.add('collapsed-sidebar') : document.body.classList.remove('collapsed-sidebar')
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
                <NavLink exact={true} to="/" activeClassName='is-active'><li><FiHome/> <span>Dashboard</span></li></NavLink> 
                <li className="has-submenu" onClick={this.toggleProjectsDropdown}>
                  <FiFolder/>
                  <span>Projetos</span>
                  <div className={this.state.projectsDropDown ? 'submenu opened-submenu' : 'submenu closed-submenu'}>
                    <NavLink to="/createproject" activeClassName='is-active'><div className="submenu-item">Criar Projeto</div></NavLink>
                    <NavLink to="/projects" activeClassName='is-active'><div className="submenu-item">Ver Todos</div></NavLink>
                    <NavLink to="/projects" activeClassName='is-active'><div className="submenu-item">Ver Concluídos</div></NavLink>
                  </div>
                </li>
                <li className="has-submenu" onClick={this.toggleTasksDropdown}>
                  <FiFileText/>
                  <span>Tarefas</span>
                  <div className={this.state.tasksDropDown ? 'submenu opened-submenu' : 'submenu closed-submenu'}>
                    <NavLink to="/createtask" activeClassName='is-active'><div className="submenu-item">Criar Tarefa</div></NavLink>
                    <NavLink to="/tasks" activeClassName='is-active'><div className="submenu-item">Ver Todas</div></NavLink>
                    <NavLink to="/tasks" activeClassName='is-active'><div className="submenu-item">Ver Concluídas</div></NavLink>
                  </div>
                </li>
                <NavLink to="/clients" activeClassName='is-active'><li><FiUser/> <span>Clientes</span></li></NavLink>
                <NavLink to="/meetings" activeClassName='is-active'><li><FiCalendar/> <span>Reuniões</span></li></NavLink>
                <NavLink to="/billing" activeClassName='is-active'><li><FiBookmark/> <span>Contabilidade</span></li></NavLink>
                <li className="has-submenu" onClick={this.toggleCompanyDropdown}>
                  <FiUsers/>
                  <span>Empresa</span>
                  <div className={this.state.companyDropDown ? 'submenu opened-submenu' : 'submenu closed-submenu'}>
                    <NavLink to="/budgets" activeClassName='is-active'><div className="submenu-item">Orçamentos</div></NavLink>
                    <NavLink to="/vacations" activeClassName='is-active'><div className="submenu-item">Férias</div></NavLink>
                    <NavLink to="/team" activeClassName='is-active'><div className="submenu-item">Equipa</div></NavLink>
                  </div>
                </li>
                <li onClick={this.props.logout}><FiLogOut/> <span>Log Out</span></li>
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

export default SideBar;
