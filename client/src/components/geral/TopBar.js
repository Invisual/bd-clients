import React, { Component } from 'react';
import {TopBarDiv} from '../../styles/TopBar'
import { FaSearch, FaComment, FaBell } from 'react-icons/fa';

class TopBar extends Component {
  render() {
    return (
      <TopBarDiv>
        <ul class="main-nav">
          <li class="search-field"><input type="text" placeholder="Search" /></li>
          <li><a href="#"><FaComment />Mensagens</a></li>
          <li><a href="#"><FaBell />Notificações</a></li>
          <li><a href="#">User</a></li>
       </ul>
      </TopBarDiv>
    );
  }
}

export default TopBar;
