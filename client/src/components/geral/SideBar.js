import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/Sidebar';
import { FaFolderOpen, FaClipboard, FaCalendar, FaUsers, FaTasks, FaStopwatch, FaListUl } from 'react-icons/fa';

class SideBar extends Component {
  render() {
    return (
      <SidebarDiv>
        <div className="logo">
            <img alt="Invisual Branding Solutions" src="/img/logo.png"/>
        </div>
        <div className="navigation">
            <ul>
                <li><FaFolderOpen/> <span>Projectos</span></li>  
                <li><FaClipboard/> <span>Tarefas</span></li>  
                <li><FaCalendar/> <span>Reuniões</span></li>  
                <li><FaUsers/> <span>Clientes</span></li>  
                <li><FaTasks/> <span>Objectivos</span></li>  
                <li><FaStopwatch/> <span>Histórico Trabalho</span></li>  
                <li><FaListUl/> <span>To-Do</span></li>  
            </ul>
        </div>
        <div className="footer">
          <p>Tarefas - Invisual Branding Solutions © 2019</p>
        </div>
      </SidebarDiv>
    );
  }
}

export default SideBar;
