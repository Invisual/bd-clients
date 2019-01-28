import React, { Component } from 'react';
import {SidebarDiv} from '../../styles/navigation';
import { FiHome } from 'react-icons/fi';
import {Link} from 'react-router-dom';

class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      expandedSidebar: false
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => ({
      expandedSidebar: !prevState.expandedSidebar
    }))
  }

  componentDidUpdate(){
    this.state.expandedSidebar ? document.body.classList.add('expanded-sidebar') : document.body.classList.remove('expanded-sidebar')
  }


  render() {
    return (
      <SidebarDiv className="sidebar-container">
        <div className="logo">
            <img alt="Invisual Branding Solutions" src="/img/logo.png"/>
        </div>
        <div className="navigation">
            <ul>
                <Link to="/"><li><FiHome/> <span>Projectos</span></li></Link> 
                <Link to="/admin"><li><FiHome/> <span>Tarefas</span></li></Link>
                <Link to="/"><li><FiHome/> <span>Reuniões</span></li></Link>
                <Link to="/"><li><FiHome/> <span>Clientes</span></li></Link>
                <Link to="/"><li><FiHome/> <span>Objectivos</span></li></Link>
                <Link to="/"><li><FiHome/> <span>Histórico</span></li></Link>  
                <Link to="/"><li><FiHome/> <span>To-Do List</span></li></Link>
                <li onClick={this.props.logout}><FiHome/> <span>Log Out</span></li>
                <li onClick={this.toggleSideBar}>Toggle</li>
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
