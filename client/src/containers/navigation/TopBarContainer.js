import React, { Component } from 'react';
import {TopBar} from '../../components/navigation/TopBar'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class TopBarContainer extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      displayDropdownMessages: false,
      displayDropdownNotifications: false,
      displayDropdownUser: false,
      displayDropdownCreate: false,
      displaySearchInput: '',
      sideBarForIpad: false
    }
  }

  showDropdownMenu = () => {
    this.setState({displayDropdownNotifications: !this.state.displayDropdownNotifications}, () => {
      if(this.state.displayDropdownNotifications){
        this.setState({displayDropdownCreate: false, displayDropdownUser: false})
      }
    })
  }

  showDropdownUser = () => {
    this.setState({displayDropdownUser: !this.state.displayDropdownUser}, () => {
      if(this.state.displayDropdownUser){
        this.setState({displayDropdownCreate: false, displayDropdownNotifications: false})
      }
    })
  }

  showDropdownCreate = () => {
    this.setState({displayDropdownCreate: !this.state.displayDropdownCreate}, () => {
      if(this.state.displayDropdownCreate){
        this.setState({displayDropdownUser: false, displayDropdownNotifications: false})
      }
    })
  }

  hideDropdownMenu = (e) => {
    if(this._isMounted && e.target.id !== 'notificationsli' && e.target.id !== 'createicon' && e.target.id !== 'notificationsicon' 
      && e.target.id !== 'notificationsnumber' && e.target.classList[0] !== 'notification' && e.target.nodeName !== 'line'
      && e.target.classList[0] !== 'notificationlink' && e.target.id !== 'topbar-user-name' && e.target.nodeName !== 'path'
      && e.target.id !== 'topbar-user-img' && e.target.id !== 'topbar-user-link1'
      && e.target.id !== 'topbar-user-link2' && e.target.id !== 'topbar-user-link3'
      && e.target.id !== 'topbar-user-link4' && e.target.id !== 'topbar-user-link5'){
      this.setState({
        displayDropdownMessages: false,
        displayDropdownNotifications: false,
        displayDropdownUser: false,
        displayDropdownCreate: false
      })
    }
  }

  toggleSearchInput = () => {
    if(this.state.displaySearchInput === '' || this.state.displaySearchInput === 'hidesearch'){
      this.setState({displaySearchInput: 'showsearch'})
    }
    else if(this.state.displaySearchInput === 'showsearch'){
      this.setState({displaySearchInput: 'hidesearch'})
    }
  }

  toggleSideBarForIpad = () => {
    this.setState((prevState) => ({sideBarForIpad: !prevState.sideBarForIpad}), () => {
      if(this.state.sideBarForIpad){
        document.body.classList.add('mobile-sidebar')
      }
      else{
        document.body.classList.remove('mobile-sidebar')
      }
    })
  }

  componentDidMount(){
    this._isMounted = true;
    document.body.addEventListener('click', (e)=>{this.hideDropdownMenu(e)})
  }

  componentWillUnmount(){
    this._isMounted = false;
    document.body.removeEventListener('click', ()=>this.hideDropdownMenu())
  }

  goBackHistory = () => {
    history.goBack();
  }

  render() {  
    return (
      <TopBar 
        showDropdownMenu={this.showDropdownMenu}
        showDropdownUser={this.showDropdownUser}
        showDropdownCreate={this.showDropdownCreate}
        hideDropdownMenu={this.hideDropdownMenu}
        displayDropdownMessages={this.state.displayDropdownMessages}
        displayDropdownNotifications={this.state.displayDropdownNotifications}
        displayDropdownUser={this.state.displayDropdownUser}
        displayDropdownCreate={this.state.displayDropdownCreate}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        notifications={this.props.notifications}
        userInfo={this.props.userInfo}
        canGoBack={this.props.canGoBack}
        goBackHistory={this.goBackHistory}
        setNotificationsSeen={this.props.setNotificationsSeen}
        setNotificationOpened={this.props.setNotificationOpened}
        openModal={this.props.openModal}
        logout={this.props.logout}
        changeEditHourId={this.props.changeEditHourId}
        toggleSideBarForIpad={this.toggleSideBarForIpad}
      />
    );
  }
}

export default TopBarContainer;
