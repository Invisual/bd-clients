import React from 'react';
import SingleProject from '../singles/SingleProject';

class ClientProjectsTab extends React.Component {
  render() {
    return (
      <>
      {this.props.clientContent.projects.length ?
        <div className="client-content">
          <div className="project-labels">
            <span />
            <span />
            <span>Totais</span>
            <span>Concluídas</span>
            <span>Estado</span>
          </div>
          <div className="client-project-container">
            {this.props.clientContent.projects.map(project => {
              return (
                <SingleProject
                  type={'clients'}
                  key={project.id_project}
                  id={project.id_project}
                  title={project.title_project}
                  stateVal={project.concluded_project}
                  intervenientes={project.intervenientes}
                  client={project.name_client}
                  total_tasks={project.total_tasks}
                  concluded_tasks={project.concluded_tasks}
                  percentage_tasks={project.percentage_tasks}
                />
              );
            })}
          </div>
        </div> : <div className="client-content">Este Cliente ainda não tem projetos associados.</div>}
      </>
    );
  }
}

export default ClientProjectsTab;
