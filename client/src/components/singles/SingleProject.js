import React, { Component } from 'react';
import {SingleProjectDiv} from '../../styles/singles';

class SingleProject extends Component {
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
      <SingleProjectDiv className="single-card" taskColor={taskColor}>
        <p>{this.props.title}</p>
        <div className="project-members">{this.props.members}</div>
        <div className="project-client">{this.props.client}</div>
      </SingleProjectDiv>
    );
  }
}

export default SingleProject;