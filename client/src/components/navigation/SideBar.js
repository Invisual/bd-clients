import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import {themeColors} from '../../styles/themeConsts';
import { FiHome, FiFolder, FiFileText, FiCalendar, FiBookmark, FiWatch, FiEdit, FiLogOut } from 'react-icons/fi';
import {Link} from 'react-router-dom';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsedSidebar: false
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => ({
      collapsedSidebar: !prevState.collapsedSidebar
    }))
  }

  componentDidUpdate(){
    this.state.collapsedSidebar ? document.body.classList.add('collapsed-sidebar') : document.body.classList.remove('collapsed-sidebar')
  }


  render() {

    var logoImg = this.state.collapsedSidebar ? '/img/in.png' : '/img/logo.png';
    var logoClass = this.state.collapsedSidebar ? 'logo logo-small' : 'logo logo-big';

    return (
      <SidebarDiv className="sidebar-container" colors={themeColors}>
        <div className={logoClass}>
            <img alt="Invisual Branding Solutions" src={logoImg}/>
        </div>
        <div className="navigation">
            <ul>
                <Link to="/"><li><FiHome/> <span>Dashboard</span></li></Link> 
                <Link to="/"><li><FiFolder/> <span>Projectos</span></li></Link> 
                <Link to="/admin"><li><FiFileText/> <span>Tarefas</span></li></Link>
                <Link to="/"><li><FiCalendar/> <span>Reuniões</span></li></Link>
                <Link to="/"><li><FiHome/> <span>Clientes</span></li></Link>
                <Link to="/"><li><FiBookmark/> <span>Objectivos</span></li></Link>
                <Link to="/"><li><FiWatch/> <span>Histórico</span></li></Link>  
                <Link to="/"><li><FiEdit/> <span>To-Do List</span></li></Link>
                <li onClick={this.props.logout}><FiLogOut/> <span>Log Out</span></li>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider rounded-slider" onClick={this.toggleSideBar}></span>
                </label>
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
