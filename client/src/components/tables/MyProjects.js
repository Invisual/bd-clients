import React from 'react';
import SingleProject from '../singles/SingleProject';
import { FiArrowRight } from 'react-icons/fi';

export const MyProjects = (props) => {
    return (
        <div className="mytasks-container widget cards-container">
          <h4 className="widget-title">{props.title}</h4>
          <div className="project-labels"><span></span><span></span><span>Totais</span><span>Concluídas</span><span>Estado</span></div>
          {props.projects.map(project => {
              return <SingleProject key={project.id} id={project.id} title={project.title} state={project.state} stateVal={project.stateval} client={project.client} members={project.members}/>
          })}
          <div className="see-all">Ver todos <span className="arrow"><FiArrowRight color="#0031e6"/></span></div>
        </div>
      );
}
