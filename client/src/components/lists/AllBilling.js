import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import ConcludeModalContainer from '../../containers/inserts/ConcludeModalContainer'
import MyBillingContainer from '../../containers/tables/MyBillingContainer';
import BillingDetailContainer from '../../containers/details/BillingDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import BillingFilters from '../options/BillingFilters';
import {FiFilter, FiSearch } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';

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
          type={'billingoptions'}
          openConcludeModal={props.openConcludeModal}
          closeConcludeModal={props.closeConcludeModal}
          activeItem={props.activeTask}
          activeType={props.activeType}
          itemContent={props.itemContent}
          isLoading={props.isLoading}
          billActiveItem={props.billActiveItem}
          unBillActiveItem={props.unBillActiveItem}
          placeholder={props.placeholder}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyBillingContainer
              title="Contabilidade"
              type="allbilling"
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
          <BillingFilters 
            changeFilters={props.changeFilters}
            changeFiltersAreActive={props.changeFiltersAreActive}
            clientsList={props.clientsList}
            filters={props.filters}
            changePlaceholder={props.changePlaceholder}
          />
        :
          <BillingDetailContainer
            activeItem={props.activeItem}
            activeType={props.activeType}
            itemContent={props.itemContent}
            isLoading={props.isLoading}
            openCostsModal={props.openCostsModal}
            placeholder={props.placeholder}
          />
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};

export default AllBilling;
