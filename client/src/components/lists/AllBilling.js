import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import ConcludeModalContainer from '../../containers/inserts/ConcludeModalContainer'
import MyBillingContainer from '../../containers/tables/MyBillingContainer';
import BillingDetailContainer from '../../containers/details/BillingDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import TaskFilters from '../options/TaskFilters';
import {FiFilter, FiSearch } from 'react-icons/fi';
import { Redirect, Link } from 'react-router-dom';
export const AllBilling = props => {
  if (props.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <AllTasksDiv className="dashboard-container">
      { props.isConcludeModalOpen ? 
          <ConcludeModalContainer 
            closeConcludeModal={props.closeConcludeModal} 
            taskId={props.activeTask}
            taskContent={props.taskContent}
            type={props.concludeModalType} 
            getTaskDetails={props.getTaskDetails}
          /> 
        : 
          null
      }
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Contabilidade</h4>
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
          type={'billingoptions'}
          openConcludeModal={props.openConcludeModal}
          closeConcludeModal={props.closeConcludeModal}
          activeTask={props.activeTask}
          taskContent={props.taskContent}
          isLoading={props.isLoading}
          deleteActiveTask={props.deleteActiveTask}
          duplicateActiveTask={props.duplicateActiveTask}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyBillingContainer
              title="Contabilidade"
              type="allbilling"
              reloadItems={props.reloadTasks}
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
        :
          <BillingDetailContainer
            activeItem={props.activeItem}
            activeType={props.activeType}
            itemContent={props.itemContent}
            isLoading={props.isLoading}
            openCostsModal={props.openCostsModal}
          />
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};

export default AllBilling;
