import React, { Component } from 'react';
import SideBar from './components/geral/SideBar';
import TopBar from './components/geral/TopBar';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import './styles/main.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <TopBar />
          <SideBar />
          <Route exact path="/" render={props => <UserDashboard {...props} name="teste" />} />
          <Route path="/admin" render={props => <AdminDashboard {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
