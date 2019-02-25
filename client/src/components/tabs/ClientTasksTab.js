import React from 'react';

class ClientTasksTab extends React.Component {
  render() {
    return (
      <>
        <div className="project-task-tab">
          <div className="project-task-tab-title">
            <span>Por iniciar</span>
            <div className="scrum-list">
            {this.props.clientContent.tasks.filter(status => {return status.ref_id_user_task_status === 1;}).length ?
              this.props.clientContent.tasks
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
              }) : <div>Sem tarefas por iniciar.</div>}</div>
          </div>
          <div className="project-task-tab-title">
            <span>Em curso</span>
            <div className="scrum-list">
            {this.props.clientContent.tasks.filter(status => {return status.ref_id_user_task_status === 2 || status.ref_id_user_task_status===3}).length ?
              this.props.clientContent.tasks
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
              }): <div>Sem tarefas em curso.</div>}</div>
          </div>
          <div className="project-task-tab-title">
            <span>Concluídas</span>
            <div className="scrum-list">
            {this.props.clientContent.tasks.filter(status => {return status.ref_id_user_task_status === 4}).length ?
              this.props.clientContent.tasks
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
              }): <div>Sem tarefas concluídas.</div>}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ClientTasksTab;
