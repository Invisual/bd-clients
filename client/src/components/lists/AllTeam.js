import React from 'react'
import { AllClientsDiv } from '../../styles/listings'
import TeamListContainer from '../../containers/tables/TeamListContainer'
import TeamMemberDetailContainer from '../../containers/details/TeamMemberDetailContainer'
import InsertUserInfo from '../../components/inserts/InsertUserInfo'
import { FiUserPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const AllTeam = props => {
  return (
    <AllClientsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow team-members-grid">
        <div className="grid-widget tasks-title">
          <div className="grid-widget left-options">
            <div className="tooltip-container client-search">
              <input
                type="text"
                placeholder="Pesquisa"
                id="team-search"
                className="showsearch searchinput"
                onChange={props.changeSearchQuery}
              />
            </div>
            {props.userRole === 0 ? (
              <div className="tooltip-container">
                <Link to="/createuser">
                  <FiUserPlus />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid-widget tasks-options">
          <h4 className="widget-title">Utilizadores</h4>
        </div>
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <TeamListContainer
              type="allmembers"
              changeActiveMember={props.changeActiveMember}
              activeMember={props.activeMember}
              searchQuery={props.searchQuery}
              reloadMembers={props.reloadMembers}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          {props.infosAreActive ? (
            <InsertUserInfo activeMember={props.activeMember} />
          ) : (
            <TeamMemberDetailContainer
              activeMember={props.activeMember}
              memberContent={props.memberContent}
              changeActiveTab={props.changeActiveTab}
              activeTab={props.activeTab}
              isLoading={props.isLoading}
              filters={props.filters}
              openModal={props.openModal}
              userInfo={props.userInfo}
            />
          )}
        </div>
      </div>
    </AllClientsDiv>
  )
}
