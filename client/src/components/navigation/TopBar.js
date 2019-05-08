import React from 'react';
import { TopBarDiv } from '../../styles/navigation';
import { FiSearch, FiMessageCircle, FiBell, FiChevronLeft } from 'react-icons/fi';

export const TopBar = props => {
  return (
    <TopBarDiv>
      
      <ul className="main-nav">
      {props.canGoBack ? <li className="topbar-goback"> <FiChevronLeft onClick={props.goBackHistory}/></li> : null}
        <li className="topbar-search">
          <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+' searchinput'} />
          <FiSearch onClick={props.toggleSearchInput}/>
        </li>

        <li className="topbar-notifications" onClick={() => props.showDropdownMenu('displayDropdownNotifications')}>
          <div className="notification-number"><span>10</span></div>
          <span>
            <FiBell />
          </span>
          {props.displayDropdownNotifications ? (
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

        <li className="topbar-messages" onClick={() => {props.showDropdownMenu('displayDropdownMessages')}}>
          <div className="notification-number"><span>2</span></div>
          <span>
            <FiMessageCircle />
          </span>
          {props.displayDropdownMessages ? (
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

        <li className="topbar-avatar" onClick={() => props.showDropdownMenu('displayDropdownUser')}>
          <span>{props.userInfo.name_user}</span>
          <img
            src={props.userInfo.avatar_user}
            alt="Avatar"
            style={{ borderRadius: '50%' }}
            width="35px"
            height="35px"
          />
          {props.displayDropdownUser ? (
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
      </ul>
    </TopBarDiv>
  );
};
