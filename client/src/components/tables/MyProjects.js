import React from 'react';
import {Link} from 'react-router-dom'
import SingleProject from '../singles/SingleProject';
import { FiArrowRight } from 'react-icons/fi';

export const MyProjects = props => {
  var content = '';
  
  switch (props.type) {
    case 'dashboard':
      content = (
        <div className="mytasks-container widget cards-container dashboard-cards-container pb45">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.projects.length>0 ? 
               (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="project-labels">
                <span />
                <span />
                <span>Totais</span>
                <span>Concluídas</span>
                <span>Estado</span>
              </div>
              {props.projects.slice(0, 4).map(project => {
                return (
                  <SingleProject
                    key={project.id_project}
                    id={project.id_project}
                    title={project.title_project}
                    stateVal={project.concluded_project}
                    client={project.name_client}
                    clientId={project.id_client}
                    total_tasks={project.total_tasks}
                    concluded_tasks={project.concluded_tasks}
                    percentage_tasks={project.percentage_tasks}
                  />
                );
              })}
              <Link to="/projects">
                <div className="see-all">
                  Ver todos{' '}
                  <span className="arrow">
                    <FiArrowRight color="#0031e6" />
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="no-projects-dash no-content-dash"><div className="empty-placeholder">Ainda não está inserido em nenhum Projeto.</div></div>
            </div>
          )}
        </div>
      );
      break;
    case 'allprojects':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? (
            <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.projects ? 
                props.placeholder ?
                <div className="empty-placeholder">Sem Projetos correspondentes aos filtros ativos.</div>
            :(
            props.projects.map(project => {
              return (
                <SingleProject
                  key={project.id_project}
                  id={project.id_project}
                  title={project.title_project}
                  creation_date_project={project.creation_date_project}
                  projectDeadline={project.deadline_project}
                  stateVal={project.concluded_project}
                  client={project.name_client}
                  clientId={project.id_client}
                  total_tasks={project.total_tasks}
                  doing={project.doing}
                  concluded_tasks={project.concluded_tasks}
                  percentage_tasks={project.percentage_tasks}
                  changeActiveProject={props.changeActiveProject}
                  activeProject={props.activeProject}
                  billedProject={project.billed_project}
                  type={props.type}
                />
              );
            })
          ) : (
            <div>
              <div className="empty-placeholder">{props.concluded? 'Sem Projetos concuídos.' : 'Ainda não está inserido em nenhum projecto.' }</div>
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
