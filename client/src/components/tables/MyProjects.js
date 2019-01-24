import React from 'react';
import SingleProject from '../singles/SingleProject';

export const MyProjects = (props) => {
    return (
        <div className="mytasks-container widget cards-container">
          <h4 className="widget-title">{props.title}</h4>
          {props.projects.map(project => {
              return <SingleProject key={project.id} id={project.id} title={project.title} state={project.state} stateVal={project.stateval} client={project.client} members={project.members}/>
          })}
        </div>
      );
}
