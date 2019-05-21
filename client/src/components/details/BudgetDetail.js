import React from 'react';
import SingleTaskComment from '../singles/SingleTaskComment';
import { TaskDetailsDiv } from '../../styles/listings';
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

export const BudgetDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <TaskDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </TaskDetailsDiv>
      ) : props.budgetContent ? (
        <TaskDetailsDiv
          hours={
            props.budgetContent.details[0].total_hours
              ? moment.duration(props.budgetContent.details[0].total_hours, 'hours').format('*HH[h]mm[m]', {
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
                <h4 className="task-title">{props.budgetContent.details[0].title_budget}</h4>
                <div className="task-date">
                  <FiClock /> <span>{moment(props.budgetContent.details[0].creation_date_budget).format('D/MM/YYYY')}</span>
                </div>
                <div className="task-infos">
                  <span>
                    <FiUser className="task-info-icon" /> {props.budgetContent.details[0].name_client}
                  </span>
                </div>
              </div>
              <div className="task-descr">
                <h4 className="task-descr-title">Descrição</h4>
                <div className="task-descr-text">{props.budgetContent.details[0].description_budget}</div>
              </div>
              <div className="task-extras">
                <div className="task-hour-container">
                  <div className="task-hour-counter">
                    <Circle percent="100" strokeWidth="8" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="8" />
                  </div>
                </div>
                <div className="task-comments">
                  <h4 className="task-comment-title">Comentários</h4>
                  {props.budgetContent.comments.length ? (
                    props.budgetContent.comments.slice(0, 3).map(comment => {
                      return (
                        <SingleTaskComment
                          key={comment.id_budget_comment}
                          id={comment.id_budget_comment}
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

export default BudgetDetail;
