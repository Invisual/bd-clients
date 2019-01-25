import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import { FaFolderOpen, FaClipboard, FaCalendar, FaUsers, FaTasks, FaStopwatch, FaListUl, FaSignOutAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';

class SideBar extends Component {
  render() {
    return (
      <SidebarDiv>
        <div className="logo">
            <img alt="Invisual Branding Solutions" src="/img/logo.png"/>
        </div>
        <div className="navigation">
            <ul>
                <Link to="/"><li><FaFolderOpen/> <span>Projectos</span></li></Link> 
                <Link to="/admin"><li><FaClipboard/> <span>Tarefas</span></li></Link>
                <Link to="/"><li><FaCalendar/> <span>Reuniões</span></li></Link>
                <Link to="/"><li><FaUsers/> <span>Clientes</span></li></Link>
                <Link to="/"><li><FaTasks/> <span>Objectivos</span></li></Link>
                <Link to="/"><li><FaStopwatch/> <span>Histórico Trabalho</span></li></Link>  
                <Link to="/"><li><FaListUl/> <span>To-Do</span></li></Link>
                <li onClick={this.props.logout}><FaSignOutAlt/> <span>Log Out</span></li>
            </ul>
        </div>
        <div className="footer">
          <a href="https://invisual.pt/"><p>Tarefas - Invisual © 2019</p></a>
        </div>
      </SidebarDiv>
    );
  }
}

export default SideBar;
