import React from 'react';
import { AllTasksDiv } from '../../styles/tasklist';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import TaskOptionsContainer from '../../containers/options/TaskOptionsContainer';
import { FiFilePlus } from 'react-icons/fi';

export const AllTasks = props => {
  return (
    <AllTasksDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container">
        <div className="grid-widget tasks-title">
          <h4>Tarefas</h4>
          {props.userRole === 3 || props.userRole === 2 ? <FiFilePlus /> : null}
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
            <MyTasksContainer
              title="Tarefas"
              type="alltasks"
              changeActiveTask={props.changeActiveTask}
              activeTask={props.activeTask}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <TaskDetailContainer activeTask={props.activeTask} taskContent={props.taskContent} isLoading={props.isLoading} />
        </div>
      </div>
    </AllTasksDiv>
  );
};

export default AllTasks;
