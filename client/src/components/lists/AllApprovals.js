import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import CostsModalContainer from '../../containers/inserts/CostsModalContainer'
import MyApprovalsContainer from '../../containers/tables/MyApprovalsContainer';
import BudgetDetailContainer from '../../containers/details/BudgetDetailContainer';
import ProjectDetailContainer from '../../containers/details/ProjectDetailContainer';
import TaskDetailContainer from '../../containers/details/TaskDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import ApprovalFilters from '../options/ApprovalFilters';
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
        costs={props.itemContent ? props.itemContent.costs : []}
        closeModal={props.closeModal}
      /> 
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Aprovações</h4>
          <div className="grid-widget left-options">
          <div className="tooltip-container tasks-search">
            <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+ ' searchinput'} onChange={props.changeSearchQuery}/>
            <FiSearch onClick={props.toggleSearchInput}/>
            <span className="tooltip">Pesquisar</span>
          </div>
          {props.userRole === 3 || props.userRole === 2 ? (
            <>
            <div className={props.filtersAreActive ? 'tooltip-container filter-with-notification icon-tobe-selected icon-selected' : 'tooltip-container filter-with-notification icon-tobe-selected'}>
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className="task-filters-icon" onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar</span>
            </div>
             </>
          )
          :
          <>
            <div className={props.filtersAreActive ? 'tooltip-container filter-with-notification icon-tobe-selected icon-selected' : 'tooltip-container filter-with-notification icon-tobe-selected'}>
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className="task-filters-icon" onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar</span>
            </div>
             </>  
          }
          </div>
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
          placeholder={props.placeholder}
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
              placeholder={props.placeholder}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
        {props.filtersAreActive ?
          <ApprovalFilters
            changeFilters={props.changeFilters}
            changeFiltersAreActive={props.changeFiltersAreActive}
            clientsList={props.clientsList}
            accountsList={props.accountsList}
            filters={props.filters}
            changePlaceholder={props.changePlaceholder}
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
              placeholder={props.placeholder}
              />
            case 'project':
              return <ProjectDetailContainer
              type={'approvals'}
              activeProject={props.activeItem}
              projectContent={props.itemContent}
              changeActiveTab={props.changeActiveTab}
              openCostsModal={props.openCostsModal}
              openModal={props.openModal}
              activeTab={props.activeTab}
              placeholder={props.placeholder}
              />
            case 'task':
              return <TaskDetailContainer 
              type={'approvals'}
              activeTask={props.activeItem}
              taskContent={props.itemContent}
              openCostsModal={props.openCostsModal}
              openModal={props.openModal}
              placeholder={props.placeholder}
              />
            case '':
              return <div>
                      <div className="no-content" />
                     </div>
            default:
              return <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          };
          })()
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};
