import React from 'react';
import { ClientDetailsDiv } from '../../styles/listings';
import { FiMoreHorizontal } from 'react-icons/fi';
import {TeamMemberHistoryTab} from '../tabs/TeamMemberHistoryTab';
import {TeamMemberInfoTab} from '../tabs/TeamMemberInfoTab';
import {TeamMemberVacationsTab} from '../tabs/TeamMemberVacationsTab';
import TeamMemberHoursTab from '../tabs/TeamMemberHoursTab';

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
                  <div
                    className={'project-tab ' + (props.activeTab === 'history' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('history')}
                  >
                    Histórico
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'infos' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('infos')}
                  >
                    Infos
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'vacations' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('vacations')}
                  >
                    Férias
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'hours' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('hours')}
                  >
                    Horas
                  </div>
                </div>
              </div>
              {(() => {
                switch (props.activeTab) {
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
              })()}
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

