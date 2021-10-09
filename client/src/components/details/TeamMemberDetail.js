import React from 'react'
import { ClientDetailsDiv } from '../../styles/listings'
import { FiMoreHorizontal } from 'react-icons/fi'
import { TeamMemberInfoTab } from '../tabs/TeamMemberInfoTab'

export const TeamMemberDetail = props => {
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
      ) : props.memberContent ? (
        <ClientDetailsDiv>
          <div className="project-details-grid">
            <div className="grid-item">
              <div className="member-avatar">
                <img
                  src={props.memberContent.details[0].avatar_user}
                  alt={props.memberContent.details[0].name_user}
                  title={props.memberContent.details[0].name_user}
                />
              </div>
            </div>

            <div className="grid-item">
              <div className="project-header">
                <h4 className="project-title member-title">
                  {props.memberContent.details[0].name_user}
                </h4>
                <h6 className="member-position">
                  {props.memberContent.details[0].name_position}
                </h6>
                <div className="project-infos">
                  <TeamMemberInfoTab memberContent={props.memberContent} />
                </div>
              </div>
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
