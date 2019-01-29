import React from 'react';
import SingleToDo from '../singles/SingleToDo';
import { FiArrowRight } from 'react-icons/fi';

export const MyToDo = props => {
  return (
    <div className="mytasks-container widget cards-container">
      <h4 className="widget-title">{props.title}</h4>
      <div className="todo-scroll-container">
      {props.todo.map(todo => {
        return (
          <SingleToDo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            status={todo.status}
            changeTaskStatus={props.changeTaskStatus}
          />
        );
      })}
      </div>
      <div className="see-all">
        Ver todos{' '}
        <span className="arrow">
          <FiArrowRight color="#0031e6" />
        </span>
      </div>
    </div>
  );
};
