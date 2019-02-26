import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiCopy, FiEdit3, FiFolder } from 'react-icons/fi';

export const Options = props => {
  return (
    <>
      {(() => {
        switch (props.type) {
          case 'taskoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.taskContent ? (
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                  <div className="tooltip-container">
                    <FiTrash2
                      className="task-info-icon"
                      onClick={() => {
                        props.deleteActiveTask(props.taskContent.details[0].id_task);
                      }}
                    /><span className="tooltip">Eliminar Tarefa</span>
                    </div>
                    <div className="tooltip-container">
                    <FiCopy
                      className="task-info-icon"
                      onClick={() => {
                        props.duplicateActiveTask(props.taskContent.details[0].id_task);
                      }}
                    /><span className="tooltip">Duplicar Tarefa</span>
                    </div>
                    <div className="tooltip-container">
                    <Link to={`/createtask/`+props.taskContent.details[0].id_task}><FiEdit3
                      className="task-info-icon"
                    /><span className="tooltip">Editar Tarefa</span></Link>
                    </div>
                   <div className="tooltip-container">
                    <FiFolder
                      className="task-info-icon"
                      onClick={() => {
                        console.log('ir ao projecto ' + props.taskContent.details[0].id_task);
                      }}
                    /><span className="tooltip">Ir para Projeto</span>
                    </div>
                  </div>
                ) : null}
                <div className="account-avatar">
                  {' '}
                  {props.taskContent.details[0].avatar_user ? (
                    <img
                      src={props.taskContent.details[0].avatar_user}
                      alt="Avatar"
                      style={{ borderRadius: '50%' }}
                      width="20px"
                      height="20px"
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );
          case 'projectoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.projectContent ? (
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                    <div className="tooltip-container">
                    <span className="tooltip">Eliminar Projeto</span>
                    <FiTrash2
                      className="task-info-icon"
                      onClick={() => {
                        props.deleteActiveTask(props.projectContent.details[0].id_project);
                      }}
                    />
                    </div>
                    <div className="tooltip-container">
                    <span className="tooltip">Duplicar Projeto</span>
                    <FiCopy
                      className="task-info-icon"
                      onClick={() => {
                        props.duplicateActiveTask(props.projectContent.details[0].id_project);
                      }}
                    />
                    </div>
                    <div className="tooltip-container">
                    <Link to={`/createproject/`+props.projectContent.details[0].id_project}><FiEdit3
                      className="task-info-icon"
                    /><span className="tooltip">Editar Projeto</span></Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );
          case 'clientsoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.clientContent ? (
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                  <div className="tooltip-container">
                    <FiTrash2
                      className="task-info-icon"
                      onClick={() => {
                        props.deleteActiveTask(props.clientContent.details[0].id_client);
                      }}
                    /><span className="tooltip">Eliminar Cliente</span>
                    </div>
                    <div className="tooltip-container">
                    <FiEdit3
                      className="task-info-icon"
                      onClick={() => {
                        props.editActiveTask(props.clientContent.details[0].id_client);
                      }}
                    /><span className="tooltip">Editar Cliente</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );
          default:
          return props.isLoading ? (
            <div className="grid-widget tasks-options" />
          ) : props.clientContent ? (
            <div className="grid-widget tasks-options">
              {props.userRole === 3 || props.userRole === 2 ? (
                <div className="task-infos">
                <div className="tooltip-container">
                  <FiTrash2
                    className="task-info-icon"
                    onClick={() => {
                      props.deleteActiveTask(props.clientContent.details[0].id_client);
                    }}
                  /><span className="tooltip">Eliminar Cliente</span>
                  </div>
                  <div className="tooltip-container">
                  <FiEdit3
                    className="task-info-icon"
                    onClick={() => {
                      props.editActiveTask(props.clientContent.details[0].id_client);
                    }}
                  /><span className="tooltip">Editar Cliente</span>
                  </div>
                </div>
              ) : null}
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
