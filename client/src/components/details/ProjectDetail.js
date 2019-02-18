import React from 'react';
import { ProjectDetailsDiv } from '../../styles/tasklist';
import ProjectReviewTab from '../../components/tabs/ProjectReviewTab';
import ProjectTasksTab from '../../components/tabs/ProjectTasksTab';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment-duration-format';
import { FiClock, FiUser, FiFileText, FiMoreHorizontal } from 'react-icons/fi';

export const ProjectDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <ProjectDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </ProjectDetailsDiv>
      ) : props.projectContent ? (
        <ProjectDetailsDiv>
          <div className="project-details-grid">
            <div className="grid-item">
              <div className="project-icon">
                <FiFileText />
              </div>
            </div>

            <div className="grid-item">
              <div className="project-header">
                <h4 className="project-title">{props.projectContent.details[0].title_project}</h4>
                <div className="project-date">
                  <FiClock /> <span>{moment(props.projectContent.details[0].creation_date_project).format('D/MM/YYYY')}</span>{' '}
                  <span>
                    <FiUser className="project-date" />{' '}
                    <span className="name-client">{props.projectContent.details[0].name_client}</span>
                  </span>
                </div>
                <div className="project-infos">
                  <div className={"project-tab " + (props.activeTab==='projectreview'? "active-tab" : "")}  onClick={() => props.changeActiveTab('projectreview')}>Project Review</div>
                  <div className={"project-tab " + (props.activeTab==='projecttasks'? "active-tab" : "")} onClick={() => props.changeActiveTab('projecttasks')}>Tarefas</div>
                  <div className={"project-tab " + (props.activeTab==='projectcomments'? "active-tab" : "")} onClick={() => props.changeActiveTab('projectcomments')}>Comentários</div>
                </div>
              </div>
              {(() => {
                switch (props.activeTab) {
                  case 'projectreview':
                    return <ProjectReviewTab projectContent={props.projectContent} />;
                  case 'projecttasks':
                    return <ProjectTasksTab projectContent={props.projectContent}/>;
                  case 'projectcomments':
                    return <div>project comments</div>;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </ProjectDetailsDiv>
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

export default ProjectDetail;
