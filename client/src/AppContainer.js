import React, { Component } from 'react';
import App from './App';

class AppContainer extends Component {
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

  logout = () => {
    this.setState({
      loggedIn: false,
      userInfo: {},
      token: ''
    }, () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
        this.setState({ userInfo: loggedUserStorage });
      } catch (e) {
        this.setState({ userInfo: loggedUserStorage });
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
    return <App loggedIn={this.state.loggedIn} login={this.login} logout={this.logout} userInfo={this.state.userInfo} />
  }
}

export default AppContainer;
