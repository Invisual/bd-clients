import React from 'react';
import { Link } from 'react-router-dom';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyBilling = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? (
            <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.items ? (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              {props.items.slice(0, 4).map(item => {
                return (
                  <SingleTask
                    key={item.id_task}
                    id={item.id_task}
                    title={item.title_task}
                    state={item.state}
                  />
                );
              })}
              <Link to="/billing">
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
              <div className="empty-placeholder">Ainda não tem items para faturar.</div>
            </div>
          )}
        </div>
      );
      break;
    case 'allbilling':
      if (props.isLoading) {
        content = <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />;
      } else {
        content = (
          <div className="mytasks-container widget">
            {props.items.length>0 ? 
            props.placeholder ?
            <div>
                <div className="empty-placeholder">Sem items correspondentes à pesquisa.</div>
            </div>
            :(
              props.items.map(item => {
                return (
                  <SingleTask
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    clientName={item.name_client}
                    status={item.billed_status}
                    itemType={item.type}
                    activeItem={props.activeItem}
                    changeActiveItem={props.changeActiveItem}
                    type={'allbilling'}
                  />
                );
              })
            ) : (
              <div>
                <div className="empty-placeholder">Ainda não tem items para faturar.</div>
              </div>
            )}
          </div>
        );
      }

      break;
    default:
      content ='';
  }

  return content;
};
