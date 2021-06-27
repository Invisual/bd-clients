import React from 'react'
import { TopBarDiv } from '../../styles/navigation'
import { NavLink } from 'react-router-dom';
import { FiUsers, FiUser } from 'react-icons/fi';


export const TopBar = props => {
    var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role

    return (
        <TopBarDiv className="topbar-nav">
            <div className="navigation">
                    <ul>
                        <NavLink to="/clients" activeClassName='is-active'><li><FiUsers/></li></NavLink>
                        {userRole === 3 && <NavLink to="/team" activeClassName='is-active'><li><FiUser/></li></NavLink>}
                    </ul>
            </div>
            <div className="sidebar-logout" onClick={props.showDropdownUser}>
                <img
                    src={props.userInfo.avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="35px"
                    height="35px"
                    id="topbar-user-img"
                />
                <span id="topbar-user-name">{props.userInfo.name_user}</span>
                <span id="logout" onClick={props.logout}>Logout</span>
            </div>
        </TopBarDiv>
    );
};
