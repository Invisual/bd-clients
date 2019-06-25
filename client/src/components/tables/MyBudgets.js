import React from 'react';
import SingleTask from '../singles/SingleTask';

export const MyBudgets = props => {
  return <div className="mytasks-container widget">
  {props.budget ? 
    props.placeholder ?
    <div>
      <div className="empty-placeholder">Sem Orçamentos correspondentes aos filtros ativos.</div>
    </div>
    
  :(
    props.budget.map(budget => {
      var hourState = 0;
      var hourId = '';
      if (props.activeBudgetHours !== undefined && props.activeBudgetHours !== null) {
        for (var i = 0, count = props.activeBudgetHours.length; i < count; i++) {
          if (budget.id_budget === props.activeBudgetHours[i].id_budget) {
            hourState = 1;
            hourId = props.activeBudgetHours[i].id_budget_hour;
          }
        }
      }
      return (
        <SingleTask
          key={budget.id_budget}
          id={budget.id_budget}
          title={budget.title_budget}
          state={budget.state}
          hourState={hourState}
          hourId={hourId}
          stateVal={budget.ref_id_budget_internal_status}
          stateTitle={budget.name_budget_internal_status}
          changeBudgetStatus={props.changeBudgetStatus}
          changeActiveBudget={props.changeActiveBudget}
          activeBudget={props.activeBudget}
          copyAlert={props.copyAlert}
          type={'budgets'}
          startCountingHours={props.startCountingHours}
          stopCountingHours={props.stopCountingHours}
        />
      );
    })
  ) : (
    <div>
      <div className="empty-placeholder">Ainda não tem nenhum orçamento.</div>
    </div>
  )}
</div>;
};
