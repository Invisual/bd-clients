import React, { Component } from 'react';
import App from './App';
import TitleTimer from './components/misc/TitleTimer'
import { withRouter } from "react-router-dom";
const axios = require('axios');

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: {},
      token: '',
      activeHours:'',
      latestActiveHour: '', 
      canGoBack: false
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

  getActiveHours = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/hours/active/${user.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nohours') {
        this.setState({ activeHours: null, latestActiveHour: null});
      } else {
        this.setState({ activeHours: res.data, latestActiveHour: res.data[0].beginning_hour});
      }
    });
  }


  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    if (localStorage.hasOwnProperty('user')) {this.getActiveHours();}
    if(this.props.location.pathname.indexOf('tasks/') !== -1){
      this.setState({canGoBack : true})
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if(this.props.location.pathname.indexOf('tasks/') !== -1 || this.props.location.pathname.indexOf('projects/') !== -1 || this.props.location.pathname.indexOf('clients/') !== -1){
        this.setState({canGoBack : true})
      }
        else {
          this.setState({canGoBack : false})
      }
    }
  }


  render() {
    return (
            <>
              <TitleTimer latestActiveHour={this.state.latestActiveHour}/>
              <App canGoBack={this.state.canGoBack} loggedIn={this.state.loggedIn} login={this.login} logout={this.logout} userInfo={this.state.userInfo} activeHours={this.state.activeHours} getActiveHours={this.getActiveHours}/>
            </>
            )
  }
}

export default withRouter(props => <AppContainer  {...props} />);
