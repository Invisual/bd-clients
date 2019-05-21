import React from 'react';
import { ClientDetailsDiv } from '../../styles/listings';
import { FiUser, FiMoreHorizontal } from 'react-icons/fi';
import ClientInfoTab from '../tabs/ClientInfoTab';
import ClientProjectsTab from '../tabs/ClientProjectsTab';
import ClientTasksTab from '../tabs/ClientTasksTab';

export const ClientDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <ClientDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </ClientDetailsDiv>
      ) : props.clientContent ? (
        <ClientDetailsDiv>
          <div className="project-details-grid">
            <div className="grid-item">
              <div className="project-icon">
                <FiUser />
              </div>
            </div>

            <div className="grid-item">
              <div className="project-header">
                <h4 className="project-title">{props.clientContent.details[0].name_client}</h4>
                <div className="project-infos">
                  <div
                    className={'project-tab ' + (props.activeTab === 'clientprojects' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('clientprojects')}
                  >
                    Projetos
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'clienttasks' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('clienttasks')}
                  >
                    Tasks
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'clientinfo' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('clientinfo')}
                  >
                    Infos
                  </div>
                  <div
                    className={'project-tab ' + (props.activeTab === 'clientdata' ? 'active-tab' : '')}
                    onClick={() => props.changeActiveTab('clientdata')}
                  >
                    Data
                  </div>
                </div>
              </div>
              {(() => {
                switch (props.activeTab) {
                  case 'clientinfo':
                    return <ClientInfoTab clientContent={props.clientContent} logout={props.logout}/>;
                  case 'clientprojects':
                    return <ClientProjectsTab clientContent={props.clientContent} />;
                  case 'clienttasks':
                    return <ClientTasksTab clientContent={props.clientContent} />;
                  case 'clientdata':
                    return <div> DATA </div>;
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

export default ClientDetail;
