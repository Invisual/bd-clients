import React from 'react';
import SingleTaskComment from '../singles/SingleTaskComment';
import { TaskDetailsDiv } from '../../styles/tasklist';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment-duration-format';
import { Circle } from 'rc-progress';
import {
  FiClock,
  FiFolder,
  FiUser,
  FiInfo,
  FiCreditCard,
  FiArrowRight,
  FiAlertTriangle,
  FiSend,
  FiFileText,
  FiMoreHorizontal
} from 'react-icons/fi';

export const TaskDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <TaskDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </TaskDetailsDiv>
      ) : props.taskContent ? (
        <TaskDetailsDiv
          hours={
            props.taskContent.details[0].total_hours
              ? moment.duration(props.taskContent.details[0].total_hours, 'hours').format('*HH[h]mm[m]', {
                  forceLength: true
                })
              : '00h00m'
          }
        >
          <div className="task-details-grid">
            <div className="grid-item">
              <div className="task-icon">
                <FiFileText />
              </div>
            </div>

            <div className="grid-item">
              <div className="task-header">
                <h4 className="task-title">{props.taskContent.details[0].title_task}</h4>
                <div className="task-date">
                  <FiClock /> <span>{moment(props.taskContent.details[0].creation_date_task).format('D/MM/YYYY')}</span>
                </div>
                <div className="task-infos">
                  {props.taskContent.details[0].title_project ? (
                    <span>
                      <FiFolder className="task-info-icon" /> {props.taskContent.details[0].title_project}
                    </span>
                  ) : null}
                  <span>
                    <FiUser className="task-info-icon" /> {props.taskContent.details[0].name_client}
                  </span>
                  <span>
                    <FiInfo className="task-info-icon" /> {props.taskContent.details[0].name_task_types}
                  </span>
                  <span>
                    <FiCreditCard className="task-info-icon" /> {props.taskContent.details[0].name_billing_mode}
                  </span>
                </div>
              </div>
              <div className="task-descr">
                <h4 className="task-descr-title">Descrição</h4>
                <div className="task-descr-text">{props.taskContent.details[0].description_task}</div>
              </div>
              <div className="task-extras">
                <div className="task-hour-container">
                  <div className="task-hour-counter">
                    <Circle percent="100" strokeWidth="8" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="8" />
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
                  {props.taskContent.comments.length ? (
                    props.taskContent.comments.slice(0, 3).map(comment => {
                      return (
                        <SingleTaskComment
                          key={comment.id_task_comment}
                          id={comment.id_task_comment}
                          text={comment.text_comments}
                          author={comment.name_user}
                          date={moment(comment.date_comment).format('D/MM/YYYY')}
                        />
                      );
                    })
                  ) : (
                    <div>Esta Tarefa ainda não tem comentários</div>
                  )}
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
            </div>
          </div>

          <div className="task-add-comment">
            <div />
            <div className="comment-input">
              <textarea
                placeholder="Escreve um comentário..."
                id="comment-textarea"
                onChange={props.changeCommentVal}
                onKeyDown={props.changeCommentVal}
              />
            </div>
            <div className="comment-submit" onClick={props.submitComment}>
              <FiSend />
            </div>
          </div>
        </TaskDetailsDiv>
      ) : (
        <div>
          <div className="no-content">
            <FiMoreHorizontal />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetail;
