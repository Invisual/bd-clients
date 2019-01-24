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

  login = (user, token) => {
    this.setState({
      loggedIn: true,
      userInfo: user,
      token: token
    })
  }

  hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty('loggedIn')) {
      let loggedInStorage = localStorage.getItem('loggedIn');
      loggedInStorage = JSON.parse(loggedInStorage);
      try {
        this.setState({ loggedIn: loggedInStorage });
      } catch (e) {
        this.setState({ loggedIn: loggedInStorage });
      }
    }

    if (localStorage.hasOwnProperty('user')) {
      let loggedUserStorage = localStorage.getItem('user');
      loggedUserStorage = JSON.parse(loggedUserStorage);
      try {
        this.setState({ user: loggedUserStorage });
      } catch (e) {
        this.setState({ user: loggedUserStorage });
      }
    }

    if (localStorage.hasOwnProperty('token')) {
      let tokenStorage = localStorage.getItem('token');
      tokenStorage = JSON.parse(tokenStorage);
      try {
        this.setState({ token: tokenStorage });
      } catch (e) {
        this.setState({ token: tokenStorage });
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
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
          <LoginContainer login={this.login}/>}
      </BrowserRouter>
    );
  }
}

export default App;
