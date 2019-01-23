import React from 'react';
import { TopBarDiv } from '../../styles/navigation';
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

export const TopBar = props => {
  return (
    <TopBarDiv>
      <ul className="main-nav">
        <li className="topbar-search">
          <input type="text" placeholder="Search" />
          <FaSearch />
        </li>
        <li className="topbar-messages" onClick={() => props.showDropdownMenu('displayMenu')}>
          <p>2</p>
          <span>
            <FaComment />
          </span>
          {props.displayMenu ? (
            <ul>
              {props.messages.map(message => {
                return (
                  <li key={message.id} id={message.id}>
                    {message.title}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </li>
        
        <li className="topbar-notifications" onClick={() => props.showDropdownMenu('displayMenu2')}>
          <p>1</p>
          <span>
            <FaBell />
          </span>
          {props.displayMenu2 ? (
            <ul>
              {props.notifications.map(notification => {
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
};
