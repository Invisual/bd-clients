import React from 'react';
import { Link } from 'react-router-dom';
import SingleApproval from '../singles/SingleApproval';
import { FiArrowRight } from 'react-icons/fi';
 
export const MyApprovals = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? (
            <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.approvalItems ? (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="approvals-scroll-container">
              {props.approvalItems.slice(0, 10).map(item => {
                return (
                  <SingleApproval
                    key={item.id}
                    id={item.id}
                    itemType={item.type}
                    name_client={item.name_client}
                    title={item.title}
                  />
                );
              })}
              </div>
              <Link to="/approvals">
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
    case 'allapprovals':
      if (props.isLoading) {
        content = <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />;
      } else {
        content = (
          <div className="mytasks-container widget">
            {props.approvalItems ? (
              props.approvalItems.map(item => {
                return (
                  <SingleApproval
                    key={item.id}
                    id={item.id}
                    type={props.type}
                    itemType={item.type}
                    name_client={item.name_client}
                    title={item.title}
                    changeActiveItem={props.changeActiveItem}
                    activeItem={props.activeItem}
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