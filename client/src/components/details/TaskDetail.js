import React from 'react'
import SingleTaskComment from '../singles/SingleTaskComment'
import { TaskDetailsDiv } from '../../styles/listings'
import moment from 'moment'
import 'moment/locale/pt'
import 'moment-duration-format'
import { Circle } from 'rc-progress'
import {
  FiClock,
  FiFolder,
  FiUser,
  FiInfo,
  FiCreditCard,
  FiPlus,
  FiAlertTriangle,
  FiSend,
  FiFileText,
  FiArrowRight
} from 'react-icons/fi';

export const TaskDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <TaskDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </TaskDetailsDiv>
      ) : props.taskContent ? 
        props.placeholder ?
        <div className="no-content"></div>
        :(
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
                  <FiClock /> <span>{moment(props.taskContent.details[0].deadline_date_task).format('D/MM/YYYY')}</span>
                </div>
                <div className="task-infos">
                  <span><img
                    src={props.taskContent.details[0].avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.taskContent.details[0].name_user}
                  /></span>
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
              {props.concluded && props.taskContent.details[0].user_approved_task ?
                <div className="task-stateinfo-section">
                  <h4 className="task-stateinfo-title">Actualizações de Estado</h4>
                  <div className="task-approval-user">
                    <img src={props.taskContent.details[0].avatar_approved_user} alt={props.taskContent.details[0].name_approved_user} title={props.taskContent.details[0].name_approved_user} />
                    <span className="approval-user">{props.taskContent.details[0].name_approved_user}</span>
                    <span className="approval-date">{moment(props.taskContent.details[0].date_approved_task).format('D MMM YYYY')}</span>
                    <span className="approval-status">Aprovado</span>
                  </div>
                </div>
              :
                null
              }
              {props.taskContent.details[0].ref_id_type_task === 3 ?
                <div className="task-billing-section">
                  <div className="billing-icon">
                    <FiAlertTriangle color="#5e78dd" />
                  </div>
                  <div className="billing-title">
                    <h4>Custos para Faturação</h4>
                    {props.type === 'approvals'? 
                      props.taskContent.costs ? 
                      <div className="see-all-costs" onClick={() => {props.openCostsModal('tasklist'); props.openModal('costs') }}>Consulte aqui os Custos associados a esta Tarefa <FiArrowRight /></div>
                    : <div>Sem Custos Associados.</div>
                    :
                    props.taskContent.costs ? 
                      <div className="see-all-costs" onClick={() => {props.openCostsModal('tasklist'); props.openModal('costs') }}>Consulte aqui os Custos associados a esta Tarefa <FiArrowRight /></div>
                    :
                    <>
                      <div className="billing-descr">Esta Tarefa ainda não tem um Registo de Custos associado.</div>
                    
                      <FiPlus className="billing-add-icon" onClick={() => {props.openCostsModal('task'); props.openModal('costs')}}/>
                    </>
                    }
                  </div>
                </div>
              :
                null
              }
            </div>
          </div>
          {props.type === 'approvals' ? null :
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
          }    
        </TaskDetailsDiv>
      ) : (
          <div className="no-content"></div>
      )}
    </>
  );
};

export default TaskDetail;
