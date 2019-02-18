import React from 'react';
import SingleProject from '../singles/SingleProject';
import { FiArrowRight } from 'react-icons/fi';

export const MyProjects = props => {
  var content = '';
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.projects ? (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="project-labels">
                <span />
                <span />
                <span>Totais</span>
                <span>Concluídas</span>
                <span>Estado</span>
              </div>
              {props.projects.map(project => {
                return (
                  <SingleProject
                    key={project.id_project}
                    id={project.id_project}
                    title={project.title_project}
                    stateVal={project.concluded_project}
                    client={project.name_client}
                    total_tasks={project.total_tasks}
                    concluded_tasks={project.concluded_tasks}
                    percentage_tasks={project.percentage_tasks}
                  />
                );
              })}
              <div className="see-all">
                Ver todos{' '}
                <span className="arrow">
                  <FiArrowRight color="#0031e6" />
                </span>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="empty-placeholder">Ainda não está inserido em nenhum projecto.</div>
            </div>
          )}
        </div>
      );
      break;
    case 'allprojects':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.projects ? (
              props.projects.map(project => {
                return (
                  <SingleProject
                    key={project.id_project}
                    id={project.id_project}
                    title={project.title_project}
                    stateVal={project.concluded_project}
                    client={project.name_client}
                    total_tasks={project.total_tasks}
                    doing={project.doing}
                    concluded_tasks={project.concluded_tasks}
                    percentage_tasks={project.percentage_tasks}
                    changeActiveProject={props.changeActiveProject}
                    activeProject={props.activeProject}
                    type={props.type}
                  />
                );
              })
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="empty-placeholder">Ainda não está inserido em nenhum projecto.</div>
            </div>
          )}
        </div>
      );
      break;
    default:
      content = '';
  }
  return content;
};
