import React from 'react'
import { TopBarDiv } from '../../styles/navigation'
import { FiChevronLeft } from 'react-icons/fi'

export const TopBar = props => {
  return (
    <TopBarDiv className="topbar-nav">
      <div className="hamburguer-icon" onClick={props.toggleSideBarForIpad}>
        <div className="hamburguer-bar"></div>
        <div className="hamburguer-bar"></div>
        <div className="hamburguer-bar"></div>
      </div>
      <ul className="main-nav">
      {props.canGoBack ? <li className="topbar-goback"> <FiChevronLeft onClick={props.goBackHistory}/></li> : null}
        
        <li className="topbar-avatar" onClick={() => props.showDropdownUser()}>
          <span id="topbar-user-name">{props.userInfo.name_user}</span>
          <img
            src={props.userInfo.avatar_user}
            alt="Avatar"
            style={{ borderRadius: '50%' }}
            width="35px"
            height="35px"
            id="topbar-user-img"
          />
          {props.displayDropdownUser ? (
            <ul className="notifications-dropdown show-notifications user-dropdown">
              <li id="topbar-user-link4" onClick={props.logout}>Terminar Sessão</li>
            </ul>
          ) : null}
        </li>
      </ul>
    </TopBarDiv>
  );
};
