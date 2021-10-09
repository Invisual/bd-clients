import React, { Component } from 'react'
import { SidebarDiv } from '../../styles/navigation'
import { FiUsers, FiUser, FiBookOpen } from 'react-icons/fi'
import { NavLink, withRouter } from 'react-router-dom'

class SideBar extends Component {
  render() {
    var logoImg = '/img/in-new-white.png'
    var logoClass = 'logo logo-small'
    var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role
    return (
      <SidebarDiv className="sidebar-container">
        <div className="menu-logo-container">
          <div className={logoClass}>
            <img alt="Invisual Branding Solutions" src={logoImg} />
          </div>
          <div className="navigation">
            <ul>
              <NavLink to="/clients" activeClassName="is-active">
                <li>
                  <FiUsers />
                </li>
              </NavLink>
              {userRole === 0 && (
                <NavLink to="/team" activeClassName="is-active">
                  <li>
                    <FiUser />
                  </li>
                </NavLink>
              )}
              {userRole === 0 && (
                <NavLink to="/records" activeClassName="is-active">
                  <li>
                    <FiBookOpen />
                  </li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="sidebar-logout" onClick={this.showDropdownUser}>
          <img
            src={this.props.userInfo.avatar_user}
            alt="Avatar"
            style={{ borderRadius: '50%' }}
            width="35px"
            height="35px"
            id="topbar-user-img"
          />
          <span id="topbar-user-name">{this.props.userInfo.name_user}</span>
          <span id="logout" onClick={this.props.logout}>
            Logout
          </span>
        </div>
      </SidebarDiv>
    )
  }
}

export default withRouter(SideBar)
