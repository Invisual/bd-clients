import React, { Component } from 'react';
import {SingleTaskDiv} from '../../styles/singles';
import {FaStopwatch} from 'react-icons/fa';

class SingleTask extends Component {
  render() {

    var taskColor = '';
    switch(this.props.stateVal){
      case 1:
      taskColor = '#f34135';
      break;
      case 2:
      taskColor = '#2095f2';
      break;
      case 3:
      taskColor = '#4baf4f';
      break;
      default:
      taskColor = '#f34135';
    }

    return (
      <SingleTaskDiv taskColor={taskColor}>
        <p>{this.props.title}</p>
        <div className="task-watch"><FaStopwatch /></div>
        <div className="task-state">{this.props.state}</div>
      </SingleTaskDiv>
    );
  }
}

export default SingleTask;
