import React, { Component } from 'react';
import App from './App';
import { withRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: {},
      token: '',
      isAccountDashboard: false,
      shouldTodosUpdate: false,
      canGoBack: false
    }

  }

  changeIsAccountDashboard = () => this.setState(prevState => ({ isAccountDashboard: !prevState.isAccountDashboard }))

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

  openModal = (modal) => {
    document.getElementById('overlay').addEventListener('click', () => this.closeModal(modal))
    document.body.classList.add('has-modal', `modal-${modal}`)
  }

  closeModal = (modal) => {
    document.getElementById('overlay').removeEventListener('click', () => this.closeModal(modal))
    document.body.classList.remove('has-modal', `modal-${modal}`)
  }


  componentDidMount() {
    console.log('%c Made with ❤ by INvisual - Eduardo, Lina & Tiago', 'background: #006cff; color: #fff');
    console.log('%c Acho que o Guga também merece estar nesta versão ❤', 'background: #006cff; color: #fff');
    this.hydrateStateWithLocalStorage();
  }

  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if(this.props.location.pathname.indexOf('clients/') !== -1){
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
              <App 
                canGoBack={this.state.canGoBack} 
                loggedIn={this.state.loggedIn} 
                login={this.login} 
                logout={this.logout} 
                userInfo={this.state.userInfo} 
                openModal={this.openModal}
                closeModal={this.closeModal}
                isAccountDashboard={this.state.isAccountDashboard}
                changeIsAccountDashboard={this.changeIsAccountDashboard}
              />
            </>
            )
  }
}

export default withRouter(props => <AppContainer  {...props} />);
