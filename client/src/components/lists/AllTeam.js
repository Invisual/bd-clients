import React from 'react'
import { AllClientsDiv } from '../../styles/listings';
import TeamListContainer from '../../containers/tables/TeamListContainer';
import TeamMemberDetailContainer from '../../containers/details/TeamMemberDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import { FiUserPlus, FiSearch } from 'react-icons/fi';

export const AllTeam = props => {
    return (
        <AllClientsDiv className="dashboard-container">
            <div className="widgets-grid widget cards-container nofixed-height no-shadow team-members-grid">
                <div className="grid-widget tasks-title">
                    <h4 className="widget-title">Equipa</h4>
                    <div className="client-search">
                        <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+ ' searchinput'} onChange={props.changeSearchQuery}/>
                        <FiSearch onClick={props.toggleSearchInput}/>
                    </div>
                    {props.userRole === 3 || props.userRole === 2 ? <div className="tooltip-container"><span className="tooltip">Adicionar Utilizador</span><FiUserPlus /></div> : null}
                </div>
                    <OptionsContainer
                    userRole={props.userRole}
                    type={'teamoptions'}
                    activeMember={props.activeMember}
                    memberContent={props.memberContent}
                    isLoading={props.isLoading}
                    deleteActiveMember={props.deleteActiveMember}
                    duplicateActiveTask={props.duplicateActiveTask}
                    editActiveTask={props.editActiveTask}
                    />
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
                    <TeamMemberDetailContainer
                        activeMember={props.activeMember}
                        memberContent={props.memberContent}
                        changeActiveTab={props.changeActiveTab}
                        activeTab={props.activeTab}
                        isLoading={props.isLoading}
                    />
                </div>
            </div>
    </AllClientsDiv>
    )
}