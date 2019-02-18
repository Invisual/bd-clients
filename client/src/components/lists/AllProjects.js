import React from 'react';
import { AllProjectsDiv } from '../../styles/tasklist';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import TaskOptionsContainer from '../../containers/options/TaskOptionsContainer';
import { FiFolderPlus } from 'react-icons/fi';

export const AllProjects = props => {
  return (
    <AllProjectsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Projetos</h4>
          {props.userRole === 3 || props.userRole === 2 ? <FiFolderPlus /> : null}
        </div>
        <TaskOptionsContainer
          userRole={props.userRole}
          activeTask={props.activeTask}
          taskContent={props.taskContent}
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
              changeActiveTask={props.changeActiveTask}
              activeTask={props.activeTask}
              copyAlert={props.copyAlert}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <TaskDetailContainer
            activeTask={props.activeTask}
            taskContent={props.taskContent}
            changeCommentVal={props.changeCommentVal}
            submitComment={props.submitComment}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </AllProjectsDiv>
  );
};

export default AllProjects;
