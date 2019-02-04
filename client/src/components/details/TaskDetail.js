import React from 'react';
import SingleTaskComment from '../singles/SingleTaskComment';
import { TaskDetails } from '../../styles/tasklist';
import moment from 'moment';
import 'moment/locale/pt'
import { Circle } from 'rc-progress';
import { FiClock, FiFolder, FiUser, FiInfo, FiCreditCard, FiArrowRight, FiAlertTriangle, FiSend } from 'react-icons/fi';

export const TaskDetail = props => {
  console.log(props.taskDetails);
  return (
    <>
      {props.isLoading ? (
        <TaskDetails className="dashboard-container" hours="00h00" color="red">
          <img scr="img/loading.svg" alt="Loading" className="loading-spinner" />
        </TaskDetails>
      ) : (
        <TaskDetails className="dashboard-container" hours={moment('13:00:0000', 'HH').format('h[h]mm')} color="red">
          <div className="task-header">
            <h4 className="task-title">{props.taskDetails.taskDetails[0].title_task}</h4>
            <div className="task-date">
              <FiClock /> {moment(props.taskDetails.taskDetails.creation_date_task).format('D/MM/YYYY')}
            </div>
            <div className="task-infos">
              <span>
                <FiFolder className="task-info-icon" /> {props.taskDetails.taskDetails[0].title_project}
              </span>
              <span>
                <FiUser className="task-info-icon" /> {props.taskDetails.taskDetails[0].name_client}
              </span>
              <span>
                <FiInfo className="task-info-icon" /> {props.taskDetails.taskDetails[0].name_task_types}
              </span>
              <span>
                <FiCreditCard className="task-info-icon" /> {props.taskDetails.taskDetails[0].name_billing_mode}
              </span>
            </div>
          </div>
          <div className="task-descr">
            <h4 className="task-descr-title">Descrição</h4>
            <div className="task-descr-text">{props.taskDetails.taskDetails[0].description_task}
            </div>
          </div>
          <div className="task-extras">
            <div className="task-hour-container">
              <div className="task-hour-counter">
                <Circle percent="100" strokeWidth="10" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="10" />
              </div>
              <div className="see-hours">
                Ver horas{' '}
                <span className="arrow-hours">
                  <FiArrowRight color="#0031e6" />
                </span>
              </div>
            </div>
            <div className="task-comments">
              <h4 className="task-comment-title">Comentários</h4>
              {props.taskDetails.taskComments.slice(0, 3).map(comment => {
                return (
                  <SingleTaskComment
                    key={comment.id_task_comment}
                    id={comment.id_task_comment}
                    text={comment.text_comments}
                    author={comment.name_user}
                    date={moment(comment.date_comment).format('D/MM/YYYY')}
                  />
                );
              })}
            </div>
          </div>
          <div className="task-billing-section">
            <div className="billing-icon">
              <FiAlertTriangle color="#5e78dd" />
            </div>
            <div className="billing-title">
              <h4>Custos para Faturação</h4>
              <div className="billing-descr">Esta Tarefa ainda não tem um Registo de Custos associado.</div>
            </div>
            <div className="billing-icon">
              <FiAlertTriangle color="#5e78dd" />
            </div>
            <div className="billing-title">
              <h4>Observações para Faturação</h4>
              <div className="billing-descr">Esta Tarefa não tem qualquer Observação para Faturação.</div>
            </div>
          </div>
          <div className="task-add-comment">
            <div className="comment-input">
              <textarea placeholder="Escreve um comentário..." />
            </div>
            <div className="comment-submit">
              <FiSend color="#5e78dd" />
            </div>
          </div>
        </TaskDetails>
      )}
    </>
  );
};

export default TaskDetail;
