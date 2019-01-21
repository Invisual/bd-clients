import React, { Component } from 'react';
import SideBar from './components/geral/SideBar';
import UserDashboard from './components/dashboard/UserDashboard';
import './styles/main.css';
//import {ContainerDiv} from './styles/styledDiv'

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <TopBar />
        <SideBar />
        <UserDashboard />
      </div>
    );
  }
}

export default App;
