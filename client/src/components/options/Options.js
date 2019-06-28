import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiCopy, FiEdit3, FiFolder, FiFilter, FiPlusCircle, FiCheckSquare, FiXSquare } from 'react-icons/fi';

export const Options =  props => {
  return (
    <>
      {(() => {
        switch (props.type) {
          case 'taskoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.taskContent ? 
              props.placeholder? 
              <div className="grid-widget tasks-options" />
              :(
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                    
                  {props.concluded?
                  <>

                   {props.taskContent.details[0].ref_id_project ? 
                      null 
                    :
                      <div className="tooltip-container">
                        <FiXSquare className="task-info-icon" onClick={() => { props.undoActiveTask(props.taskContent.details[0].id_task); }}/>
                        <span className="tooltip">Marcar Tarefa como não concluída</span>
                      </div> 
                    }
                    <div className="tooltip-container">
                      <FiTrash2 className="task-info-icon" onClick={() => { props.deleteActiveTask(props.taskContent.details[0].id_task) }}/>
                      <span className="tooltip">Eliminar Tarefa</span>
                    </div>
                  </>  
                  :
                    <>
                    {props.taskContent.details[0].ref_id_project ? 
                      null
                    : <div className="tooltip-container">
                        <FiCheckSquare className="task-info-icon" onClick={() => { props.openConcludeModal('task'); props.openModal('conclude') }}/>
                        <span className="tooltip">Concluir Tarefa</span>
                      </div>

                    }
                    <div className="tooltip-container">
                      <FiTrash2 className="task-info-icon" onClick={() => { props.deleteActiveTask(props.taskContent.details[0].id_task) }}/>
                      <span className="tooltip">Eliminar Tarefa</span>
                    </div>
                    <div className="tooltip-container">
                      <FiCopy className="task-info-icon" onClick={() => { props.duplicateActiveTask(props.taskContent.details[0].id_task) }}/>
                      <span className="tooltip">Duplicar Tarefa</span>
                    </div>
                    <div className="tooltip-container">
                      <Link to={`/createtask/`+props.taskContent.details[0].id_task}>
                        <FiEdit3 className="task-info-icon" />
                        <span className="tooltip">Editar Tarefa</span>
                      </Link>
                    </div>
                    </>}
                  {props.taskContent.details[0].ref_id_project || (props.concluded && props.taskContent.details[0].ref_id_project) ? 
                    <div className="tooltip-container">
                      <Link to={props.concluded ? `/concludedprojects/`+props.taskContent.details[0].ref_id_project : `/projects/`+props.taskContent.details[0].ref_id_project}>
                        <FiFolder className="task-info-icon" />
                        <span className="tooltip">Ir para Projeto</span>
                      </Link>
                    </div>
                  : null}
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
                    src={props.taskContent.details[0].avatar_account_task ? props.taskContent.details[0].avatar_account_task : props.taskContent.details[0].avatar_account_project}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.taskContent.details[0].name_account}
                  />
                </div>
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );

          case 'projectoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.projectContent ? 
            props.placeholder? 
            <div className="grid-widget tasks-options" />
            :(
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <>
                  <div className="task-infos">
                      
                  {props.concluded ? 
                  <>
                    <div className="tooltip-container">
                      <FiXSquare className="task-info-icon" onClick={() => { props.undoActiveProject(props.projectContent.details[0].id_project); }} />
                      <span className="tooltip">Marca Projeto como não concluído.</span>
                    </div>

                    <div className="tooltip-container">
                      <span className="tooltip">Eliminar Projeto</span>
                      <FiTrash2 className="task-info-icon" onClick={() => { props.deleteActiveProject(props.projectContent.details[0].id_project); }} />
                    </div>
                    
                  </>
                    : <>
                    <div className="tooltip-container">
                    <FiCheckSquare
                      className="task-info-icon"
                      onClick={() => {
                       props.openConcludeModal('project'); 
                       props.openModal('conclude');
                      }}
                    /><span className="tooltip">Concluir Projeto</span>
                    </div>
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
                    </>}
                  </div>
                  <div className="account-avatar">
                  <img
                    src={props.projectContent.details[0].avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.projectContent.details[0].name_user}
                  />
                </div></>
                ) : null}
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );

          case 'clientsoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
            ) : props.clientContent ? 
            props.placeholder? 
            <div className="grid-widget tasks-options" />
            :(
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
            ) : props.memberContent ? 
            props.placeholder? 
            <div className="grid-widget tasks-options" />
            :(
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
                    <div className={props.activeTab === 'infos' ? "tooltip-container" : "tooltip-container disabled-filter"}>
                      <FiPlusCircle
                        className="task-info-icon"
                        onClick={props.activeTab === 'infos' ? props.changeInfosAreActive : null}
                      />
                      <span className="tooltip">Adicionar informação</span>
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
            case 'budgetoptions':
              return props.isLoading ? (
              <div className="grid-widget tasks-options" />
              ) : props.budgetContent ? 
                props.placeholder? 
                <div className="grid-widget tasks-options" />
              :(
              <div className="grid-widget tasks-options">
                {props.userRole === 3 || props.userRole === 2 ? (
                  <div className="task-infos">
                  <div className="tooltip-container">
                    <FiCheckSquare
                      className="task-info-icon"
                      onClick={() => {
                        props.concludeActiveBudget(props.budgetContent.details[0].id_budget);
                      }}
                    /><span className="tooltip">Eliminar Orçamento</span>
                  </div>
                  <div className="tooltip-container">
                    <FiTrash2
                      className="task-info-icon"
                      onClick={() => {
                        props.deleteActiveBudget(props.budgetContent.details[0].id_budget);
                      }}
                    /><span className="tooltip">Eliminar Orçamento</span>
                    </div>
                    <div className="tooltip-container">
                    <Link to={`/createbudget/`+props.budgetContent.details[0].id_budget}><FiEdit3
                      className="task-info-icon"
                    /><span className="tooltip">Editar Orçamento</span></Link>
                    </div>
                  </div>
                ) 
                : null
                }
                <div className="account-avatar">
                  <img
                    src={props.budgetContent.details[0].avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.budgetContent.details[0].name_user}
                  />
                </div>
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );
          case 'billingoptions':
            return props.isLoading ? (
              <div className="grid-widget tasks-options" />
              ) : props.itemContent ? 
              props.placeholder? 
              <div className="grid-widget tasks-options" />
              :(
              <div className="grid-widget tasks-options">
                  <div className="task-infos">
                  <div className="tooltip-container">
                    {props.itemContent.details[0].billed_status === 1 ? 
                    <>
                    <FiCheckSquare className="task-info-icon" onClick={() => { props.billActiveItem(props.itemContent.details[0].id, props.itemContent.details[0].type); }} />
                    <span className="tooltip">Marcar como faturado</span>
                    </>
                    : 
                    <>
                    <FiXSquare className="task-info-icon" onClick={() => { props.unBillActiveItem(props.itemContent.details[0].id, props.itemContent.details[0].type); }} />
                    <span className="tooltip">Marcar como não faturado</span>
                    </>
                    }
                      
                    </div>
                  </div>
                
                <div className="account-avatar">
                  <img
                    src={props.itemContent.details[0].avatar_user}
                    alt="Avatar"
                    style={{ borderRadius: '50%' }}
                    width="20px"
                    height="20px"
                    title={props.itemContent.details[0].name_user}
                  />
                </div>
              </div>
            ) : (
              <div className="grid-widget tasks-options"> </div>
            );
          case 'approvalsoptions':
              return props.isLoading ? (
                <div className="grid-widget tasks-options" />
                ) : props.itemContent ? 
                props.placeholder? 
                <div className="grid-widget tasks-options" />
                :(
                <div className="grid-widget tasks-options">
                    <div className="task-infos">
                      <div className="tooltip-container">
                        <FiCheckSquare color="#1de9b6" className="task-info-icon" onClick={() => { props.approveActiveItem(props.itemContent.details[0].id, props.itemContent.details[0].type); }} />
                        <span className="tooltip">Aprovar</span>
                      </div>

                      <div className="tooltip-container">
                        <FiXSquare color="#F43D3D" className="task-info-icon" onClick={() => { props.rejectActiveItem(props.itemContent.details[0].id, props.itemContent.details[0].type); }} />
                        <span className="tooltip">Reprovar</span>
                      </div>
                        
                    </div>
                  
                  <div className="account-avatar">
                    <img
                      src={props.itemContent.details[0].type === 'task' ? props.itemContent.details[0].avatar_account : props.itemContent.details[0].avatar_user}
                      alt="Avatar"
                      style={{ borderRadius: '50%' }}
                      width="20px"
                      height="20px"
                      title={props.itemContent.details[0].type === 'task' ? props.itemContent.details[0].name_account : props.itemContent.details[0].name_user}
                    />
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
