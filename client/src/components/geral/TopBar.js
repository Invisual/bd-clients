import React, { Component } from 'react';
import {TopBarDiv} from '../../styles/navigation'
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

class TopBar extends Component {
  render() {
    return (
      <TopBarDiv>
        <ul className="main-nav">
          <li className="search-field"><input type="text" placeholder="Search" /><FaSearch /></li>
          <li><FaComment /></li>
          <li><FaBell /></li>
          <li className="avatar-section"><span>Tiago </span><img src="https://tarefas.invisual.pt/img/users/tiagoribeiro.jpg" alt="Avatar" style={{borderRadius: "50%" }} width="35px" height="35px"  /></li>
       </ul>
      </TopBarDiv>
    );
  }
}

export default TopBar;
