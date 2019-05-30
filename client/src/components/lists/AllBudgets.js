import React from 'react';
import { AllTasksDiv } from '../../styles/listings';
import MyBudgetsContainer from '../../containers/tables/MyBudgetsContainer';
import BudgetDetailContainer from '../../containers/details/BudgetDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import BudgetFilters from '../options/BudgetFilters';
import { FiFilePlus, FiFilter, FiUserCheck } from 'react-icons/fi';
import { Redirect, Link } from 'react-router-dom';

export const AllBudgets = props => {
  if (props.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <AllTasksDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Orçamentos</h4>
          {props.userRole === 3 || props.userRole === 2 ? (
            <>
            <div className="tooltip-container">
              <Link to="/createbudget">
                <FiFilePlus />
                <span className="tooltip">Adicionar Orçamento</span>
              </Link>
            </div>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Orçamentos</span>
            </div>
             </>
          ) 
          : 
          <>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Orçamentos</span>
            </div>
             </>  
          }
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'budgetoptions'}
          activeBudget={props.activeBudget}
          budgetContent={props.budgetContent}
          isLoading={props.isLoading}
          deleteActiveBudget={props.deleteActiveBudget}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyBudgetsContainer
              title="Tarefas"
              type="alltasks"
              reloadBudgets={props.reloadBudgets}
              changeActiveBudget={props.changeActiveBudget}
              activeBudget={props.activeBudget}
              copyAlert={props.copyAlert}
              activeBudgetHours={props.activeBudgetHours}
              getActiveBudgetHours={props.getActiveBudgetHours}
              activeHours={props.activeHours}
              getActiveHours={props.getActiveHours}
              filters={props.filters}
              userRole={props.userRole}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
        {props.filtersAreActive ?
          <BudgetFilters 
            changeFilters={props.changeFilters}
            changeFiltersAreActive={props.changeFiltersAreActive}
            clientsList={props.clientsList}
            accountsList={props.accountsList}
            internalStatusList={props.internalStatusList}
            externalStatusList={props.externalStatusList}
            filters={props.filters}
          />
        :
          <BudgetDetailContainer
            activeBudget={props.activeBudget}
            budgetContent={props.budgetContent}
            changeCommentVal={props.changeCommentVal}
            submitComment={props.submitComment}
            isLoading={props.isLoading}
            getBudgetDetails={props.getBudgetDetails}
          />
        }
        </div>
      </div>
    </AllTasksDiv>
  );
};

export default AllBudgets;
