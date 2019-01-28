import React from 'react';
import SingleTask from '../singles/SingleTask';
import { FiArrowRight } from 'react-icons/fi';

export const MyTasks = (props) => {
    return (
        <div className="mytasks-container widget cards-container">
          <h4 className="widget-title">{props.title}</h4>
          {props.tasks.map(task => {
              return <SingleTask key={task.id_task} id={task.id_task} title={task.title_task} state={task.state} hourState={1} projectState={1} stateVal={task.ref_id_user_task_status}/>
          })}
          <div className="see-all">Ver todas <span className="arrow"><FiArrowRight color="#0031e6"/></span></div>
        </div>
      );
}
