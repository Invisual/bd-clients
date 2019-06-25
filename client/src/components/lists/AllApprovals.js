import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import CostsModalContainer from '../../containers/inserts/CostsModalContainer'
import MyApprovalsContainer from '../../containers/tables/MyApprovalsContainer';
import BudgetDetailContainer from '../../containers/details/BudgetDetailContainer';
import ProjectDetailContainer from '../../containers/details/ProjectDetailContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import TaskFilters from '../options/TaskFilters';
import {FiFilter, FiSearch } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
 
export const AllApprovals = props => {
  if (props.redirect) {
    return <Redirect to="/" />;
  }
  return (
    <AllTasksDiv className="dashboard-container">
      <CostsModalContainer
        taskId={props.activeItem} 
        type={props.costsModalType} 
        costs={props.itemContent.costs}
        closeModal={props.closeModal}
      /> 
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Aprovações</h4>
          <div className="tooltip-container tasks-search">
            <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+ ' searchinput'} onChange={props.changeSearchQuery}/>
            <FiSearch onClick={props.toggleSearchInput}/>
            <span className="tooltip">Pesquisar</span>
          </div>
          {props.userRole === 3 || props.userRole === 2 ? (
            <>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar</span>
            </div>
             </>
          )
          :
          <>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar</span>
            </div>
             </>  
          }
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'approvalsoptions'}
          activeItem={props.activeTask}
          activeType={props.activeType}
          itemContent={props.itemContent}
          approveActiveItem={props.approveActiveItem}
          rejectActiveItem={props.rejectActiveItem}
          isLoading={props.isLoading}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyApprovalsContainer
              title="Aprovações"
              type="allapprovals"
              reloadItems={props.reloadItems}
              changeActiveItem={props.changeActiveItem}
              activeItem={props.activeItem}
              activeType={props.activeType}
              copyAlert={props.copyAlert}
              filters={props.filters}
              userRole={props.userRole}
              searchQuery={props.searchQuery}
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
          />
        : props.isLoading ?
        <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        :
        (() => {
          switch(props.activeType) {
            case 'budget':
              return <BudgetDetailContainer
              type={'approvals'}
              activeBudget={props.activeItem}
              budgetContent={props.itemContent}
              isLoading={props.isLoading}
              />
            case 'project':
              return <ProjectDetailContainer
              type={'approvals'}
              activeProject={props.activeItem}
              projectContent={props.itemContent}
              changeActiveTab={props.changeActiveTab}
              openCostsModal={props.openCostsModal}
              openModal={props.openModal}
              activeTab={props.activeTab}/>
            case 'task':
              return <TaskDetailContainer 
              type={'approvals'}
              activeTask={props.activeItem}
              taskContent={props.itemContent}
              openCostsModal={props.openCostsModal}
              openModal={props.openModal}
              />
            default:
              return <h1>ola</h1>
          };
          })()
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};
