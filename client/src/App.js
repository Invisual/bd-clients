import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import AdminDashboardContainer from './containers/dashboard/AdminDashboardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import './styles/main.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: {},
      token: ''
    }
  }
  render() {
    return (
      <BrowserRouter>
        {this.state.loggedIn ? 
          <div className="app-container">
            <TopBarContainer />
            <SideBar />
            <Route exact path="/" render={props => <UserDashboardContainer {...props} name="teste" />} />
            <Route path="/admin" render={props => <AdminDashboardContainer {...props} />} />
          </div> 
          : 
          <LoginContainer />}
      </BrowserRouter>
    );
  }
}

export default App;
