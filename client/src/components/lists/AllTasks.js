import React from 'react';
import { AllTasksContainer } from '../../styles/tasklist';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';

export const AllTasks = props => {
  return (
    <AllTasksContainer className="dashboard-container ">
      <div className="widgets-grid widget cards-container">
        <h4 className="grid-widget tasks-title">Tarefas</h4>
        <div className="grid-widget tasks-options">Detail da Tarefa</div>
        <div className="grid-widget tasks-list"><MyTasksContainer title="Tarefas" type="alltasks"/></div>
        <div className="grid-widget tasks-detail"><TaskDetailContainer/></div>
      </div>
    </AllTasksContainer>
  );
};

export default AllTasks;
