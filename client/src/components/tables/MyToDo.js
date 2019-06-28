import React from 'react';
import SingleToDo from '../singles/SingleToDo';
import { FiArrowRight, FiX, FiPlus } from 'react-icons/fi';
import { TodoListDashboardDiv, TodoListCompleteDiv } from '../../styles/todolist';
import { FiSend } from 'react-icons/fi';

export const MyToDo = props => {
  return (
    <>
      {props.type === 'dashboard' ? (
        <TodoListDashboardDiv className="widget cards-container dashboard-cards-container">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.todos ? (
            <>
              <h4 className="widget-title">{props.title}</h4>
              <div className="mytodo-container">
              <div className="todo-scroll-container">
                {props.todos.slice(0, 10).map(todo => {
                  return (
                    <SingleToDo
                      key={todo.id_todo_list}
                      id={todo.id_todo_list}
                      text={todo.title_list}
                      status={todo.status_list}
                      changeToDoStatus={props.changeToDoStatus}
                    />
                  );
                })}
              </div>
              <div className="see-all" onClick={() => props.openModal('todo')}>
                Ver todos{' '}
                <span className="arrow">
                  <FiArrowRight color="#0031e6" />
                </span>
              </div>
              </div>
              </>
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="no-todos-dash no-content-dash"><div className="empty-placeholder">Ainda não tem nenhum item na sua lista de to-dos.</div></div>
              <div
                className={props.textAreaOpen ? 'todo-textarea slidebottomanimation' : 'nodisplay todo-textarea'}
              >
                <textarea placeholder="Escreve um To-Do..." onChange={props.changeTextAreaVal} id="textarea-fullmodal" />
              </div>
              {props.textAreaOpen ? (
                <div className="todo-add" onClick={props.addToDo}>
                  <FiSend className="todo-send-icon" />
                </div>
              ) : (
                <div className="todo-add" onClick={props.openTextAreaModal}>
                  <FiPlus />
                </div>
              )}
            </div>
          )}
        </TodoListDashboardDiv>
      ) : (
        <TodoListCompleteDiv className="cards-container complete-todo-modal">
          <div className="todo-close" onClick={() => props.closeModal('todo')}>
            <FiX />
          </div>
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.todos ? (
            <div className="todo-content-container">
              <h4 className="widget-title">{props.title}</h4>
              <div className="todo-scroll-container">
                {props.todos.map(todo => {
                  return (
                    <SingleToDo
                      key={todo.id_todo_list}
                      id={todo.id_todo_list}
                      text={todo.title_list}
                      status={todo.status_list}
                      changeToDoStatus={props.changeToDoStatus}
                    />
                  );
                })}
              </div>
              <div className={props.textAreaOpen ? 'todo-textarea slidebottomanimation' : 'nodisplay todo-textarea'}>
                <textarea placeholder="Escreve um To-Do..." onChange={props.changeTextAreaVal} id="textarea-fullmodal" />
              </div>
              {props.textAreaOpen ? (
                <div className="todo-add" onClick={props.addToDo}>
                  <FiSend className="todo-send-icon" />
                </div>
              ) : (
                <div className="todo-add" onClick={props.openTextAreaModal}>
                  <FiPlus />
                </div>
              )}
            </div>
          ) 
          :
          (
            <div className="todo-content-container">
              <h4 className="widget-title">{props.title}</h4>
              <div className="todo-scroll-container posrelative">
                <div className="no-todos">
                  <div className="empty-placeholder">Ainda não tem nenhuma To-Do. Adicione aqui a sua primeira.</div>
                </div>
              </div>
              <div className={props.textAreaOpen ? 'todo-textarea slidebottomanimation' : 'nodisplay todo-textarea'}>
                <textarea placeholder="Escreve um To-Do..." onChange={props.changeTextAreaVal} id="textarea-fullmodal" />
              </div>
              {props.textAreaOpen ? (
                <div className="todo-add" onClick={props.addToDo}>
                  <FiSend className="todo-send-icon" />
                </div>
              ) : (
                <div className="todo-add" onClick={props.openTextAreaModal}>
                  <FiPlus />
                </div>
              )}
            </div>
          )
          }
        </TodoListCompleteDiv>
      )}
    </>
  );
};
