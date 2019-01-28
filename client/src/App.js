import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import AdminDashboardContainer from './containers/dashboard/AdminDashboardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import './styles/main.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.loggedIn ? 
          <div className="app-container">
            <TopBarContainer />
            <SideBar logout={this.props.logout}/>
            <Route exact path="/" render={props => <UserDashboardContainer {...props} />} />
            <Route path="/admin" render={props => <AdminDashboardContainer {...props} />} />
          </div> 
          : 
          <LoginContainer login={this.props.login}/>}
      </BrowserRouter>
    );
  }
}


export default App;
