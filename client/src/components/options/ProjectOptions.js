import React from 'react';
import { FiTrash2, FiCopy, FiEdit3, FiFolder } from 'react-icons/fi';

export const ProjectOptions = props => {
  return (
    <>
      {props.isLoading ? (
        <div className="grid-widget tasks-options" />
      ) : props.projectContent ? (
        <div className="grid-widget tasks-options">
          {props.userRole === 3 || props.userRole === 2 ? (
            <div className="task-infos">
              <FiTrash2
                className="task-info-icon"
                onClick={() => {
                  props.deleteActiveTask(props.projectContent.details[0].id_project);
                }}
              />
              <FiCopy
                className="task-info-icon"
                onClick={() => {
                  props.duplicateActiveTask(props.projectContent.details[0].id_project);
                }}
              />
              <FiEdit3
                className="task-info-icon"
                onClick={() => {
                  props.editActiveTask(props.projectContent.details[0].id_project);
                }}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid-widget tasks-options"> </div>
      )}
    </>
  );
};

export default ProjectOptions;
