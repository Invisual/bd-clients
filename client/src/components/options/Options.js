import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiCopy, FiEdit3, FiFolder, FiFilter } from 'react-icons/fi';

export const Options =  props => {
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
                    <Link to={`/projects/`+props.taskContent.details[0].ref_id_project}><FiFolder
                      className="task-info-icon"
                    /><span className="tooltip">Ir para Projeto</span></Link>
                    </div>
                  </div>
                ) 
                : 
                <div className="task-infos">
                  <div className="tooltip-container">
                    <Link to={`/projects/`+props.taskContent.details[0].ref_id_project}><FiFolder
                      className="task-info-icon"
                    /><span className="tooltip">Ir para Projeto</span></Link>
                  </div>
                </div>
                }
                <div className="account-avatar">
                  <img
                    src={props.taskContent.details[0].avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.taskContent.details[0].name_user}
                  />
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
                        props.deleteActiveProject(props.projectContent.details[0].id_project);
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

          case 'teamoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.memberContent ? (
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                    <div className={props.activeTab === 'history' ? "tooltip-container filter-with-notification" : "tooltip-container filter-with-notification disabled-filter"}>
                      {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
                      <FiFilter
                        className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'}
                        onClick={props.activeTab === 'history' ? props.changeFiltersAreActive : null}
                      />
                      <span className="tooltip">Filtrar Histórico</span>
                    </div>
                    <div className="tooltip-container">
                      <FiTrash2
                        className="task-info-icon"
                        onClick={() => {props.deleteActiveMember(props.memberContent.details[0].id_user)}}
                      />
                      <span className="tooltip">Eliminar Utilizador</span>
                    </div>
                    <div className="tooltip-container">
                      <FiEdit3
                        className="task-info-icon"
                        onClick={() => {props.editActiveMember(props.memberContent.details[0].id_user)}}
                      />
                      <span className="tooltip">Editar Utilizador</span>
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
