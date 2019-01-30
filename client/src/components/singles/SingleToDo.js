import React, { Component } from 'react';
import {SingleToDoDiv} from '../../styles/singles';
import { FiCircle } from 'react-icons/fi';

class SingleToDo extends Component {

  render() {
    var todoStatus = '';
    switch(this.props.status){
      case 1:
      todoStatus = <FiCircle fill="#5E78DD" color="#5e78dd"/>;
      break;
      case 0:
      todoStatus = <FiCircle  color="#5E78DD"/>;
      break;
      default:
      todoStatus = <FiCircle color="#5e78dd"/>;
    }

    return (
      <SingleToDoDiv className="single-todo">
        <div className="todo-status" onClick={() => this.props.changeToDoStatus(this.props.id, this.props.status)}>{todoStatus}</div>
        <div className="todo-text">{this.props.text}</div>
      </SingleToDoDiv>
    );
  }
}

export default SingleToDo;
