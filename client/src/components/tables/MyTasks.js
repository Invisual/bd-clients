import React from 'react';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyTasks = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : 
            props.tasks ?  
          (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              {props.tasks.slice(0, 4).map(task => {
                var hourState = 0;
                var hourId = '';
                if(props.activeHours !== null && props.activeHours !== undefined){
                  for(var i=0, count=props.activeHours.length; i<count; i++){
                    if(task.id_task == props.activeHours[i].id_task){
                      hourState = 1;
                      hourId = props.activeHours[i].id_task_hour;
                    }
                  }
                }
                return (
                  <SingleTask
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    state={task.state}
                    hourState={hourState}
                    hourId={hourId}
                    projectState={task.ref_id_project}
                    stateVal={task.ref_id_user_task_status}
                    stateTitle={task.name_user_task_status}
                    changeTaskStatus={props.changeTaskStatus}
                    startCountingHours={props.startCountingHours}
                    stopCountingHours={props.stopCountingHours}
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
          ): <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="empty-placeholder">Ainda não tem nenhuma tarefa atribuida.</div>
             </div>}
        </div>
      );
      break;
    case 'alltasks':
      if (props.isLoading) {
        content = <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />;
      } else {
        content = (
          <div className="mytasks-container widget">
            {props.tasks ? (
              props.tasks.map(task => {
                var hourState = 0;
                var hourId = '';
                if(props.activeHours !== undefined && props.activeHours !== null){
                  for(var i=0, count=props.activeHours.length; i<count; i++){
                    if(task.id_task == props.activeHours[i].id_task){
                      hourState = 1;
                      hourId = props.activeHours[i].id_task_hour;
                    }
                  }
                }
                return (
                  <SingleTask
                    key={task.id_task}
                    id={task.id_task}
                    title={task.title_task}
                    state={task.state}
                    hourState={hourState}
                    hourId={hourId}
                    projectState={task.ref_id_project}
                    stateVal={task.ref_id_user_task_status}
                    stateTitle={task.name_user_task_status}
                    changeTaskStatus={props.changeTaskStatus}
                    changeActiveTask={props.changeActiveTask}
                    activeTask={props.activeTask}
                    copyAlert={props.copyAlert}
                    type={'alltasks'}
                    startCountingHours={props.startCountingHours}
                    stopCountingHours={props.stopCountingHours}
                  />
                );
              })
            ) : (
              <div>
                <div className="empty-placeholder">Ainda não tem nenhuma tarefa atribuida.</div>
              </div>
            )}
          </div>
        );
      }

      break;
    default:
      content = '';
  }

  return content;
};
