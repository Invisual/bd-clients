import React, { Component } from 'react';
import { SingleProjectDiv, AllSingleProjectDiv } from '../../styles/singles';
import { Line } from 'rc-progress';
import { FiCircle, FiClock, FiUser } from 'react-icons/fi';

class SingleProject extends Component {
  render() {
    var projectStatus = '';
    switch (this.props.stateVal) {
      case 1:
        projectStatus = <FiCircle color="#5e78dd" />;
        break;
      case 0:
        projectStatus = <FiCircle fill="#1de9b6" color="#1de9b6" />;
        break;
      default:
        projectStatus = <FiCircle color="#5e78dd" />;
    }

    var content = '';

    switch (this.props.type) {
      case 'allprojects':
        content = (
          <AllSingleProjectDiv className="single-card">
            <div className="project-header">
              <div className="project-title">
                {projectStatus}
                <span>{this.props.title} </span>
              </div>
              <div className="project-client-date">
                <div className="project-icon-client"><FiUser/><span className="project-client"> {this.props.client}</span></div>
                <span className="project-date">
                  <FiClock /> 29/01/2019
                </span>
              </div>
            </div>

            <div className="project-tasks-progress">
              <div className="project-tasks"><span className="label">Totais</span><span className="label-value">{this.props.total_tasks}</span></div>
              <div className="project-tasks"><span className="label">Curso</span><span className="label-value">{this.props.doing}</span></div>
              <div className="project-tasks"><span className="label">Concluídas</span><span className="label-value">{this.props.concluded_tasks}</span></div>
            </div>
            <div className="project-progress">
              <Line
                percent={this.props.percentage_tasks}
                strokeWidth="5"
                strokeColor="#1de9b6"
                trailColor="#d2fbf0"
                trailWidth="5"
              />
            </div>
          </AllSingleProjectDiv>
        );
        break;
      default:
        content = (
          <SingleProjectDiv className="single-card">
            <div className="project-status">{projectStatus}</div>
            <div className="project-title">
              <span className="title-divider">{this.props.title} </span>{' '}
              <span className="project-client">{this.props.client}</span>
            </div>
            <div className="project-total-tasks">{this.props.total_tasks}</div>
            <div className="project-concluded-tasks">{this.props.concluded_tasks}</div>
            <div className="task-progress">
              <Line
                percent={this.props.percentage_tasks}
                strokeWidth="10"
                strokeColor="#1de9b6"
                trailColor="#d2fbf0"
                trailWidth="10"
              />
            </div>
          </SingleProjectDiv>
        );
    }

    return content;
  }
}

export default SingleProject;
