import React, { Component } from 'react';
import App from './App';
import TitleTimer from './components/misc/TitleTimer'
import { withRouter } from "react-router-dom";
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()
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
      activeBudgetHours:'',
      latestActiveBudgetHour: '',
      notifications:[],
      canGoBack: false
    }
  }

  login = (user, token) => {
    this.setState({
      loggedIn: true,
      userInfo: user,
      token: token
    }, () => this.getNotifications())
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
      history.replace('/')
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
        this.setState({ userInfo: loggedUserStorage }, () => this.getNotifications());
      } catch (e) {
        this.setState({ userInfo: loggedUserStorage }, () => this.getNotifications());
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

  getActiveBudgetHours = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/hours/active/budget/${user.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nohours') {
        this.setState({ activeBudgetHours: null, latestActiveBudgetHour: null});
      } else {
        this.setState({ activeBudgetHours: res.data, latestActiveBudgetHour: res.data[0].beginning_hour});
      }
    });
  }

  notificationsInterval = 0

  getNotifications = () => {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      axios.get(`/api/misc/notifications/${this.state.userInfo.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
        if (res.data !== 'nodata') {
          this.setState({ notifications: res.data});
        }
      });
  }

  setNotificationsSeen = () => {
      var notificationsIds = []
      this.state.notifications.map(not => notificationsIds.push(not.id_notification))
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      axios.put('/api/misc/notifications/seen', {notifications: notificationsIds}, { headers: { Authorization: AuthStr } })
      .then((res) => { 
        if(res.data !== 'error'){this.getNotifications() }
        else{console.log('error')}
      })
  }

  setNotificationOpened = (id) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.put('/api/misc/notifications/opened', {id: id}, { headers: { Authorization: AuthStr } })
    .then((res) => { 
      if(res.data !== 'error'){
        this.getNotifications()
      }
      else{console.log('error')}
    })
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    if (localStorage.hasOwnProperty('user')) {this.getActiveHours();this.getActiveBudgetHours();}
    if(this.props.location.pathname.indexOf('tasks/') !== -1){
      this.setState({canGoBack : true})
    }
    this.notificationsInterval = setInterval(this.getNotifications, 30000)
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


  componentWillUnmount(){
    clearInterval(this.notificationsInterval)
  }


  render() {
    return (
            <>
              <TitleTimer latestActiveHour={this.state.latestActiveHour} latestActiveBudgetHour={this.state.latestActiveBudgetHour} />
              <App 
                canGoBack={this.state.canGoBack} 
                loggedIn={this.state.loggedIn} 
                login={this.login} 
                logout={this.logout} 
                userInfo={this.state.userInfo} 
                activeHours={this.state.activeHours} 
                getActiveHours={this.getActiveHours} 
                activeBudgetHours={this.state.activeBudgetHours} 
                getActiveBudgetHours={this.getActiveBudgetHours}
                notifications={this.state.notifications}
                setNotificationsSeen={this.setNotificationsSeen}
                setNotificationOpened={this.setNotificationOpened}
              />
            </>
            )
  }
}

export default withRouter(props => <AppContainer  {...props} />);
