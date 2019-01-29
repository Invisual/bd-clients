import React, { Component } from 'react';
import {SingleTaskDiv} from '../../styles/singles';
import { FiFolder } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';

class SingleTask extends Component {

  render() {
    var taskColor = '';
    switch(this.props.stateVal){
      case 1:
      taskColor = '#F50057';
      break;
      case 2:
      taskColor = '#1DE9B6';
      break;
      case 3:
      taskColor = '#651FFF';
      break;
      default:
      taskColor = '#F50057';
    }

    var clockColor = '';
    switch(this.props.hourState){
      case 0:
      clockColor = <FiClock  color="#0036FF" />;
      break;
      case 1:
      clockColor =  <FiClock  color="#F43D3D" />;
      break;
      default:
      clockColor = <FiClock color="#0036FF" />;
    }

    var projectFolder = '';
    switch(this.props.projectState){
      case !null:
      projectFolder = <FiFolder color="#7F9AFF" />;
      break;
      case null:
      projectFolder = '';
      break;
      default:
      projectFolder = <FiFolder color="#7F9AFF" />;
    }

    return (
      <SingleTaskDiv className="single-card-task" taskColor={taskColor}>
        <div className="project-title"><span className="title-divider">{this.props.title} </span></div>
        <div className="task-watch">{projectFolder}</div>
        <div className="task-watch">{clockColor}</div>
        <div className="task-state" onClick={() => this.props.changeTaskStatus(this.props.id, this.props.stateVal)}>{this.props.stateTitle}</div>
      </SingleTaskDiv>
    );
  }
}

export default SingleTask;
