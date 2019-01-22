import React, { Component } from 'react';
import { TopBarDiv } from '../../styles/navigation';
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
      displayMenu2: false
    };
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
    var messages = [
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
    ];
    var notifications = [
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
    ];

    return (
      <TopBarDiv>
        <ul className="main-nav">
          <li className="topbar-search">
            <input type="text" placeholder="Search" />
            <FaSearch />
          </li>
          <li className="topbar-messages" onClick={() => this.showDropdownMenu('displayMenu')}>
            <p>2</p>
            <span>
              <FaComment />
            </span>
            {this.state.displayMenu ? (
              <ul>
                {messages.map(message => {
                  return (
                    <li key={message.id} id={message.id}>
                      {message.title}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>

          <li className="topbar-notifications"  onClick={() => this.showDropdownMenu('displayMenu2')}>
            <p>1</p>
            <span>
              <FaBell />
            </span>
            {this.state.displayMenu2 ? (
              <ul>
                {notifications.map(notification => {
                  return (
                    <li key={notification.id} id={notification.id}>
                      {notification.title}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
          <li className="topbar-avatar">
            <span>Tiago </span>
            <img
              src="https://tarefas.invisual.pt/img/users/tiagoribeiro.jpg"
              alt="Avatar"
              style={{ borderRadius: '50%' }}
              width="35px"
              height="35px"
            />
          </li>
        </ul>
      </TopBarDiv>
    );
  }
}

export default TopBar;
