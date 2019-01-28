import React from 'react';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyTasks = (props) => {
    return (
        <div className="mytasks-container widget cards-container">
          <h4 className="widget-title">{props.title}</h4>
          {props.tasks.map(task => {
              return <SingleTask key={task.id} id={task.id} title={task.title} state={task.state} hourState={task.hourState} projectState={task.projectState} stateVal={task.stateval}/>
          })}
          <div className="see-all">Ver todas <span className="arrow"><FiArrowRight color="#0031e6"/></span></div>
        </div>
      );
}
