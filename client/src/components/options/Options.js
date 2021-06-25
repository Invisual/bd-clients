import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit3, FiBook } from 'react-icons/fi';

export const Options =  props => {
  return (
    <>
      {(() => {
        switch (props.type) {
          case 'clientsoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.clientContent ? 
            props.placeholder? 
            <div className="grid-widget tasks-options" />
            :(
              <div className="grid-widget tasks-options">
                <h4 className="widget-title" style={{paddingLeft:'15px'}}>Clientes</h4>
                <div className="options-actions">
                    <div className="tooltip-container action-clientinfo">
                        <Link to={`createclientinfo/${props.clientContent.details[0].id_client}`}>
                            <FiBook className="task-info-icon"/><span className="tooltip">Editar Infos de Cliente</span>
                        </Link>
                    </div>
                    {props.userRole === 3 &&
                        <>

                            <div className="tooltip-container action-delete">
                                <FiTrash2
                                className="task-info-icon"
                                onClick={() => {
                                    props.deleteActiveTask(props.clientContent.details[0].id_client);
                                }}
                                />
                                    <span className="tooltip">Eliminar Cliente</span>
                            </div>
                            <div className="tooltip-container action-edit">
                                <Link to={`createclient/${props.clientContent.details[0].id_client}`}>
                                    <FiEdit3 className="task-info-icon"/><span className="tooltip">Editar Cliente</span>
                                </Link>
                            </div>
                        </>
                    }
                </div>
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );

          
          default:
          return props.isLoading ? (
            <div className="grid-widget tasks-options" />
          ) : props.clientContent ? (
            <div className="grid-widget tasks-options">
              <div className="tooltip-container action-clientinfo">
                    <Link to={`createclientinfo/${props.clientContent.details[0].id_client}`}>
                        <FiBook className="task-info-icon"/><span className="tooltip">Editar Infos de Cliente</span>
                    </Link>
            </div>
            </div>
          ) : (
            <div className="grid-widget tasks-options"> </div>
          );
        }
      })()}
    </>
  );
};

export default Options;
