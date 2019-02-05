import React from 'react';
import { FiTrash2, FiCopy, FiEdit3, FiFolder } from 'react-icons/fi';

export const TaskOptions = props => {
  return (
    <>
      {props.isLoading ? (
        <div className="grid-widget tasks-options">
          <img scr="img/loading.svg" alt="Loading" className="loading-spinner" />
        </div>
      ) : (
        <div className="grid-widget tasks-options">
          {props.userRole === 3 || props.userRole === 2 ? (
            <div className="task-infos">
              <FiTrash2 className="task-info-icon" />
              <FiCopy className="task-info-icon" />
              <FiEdit3 className="task-info-icon" />
              <FiFolder className="task-info-icon" />
            </div>
          ) : null}
          <div className="account-avatar">
            {' '}
            <img src={props.taskOptions.details[0].avatar_user} alt="Avatar" style={{ borderRadius: '50%' }} width="20px" height="20px" />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskOptions;
