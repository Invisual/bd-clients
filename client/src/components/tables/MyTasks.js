import React from 'react';
import { Link } from 'react-router-dom';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyTasks = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? (
            <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.tasks ? (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              {props.tasks.slice(0, 4).map(task => {
                var hourState = 0;
                var hourId = '';
                if (props.activeHours !== null && props.activeHours !== undefined) {
                  for (var i = 0, count = props.activeHours.length; i < count; i++) {
                    if (task.id_task === props.activeHours[i].id_task) {
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
                    account={task.ref_id_user_account}
                    stateVal={task.ref_id_user_task_status}
                    stateTitle={task.name_user_task_status}
                    changeTaskStatus={props.changeTaskStatus}
                    startCountingHours={props.startCountingHours}
                    stopCountingHours={props.stopCountingHours}
                  />
                );
              })}
              <Link to="/tasks">
                <div className="see-all">
                  Ver todas{' '}
                  <span className="arrow">
                    <FiArrowRight color="#0031e6" />
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="no-tasks-dash no-content-dash"><div className="empty-placeholder">Ainda não tem nenhuma tarefa atribuída</div></div>
            </div>
          )}
        </div>
      );
      break;
    case 'alltasks':
      if (props.isLoading) {
        content = <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />;
      } else {
        content = (
          <div className="mytasks-container widget">
            {props.tasks ? 
              props.placeholder ?
              <div className="empty-placeholder">Sem tarefas correspondentes aos filtros ativos.</div>
              :(
              props.tasks.map(task => {
                var hourState = 0;
                var hourId = '';
                if (props.activeHours !== undefined && props.activeHours !== null) {
                  for (var i = 0, count = props.activeHours.length; i < count; i++) {
                    if (task.id_task === props.activeHours[i].id_task) {
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
                    account={task.ref_id_user_account}
                    stateVal={task.ref_id_user_task_status}
                    stateTitle={task.name_user_task_status}
                    changeTaskStatus={props.changeTaskStatus}
                    changeActiveTask={props.changeActiveTask}
                    activeTask={props.activeTask}
                    copyAlert={props.copyAlert}
                    type={'alltasks'}
                    startCountingHours={props.startCountingHours}
                    stopCountingHours={props.stopCountingHours}
                    concluded={props.concluded}
                  />
                );
              })
            ) : (
              <div>
                <div className="empty-placeholder">{props.concluded? 'Sem tarefas concluídas' : 'Ainda não tem nenhuma tarefa atribuída'}</div>
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
