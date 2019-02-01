import React from 'react';
import SingleTaskComment from '../singles/SingleTaskComment';
import { TaskDetails } from '../../styles/tasklist';
import { Circle } from 'rc-progress';
import { FiClock, FiFolder, FiUser, FiInfo, FiCreditCard, FiArrowRight, FiAlertTriangle, FiSend } from 'react-icons/fi';

export const TaskDetail = props => {
  return (
    <TaskDetails className="dashboard-container" hours="01h55" color="red">
      <div className="task-header">
        <h4 className="task-title">Titulo tarefa</h4>
        <div className="task-date">
          <FiClock /> 28/01/2018
        </div>
        <div className="task-infos">
          <span>
            <FiFolder className="task-info-icon" /> Rebranding
          </span>
          <span>
            <FiUser className="task-info-icon" /> Jade
          </span>
          <span>
            <FiInfo className="task-info-icon" /> Normal
          </span>
          <span>
            <FiCreditCard className="task-info-icon" /> Avença
          </span>
        </div>
      </div>
      <div className="task-descr">
        <h4 className="task-descr-title">Descrição</h4>
        <div className="task-descr-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
          aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div className="task-extras">
        <div className="task-hour-container">
          <div className="task-hour-counter">
            <Circle percent="60" strokeWidth="10" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="10" />
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
          {props.comments.slice(0, 2).map(comment => {
            return (
              <SingleTaskComment
                key={comment.id}
                id={comment.id}
                text={comment.text}
                author={comment.author}
                date={comment.date}
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
        <div className="comment-input"><textarea placeholder="Escreve um comentário..."/></div>
        <div className="comment-submit"><FiSend color="#5e78dd" /></div>
      </div>
    </TaskDetails>
  );
};

export default TaskDetail;
