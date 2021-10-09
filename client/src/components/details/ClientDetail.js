import React from 'react'
import { ClientDetailsDiv } from '../../styles/listings'
import { FiUser, FiMoreHorizontal } from 'react-icons/fi'
import ClientInfoTab from '../tabs/ClientInfoTab'
import ClientMarketingTab from '../tabs/ClientMarketingTab'

export const ClientDetail = props => {
  var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role

  return (
    <>
      {props.isLoading ? (
        <ClientDetailsDiv>
          <img
            src="/img/loading.svg"
            alt="loading"
            className="loading-spinner"
          />
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
                <h4 className="project-title">
                  {props.clientContent.details[0].name_client}
                </h4>
                <div className="project-infos">
                  {(userRole === 0 || userRole === 3) && (
                    <div
                      className={
                        'project-tab ' +
                        (props.activeTab === 'clientinfo' ? 'active-tab' : '')
                      }
                      onClick={() => props.changeActiveTab('clientinfo')}
                    >
                      Infos
                    </div>
                  )}
                  {userRole !== 3 && (
                    <div
                      className={
                        'project-tab ' +
                        (props.activeTab === 'clientmarketing'
                          ? 'active-tab'
                          : '')
                      }
                      onClick={() => props.changeActiveTab('clientmarketing')}
                    >
                      Marketing
                    </div>
                  )}
                </div>
              </div>
              {(() => {
                switch (props.activeTab) {
                  case 'clientinfo':
                    return (
                      <ClientInfoTab
                        clientContent={props.clientContent}
                        logout={props.logout}
                      />
                    )
                  case 'clientmarketing':
                    return (
                      <ClientMarketingTab
                        clientContent={props.clientContent}
                        logout={props.logout}
                      />
                    )
                  default:
                    return null
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
  )
}

export default ClientDetail
