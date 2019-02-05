import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

class TaskDetailContainer extends Component {
  render() {

    return <TaskDetail taskContent={this.props.taskContent} isLoading={this.props.isLoading}/>;

  }
}

export default TaskDetailContainer;
