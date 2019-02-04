import React from 'react';
import { AllTasksContainer } from '../../styles/tasklist';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import { FiTrash2, FiCopy, FiEdit3, FiFolder, FiFilePlus } from 'react-icons/fi';

export const AllTasks = props => {
  console.log(props.activeTask)
  return (
    <AllTasksContainer className="dashboard-container">
      <div className="widgets-grid widget cards-container">
        <div className="grid-widget tasks-title">
          <h4>Tarefas</h4>
          {props.userRole === 3 || props.userRole === 2 ? <FiFilePlus /> : null}
        </div>
        <div className="grid-widget tasks-options">
          {props.userRole === 3 || props.userRole === 2 ? (
            <div className="task-infos">
              <FiTrash2 className="task-info-icon" />
              <FiCopy className="task-info-icon" />
              <FiEdit3 className="task-info-icon" />
              <FiFolder className="task-info-icon" />
            </div>
          ) : null}
          <div className="account-avatar">
            {' '}
            <img
              src="https://tarefas.invisual.pt/img/users/bruna.jpg"
              alt="Avatar"
              style={{ borderRadius: '50%' }}
              width="20px"
              height="20px"
            />
          </div>
        </div>
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyTasksContainer title="Tarefas" type="alltasks" changeActiveTask={props.changeActiveTask} />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <TaskDetailContainer activeTask={props.activeTask} />
        </div>
      </div>
    </AllTasksContainer>
  );
};

export default AllTasks;
