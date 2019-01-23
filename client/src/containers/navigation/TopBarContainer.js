import React, { Component } from 'react';
import { TopBarDiv } from '../../styles/navigation';
import {TopBar} from '../../components/navigation/TopBar'
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

class TopBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
      displayMenu2: false,

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
    var currState = this.state[s];
    this.setState({ [s]: !currState });
  }

  hideDropdownMenu = () => {
    this.setState({
      displayMenu: false,
      displayMenu2: false
    })
  }

  componentDidMount(){
    document.querySelector('body').addEventListener('click', ()=>this.hideDropdownMenu());
  }

  render() {

    return (
      <TopBar 
      showDropdownMenu={this.showDropdownMenu}
      hideDropdownMenu={this.hideDropdownMenu}
      displayMenu={this.state.displayMenu}
      displayMenu2={this.state.displayMenu2}
      messages={this.state.messages} 
      notifications={this.state.notifications} 
      />
    );
  }
}

export default TopBarContainer;
