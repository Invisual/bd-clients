import React, { Component } from 'react';
import { SingleTaskDiv } from '../../styles/singles';
import { FiFolder } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';

class SingleTask extends Component {
  render() {
    var taskColor = '';
    switch (this.props.stateVal) {
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

    var projectFolder = '';
    switch (this.props.projectState) {
      case !null:
        projectFolder = <FiFolder color="#7F9AFF" />;
        break;
      case null:
        projectFolder = '';
        break;
      default:
        projectFolder = <FiFolder color="#7F9AFF" />;
    }

    var singleContent = '';
    if (this.props.type) {
      let active = (this.props.id === this.props.activeTask ? ' active': '');
      singleContent = (
        <SingleTaskDiv className={`single-card-task${active}`} taskColor={taskColor}>
          <div className="task-title title-click" onClick={() => this.props.changeActiveTask(this.props.id)}>
            {this.props.title}
          </div>
          <div className="task-watch">{projectFolder}</div>
          <div className="task-watch">
            <FiClock className={this.props.hourState === 1 ? 'active-clock' : 'inactive-clock'} />
          </div>
          <div className="task-state" onClick={() => this.props.changeTaskStatus(this.props.id, this.props.stateVal)}>
            {this.props.stateTitle}
          </div>
        </SingleTaskDiv>
      );
    } else {
      singleContent = (
        <SingleTaskDiv className="single-card-task" taskColor={taskColor}>
          <div className="task-title">{this.props.title}</div>
          <div className="task-watch">{projectFolder}</div>
          <div className="task-watch">
            <FiClock className={this.props.hourState === 1 ? 'active-clock' : 'inactive-clock'} />
          </div>
          <div className="task-state" onClick={() => this.props.changeTaskStatus(this.props.id, this.props.stateVal)}>
            {this.props.stateTitle}
          </div>
        </SingleTaskDiv>
      );
    }
    return singleContent;
  }
}

export default SingleTask;
