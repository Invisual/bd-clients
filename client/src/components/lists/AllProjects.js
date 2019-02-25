import React from 'react';
import { AllProjectsDiv } from '../../styles/listings';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import ProjectDetailContainer from '../../containers/details/ProjectDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import { FiFolderPlus } from 'react-icons/fi';

export const AllProjects = props => {
  return (
    <AllProjectsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Projetos</h4>
          {props.userRole === 3 || props.userRole === 2 ? <FiFolderPlus /> : null}
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'projectoptions'}
          activeProject={props.activeProject}
          projectContent={props.projectContent}
          isLoading={props.isLoading}
          deleteActiveTask={props.deleteActiveTask}
          duplicateActiveTask={props.duplicateActiveTask}
          editActiveTask={props.editActiveTask}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyProjectsContainer
              title="Tarefas"
              type="allprojects"
              changeActiveProject={props.changeActiveProject}
              activeProject={props.activeProject}
              copyAlert={props.copyAlert}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <ProjectDetailContainer
            activeProject={props.activeProject}
            projectContent={props.projectContent}
            changeActiveTab={props.changeActiveTab}
            activeTab={props.activeTab}
            isLoading={props.isLoading}
            changeCommentVal={props.changeCommentVal}
            submitComment={props.submitComment}
          />
        </div>
      </div>
    </AllProjectsDiv>
  );
};

export default AllProjects;
