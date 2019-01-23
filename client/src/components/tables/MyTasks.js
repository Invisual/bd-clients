import React from 'react';
import SingleTask from '../singles/SingleTask';

export const MyTasks = (props) => {
    return (
        <div className="mytasks-container widget">
          <h4 className="widget-title">{props.title}</h4>
          {props.tasks.map(task => {
              return <SingleTask key={task.id} id={task.id} title={task.title} state={task.state} stateVal={task.stateval}/>
          })}
        </div>
      );
}
