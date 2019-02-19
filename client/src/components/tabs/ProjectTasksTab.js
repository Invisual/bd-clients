import React from 'react';

class ProjectTasksTab extends React.Component {
  render() {
    return (
      <>
        <div className="project-task-tab">
          <div className="project-task-tab-title">
            <span>Por iniciar</span>
            {this.props.projectContent.tasks
              .filter(status => {
                return status.ref_id_user_task_status === 1;
              })
              .map(task => {
                return (
                  <div className="single-card-todo todo" key={task.id_task}>
                    {task.title_task}
                    <img src={task.avatar_user} alt={task.name_user} />
                  </div>
                );
              })}
          </div>
          <div className="project-task-tab-title">
            <span>Em curso</span>
            {this.props.projectContent.tasks
              .filter(status => {
                return status.ref_id_user_task_status === 2 || status.ref_id_user_task_status===3
     
              })
              .map(task => {
                return (
                  <div className="single-card-todo doing" key={task.id_task}>
                    {task.title_task}
                    <img src={task.avatar_user} alt={task.name_user} />
                  </div>
                );
              })}
          </div>
          <div className="project-task-tab-title">
            <span>Concluídas</span>
            {this.props.projectContent.tasks
              .filter(status => {
                return status.ref_id_user_task_status === 4;
              })
              .map(task => {
                return (
                  <div className="single-card-todo done" key={task.id_task}>
                    {task.title_task}
                    <img src={task.avatar_user} alt={task.name_user} />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default ProjectTasksTab;
