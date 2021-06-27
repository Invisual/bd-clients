import React from 'react';
import SingleClient from '../singles/SingleClient';

export const ClientsList = props => {
  var content = '';
  switch (props.type) {
    case 'allclients':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.clients ? 
            props.placeholder ? 
            <div>
              <div className="empty-placeholder">Sem Clientes que correspodam à pesquisa.</div>
            </div>
            :(
            <div className='tasks-list-container'>
              <h4 className="widget-title">{props.title}</h4>
              {props.clients.map(client => {
                return (
                  <SingleClient
                    key={client.id_client}
                    id={client.id_client}
                    type={'allclients'}
                    client={client.name_client}
                    total_hours={client.total_hours}
                    monthly_hours={client.monthly_hours_client}
                    activeClient={props.activeClient}
                    changeActiveClient={props.changeActiveClient}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <div className="empty-placeholder">Ainda não há Clientes.</div>
            </div>
          )}
        </div>
      );
      break;
    default:
      content = '';
  }
  return content;
};
