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
      displaySearchInput: '',
    }
  }

  showDropdownMenu = () => {
    this.setState({displayDropdownNotifications: !this.state.displayDropdownNotifications})
  }

  hideDropdownMenu = (e) => {
    if(this._isMounted && e.target.id !== 'notificationsli' && e.target.id !== 'notificationsicon' && e.target.id !== 'notificationsnumber' && e.target.classList[0] !== 'notification' && e.target.classList[0] !== 'notificationlink'){
      this.setState({
        displayDropdownMessages: false,
        displayDropdownNotifications: false,
        displayDropdownUser: false
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
        hideDropdownMenu={this.hideDropdownMenu}
        displayDropdownMessages={this.state.displayDropdownMessages}
        displayDropdownNotifications={this.state.displayDropdownNotifications}
        displayDropdownUser={this.state.displayDropdownUser}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        notifications={this.props.notifications}
        userInfo={this.props.userInfo}
        canGoBack={this.props.canGoBack}
        goBackHistory={this.goBackHistory}
        setNotificationsSeen={this.props.setNotificationsSeen}
        setNotificationOpened={this.props.setNotificationOpened}
      />
    );
  }
}

export default TopBarContainer;
