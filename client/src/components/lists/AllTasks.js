import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import { FiFilePlus } from 'react-icons/fi';
import {Redirect} from 'react-router-dom';

export const AllTasks = props => {
  if(props.redirect){
    return <Redirect  to='/' />
  }
  return (
    <AllTasksDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Tarefas</h4>
          {props.userRole === 3 || props.userRole === 2 ? <FiFilePlus /> : null}
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'taskoptions'}
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
              copyAlert={props.copyAlert}
              activeHours={props.activeHours}
              getActiveHours={props.getActiveHours}
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
    </AllTasksDiv>
  );
};

export default AllTasks;
