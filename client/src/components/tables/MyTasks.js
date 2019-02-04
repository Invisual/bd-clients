import React from 'react';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyTasks = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? 
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          :
            <div>
              <h4 className="widget-title">{props.title}</h4>
              {props.tasks.slice(0, 5).map(task => {
                return (
                  <SingleTask
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    state={task.state}
                    hourState={1}
                    projectState={task.ref_id_project}
                    stateVal={task.ref_id_user_task_status}
                    stateTitle={task.name_user_task_status}
                    changeTaskStatus={props.changeTaskStatus}
                  />
                );
              })}
              <div className="see-all">
                Ver todas{' '}
                <span className="arrow">
                  <FiArrowRight color="#0031e6" />
                </span>
              </div>
            </div>
          }
        </div>
      );
      break;
    case 'alltasks':
      content = (
        <div className="mytasks-container widget">
          {props.tasks.map(task => {
            return (
              <SingleTask
                key={task.id_task}
                id={task.id_task}
                title={task.title_task}
                state={task.state}
                hourState={1}
                projectState={task.ref_id_project}
                stateVal={task.ref_id_user_task_status}
                stateTitle={task.name_user_task_status}
                changeTaskStatus={props.changeTaskStatus}
                changeActiveTask={props.changeActiveTask}
              />
            );
          })}
        </div>
      );
      break;
    default:
      content = '';
  }

  return content;
};
