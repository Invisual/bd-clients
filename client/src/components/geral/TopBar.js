import React, { Component } from 'react';
import {TopBarDiv} from '../../styles/navigation'
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

class TopBar extends Component {
  render() {
    return (
      <TopBarDiv>
        <ul class="main-nav">
          <li class="search-field"><input type="text" placeholder="Search" /><FaSearch /></li>
          <li><a href="#"><FaComment /></a></li>
          <li><a href="#"><FaBell /></a></li>
          <li class="avatar-section"><a href="#"><span>Tiago </span><img src="https://tarefas.invisual.pt/img/users/tiagoribeiro.jpg" alt="Avatar" style={{borderRadius: "50%" }} width="35px" height="35px"  /></a></li>
       </ul>
      </TopBarDiv>
    );
  }
}

export default TopBar;
