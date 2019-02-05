import React from 'react';
import { FiTrash2, FiCopy, FiEdit3, FiFolder } from 'react-icons/fi';

export const TaskOptions = props => {
  return (
    <>
      {props.isLoading ? (
        <div className="grid-widget tasks-options">
          
        </div>
      ) : (
        <div className="grid-widget tasks-options">
          {props.userRole === 3 || props.userRole === 2 ? (
            <div className="task-infos">
              <FiTrash2 className="task-info-icon" onClick={()=>{props.deleteActiveTask(props.taskContent.details[0].id_task)}} />
              <FiCopy className="task-info-icon" onClick={()=>{props.duplicateActiveTask(props.taskContent.details[0].id_task)}}/>
              <FiEdit3 className="task-info-icon" onClick={()=>{props.editActiveTask(props.taskContent.details[0].id_task)}}/>
              <FiFolder className="task-info-icon" onClick={()=>{console.log('ir ao projecto '+props.taskContent.details[0].id_task)}}/>
            </div>
          ) : null}
          <div className="account-avatar">
            {' '}
            {props.taskContent.details[0].avatar_user ? (
                <img src={props.taskContent.details[0].avatar_user} alt="Avatar" style={{ borderRadius: '50%' }} width="20px" height="20px" />
              ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskOptions;
