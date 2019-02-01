import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import AdminDashboardContainer from './containers/dashboard/AdminDashboardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import ResetPasswordContainer from './containers/auth/ResetPasswordContainer';
import AllTasksContainer from './containers/lists/AllTasksContainer';
import './styles/main.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.loggedIn ? 
          <div className="app-container">
            <TopBarContainer userInfo={this.props.userInfo} />
            <SideBar logout={this.props.logout}/>
            <Route exact path="/" render={props => <UserDashboardContainer {...props} />} />
            <Route path="/tasks" render={props => <AllTasksContainer {...props} />} />
            <Route path="/admin" render={props => <AdminDashboardContainer {...props} />} />
          </div> 
          : 
          <div className="app-container">
            <Route exact path="/" render={props => <LoginContainer {...props} login={this.props.login}/>} />
            <Route exact path="/resetpassword" render={props => <ResetPasswordContainer {...props} />} />
          </div>
        }
      </BrowserRouter>
    );
  }
}


export default App;
