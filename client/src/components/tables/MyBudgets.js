import React from 'react';
import { Link } from 'react-router-dom';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyBudgets = props => {
  console.log(props.budget)
  return <div className="mytasks-container widget">
  {props.budget ? (
    props.budget.map(budget => {
      var hourState = 0;
      var hourId = '';
      if (props.activeHours !== undefined && props.activeHours !== null) {
        for (var i = 0, count = props.activeHours.length; i < count; i++) {
          if (budget.id_budget === props.activeHours[i].id_task) {
            hourState = 1;
            hourId = props.activeHours[i].id_task_hour;
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
