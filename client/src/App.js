import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import AdminDashboardContainer from './containers/dashboard/AdminDashboardContainer';
import './styles/main.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <TopBarContainer />
          <SideBar />
          <Route exact path="/" render={props => <UserDashboardContainer {...props} name="teste" />} />
          <Route path="/admin" render={props => <AdminDashboardContainer {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
