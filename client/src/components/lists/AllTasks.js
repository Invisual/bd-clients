import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import CostsModalContainer from '../../containers/inserts/CostsModalContainer'
import ConcludeModalContainer from '../../containers/inserts/ConcludeModalContainer'
import MyTasksContainer from '../../containers/tables/MyTasksContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import TaskFilters from '../options/TaskFilters';
import { FiFilePlus, FiFilter, FiUserCheck, FiSearch } from 'react-icons/fi';
import { Redirect, Link } from 'react-router-dom';

export const AllTasks = props => {
  if (props.redirect) {
    return <Redirect to="/" />;
  }
  return (
    <AllTasksDiv className="dashboard-container">
      {props.taskContent ?
      <CostsModalContainer
        taskId={props.activeTask} 
        type={props.costsModalType} 
        costs={props.taskContent.costs}
        getTaskDetails={props.getTaskDetails}
        closeModal={props.closeModal}
      /> 
      : null}
      <ConcludeModalContainer 
        closeConcludeModal={props.closeConcludeModal} 
        taskId={props.activeTask}
        taskContent={props.taskContent}
        type={props.concludeModalType} 
        getTaskDetails={props.getTaskDetails}
      /> 
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">{props.concluded? 'Tarefas Concluídas' : 'Tarefas'}</h4>
          <div className="grid-widget left-options">
          <div className="tooltip-container tasks-search">
            <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+ ' searchinput'} onChange={props.changeSearchQuery}/>
            <FiSearch onClick={props.toggleSearchInput}/>
            <span className="tooltip">Pesquisar Tarefas</span>
          </div>
          {props.userRole === 3 || props.userRole === 2 ? (
            <>
            {props.concluded? null : 
            <>
              <div className="tooltip-container">
                <Link to="/createtask">
                  <FiFilePlus />
                  <span className="tooltip">Adicionar Tarefa</span>
                </Link>
              </div>
              <div className="tooltip-container">
                  <FiUserCheck className={props.currentTaskList === 'all' ? 'task-view-icon' : 'task-view-icon icon-selected'} onClick={props.changeCurrentTaskList}/>
                  <span className="tooltip">{props.currentTaskList === 'all' ? 'Ver as minhas Tarefas' : 'Ver todas as Tarefas'}</span>
              </div>
            </>}
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Projetos</span>
            </div>
             </>
          ) 
          : 
          <>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Projetos</span>
            </div>
             </>  
          }
          </div>
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'taskoptions'}
          concluded={props.concluded}
          openConcludeModal={props.openConcludeModal}
          openModal={props.openModal}
          activeTask={props.activeTask}
          taskContent={props.taskContent}
          isLoading={props.isLoading}
          deleteActiveTask={props.deleteActiveTask}
          duplicateActiveTask={props.duplicateActiveTask}
          undoActiveTask={props.undoActiveTask}
          placeholder={props.placeholder}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyTasksContainer
              title="Tarefas"
              type="alltasks"
              concluded={props.concluded}
              reloadTasks={props.reloadTasks}
              changeActiveTask={props.changeActiveTask}
              activeTask={props.activeTask}
              copyAlert={props.copyAlert}
              activeHours={props.activeHours}
              getActiveHours={props.getActiveHours}
              activeBudgetHours={props.activeBudgetHours}
              getActiveBudgetHours={props.getActiveBudgetHours}
              filters={props.filters}
              userRole={props.userRole}
              userInfo={props.userInfo}
              currentTaskList={props.currentTaskList}
              searchQuery={props.searchQuery}
              placeholder={props.placeholder}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
        {props.filtersAreActive ?
          <TaskFilters 
            changeFilters={props.changeFilters}
            changeFiltersAreActive={props.changeFiltersAreActive}
            clientsList={props.clientsList}
            billingList={props.billingList}
            projectsList={props.projectsList}
            usersList={props.usersList}
            taskTypesList={props.taskTypesList}
            tasksStatusList={props.tasksStatusList}
            filters={props.filters}
            changePlaceholder={props.changePlaceholder}
          />
        :
          <TaskDetailContainer
            activeTask={props.activeTask}
            taskContent={props.taskContent}
            changeCommentVal={props.changeCommentVal}
            submitComment={props.submitComment}
            isLoading={props.isLoading}
            openCostsModal={props.openCostsModal}
            openModal={props.openModal}
            placeholder={props.placeholder}
            concluded={props.concluded}
          />
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};

export default AllTasks;
