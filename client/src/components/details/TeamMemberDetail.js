import React from 'react';
import { ClientDetailsDiv } from '../../styles/listings';
import { FiMoreHorizontal } from 'react-icons/fi';
import {TeamMemberInfoTab} from '../tabs/TeamMemberInfoTab';

export const TeamMemberDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <ClientDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </ClientDetailsDiv>
      ) : props.memberContent ? (
        <ClientDetailsDiv>
          <div className="project-details-grid">
            <div className="grid-item">
                <div className="member-avatar">
                    <img src={props.memberContent.details[0].avatar_user} alt={props.memberContent.details[0].name_user} title={props.memberContent.details[0].name_user} />
                </div>
            </div>

            <div className="grid-item">
              <div className="project-header">
                <h4 className="project-title member-title">{props.memberContent.details[0].name_user}</h4>
                <h6 className="member-position">{props.memberContent.details[0].name_position}</h6>
                <div className="project-infos">
                  {/* <div
                    className={'project-tab ' + (props.activeTab === 'tasks' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('tasks')}
                  >
                    Tarefas
                  </div>
                  {props.memberContent.details[0].id_user === props.userInfo.id_user || props.userInfo.ref_id_role === 2 || props.userInfo.ref_id_role === 3 ?
                    <div
                      className={'project-tab ' + (props.activeTab === 'history' ? 'active-tab' : '')}
                      onClick={() => props.changeActiveTab('history')}
                    >
                    Histórico
                    </div>
                  : null} */}
                  <TeamMemberInfoTab memberContent ={props.memberContent} />
                  {/* <div
                    className={'project-tab ' + (props.activeTab === 'vacations' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('vacations')}
                  >
                    Férias
                  </div>
                  {props.memberContent.details[0].id_user === props.userInfo.id_user || props.userInfo.ref_id_role === 2 || props.userInfo.ref_id_role === 3 ?
                  <div
                    className={'project-tab ' + (props.activeTab === 'hours' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('hours')}
                  >
                    Horas
                  </div> */}
                  {/* : null } */}
                </div>
              </div>
              {/* {(() => {
                switch (props.activeTab) {
                  case 'tasks':
                    return <TeamMemberTasksTab memberContent={props.memberContent}/>
                  case 'history':
                    return <TeamMemberHistoryTab memberContent={props.memberContent} filters={props.filters}/>
                  case 'infos':
                    return <TeamMemberInfoTab memberContent ={props.memberContent} />
                  case 'vacations':
                    return <TeamMemberVacationsTab memberContent={props.memberContent} />
                  case 'hours':
                    return <TeamMemberHoursTab activeMember={props.activeMember} openModal={props.openModal} changeEditHourId={props.changeEditHourId}/>
                  default:
                    return null;
                }
              })()} */}
            </div>
          </div>
        </ClientDetailsDiv>
      ) : (
        <div>
          <div className="no-content">
            <FiMoreHorizontal />
          </div>
        </div>
      )}
    </>
  );
};

