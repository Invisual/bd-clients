import React, { Component } from 'react';
import {SingleProjectDiv} from '../../styles/singles';
import { Line } from 'rc-progress';
import { FiCircle } from 'react-icons/fi';

class SingleProject extends Component {
  render() {

    var projectStatus = '';
    switch(this.props.stateVal){
      case 1:
      projectStatus = <FiCircle color="#5e78dd"/>;
      break;
      case 2:
      projectStatus = <FiCircle fill="#1de9b6" color="#1de9b6"/>;
      break;
      default:
      projectStatus = <FiCircle color="#5e78dd"/>;
    }

    return (
      <SingleProjectDiv className="single-card">
        <div className="project-status">{projectStatus}</div>
        <div className="project-title"><span className="title-divider">{this.props.title} </span> <span className="project-client">{this.props.client}</span></div>
        <div className="project-total-tasks">10</div>
        <div className="project-concluded-tasks">5</div>
        <div className="task-progress"><Line percent="40" strokeWidth="12" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="12" /></div>
      </SingleProjectDiv>
    );
  }
}

export default SingleProject;