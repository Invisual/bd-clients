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
    }
  }

  showDropdownMenu = () => {
    this.setState({displayDropdownNotifications: !this.state.displayDropdownNotifications})
  }

  showDropdownUser = () => {
    this.setState({displayDropdownUser: !this.state.displayDropdownUser})
  }

  showDropdownCreate = () => {
    this.setState({displayDropdownCreate: !this.state.displayDropdownCreate})
  }

  hideDropdownMenu = (e) => {
    if(this._isMounted && e.target.id !== 'notificationsli' && e.target.id !== 'notificationsicon' 
      && e.target.id !== 'notificationsnumber' && e.target.classList[0] !== 'notification' 
      && e.target.classList[0] !== 'notificationlink' && e.target.id !== 'topbar-user-name'
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
      />
    );
  }
}

export default TopBarContainer;
