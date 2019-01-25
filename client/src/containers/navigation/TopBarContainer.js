import React, { Component } from 'react';
import {TopBar} from '../../components/navigation/TopBar'

class TopBarContainer extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      displayDropdownMessages: false,
      displayDropdownNotifications: false,
      displayDropdownUser: false,
      displaySearchInput: '',
      messages : [
        {
          id: 1,
          title: 'Boa tarde'
        },
        {
          id: 2,
          title: 'Boa Noite'
        },
        {
          id: 3,
          title: 'Bom dia'
        },
        {
          id: 4,
          title: 'Mekieeee'
        },
        {
          id: 5,
          title: 'Hola señor'
        }
      ],
    notifications : [
        {
          id: 1,
          title: 'Notificação 1'
        },
        {
          id: 2,
          title: 'Notificação 2'
        },
        {
          id: 3,
          title: 'Notificação 3'
        }
      ]
  }
  }

  showDropdownMenu = (s) => {
    this.setState(prevState => ({
      [s]: !prevState[s]
    }));
  }

  hideDropdownMenu = () => {
    if(this._isMounted){
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
    document.body.addEventListener('click', (e)=>{this.hideDropdownMenu()})
  }

  componentWillUnmount(){
    this._isMounted = false;
    document.body.removeEventListener('click', ()=>this.hideDropdownMenu())
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
      messages={this.state.messages} 
      notifications={this.state.notifications}
      />
    );
  }
}

export default TopBarContainer;
