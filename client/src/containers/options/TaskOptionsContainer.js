import React, { Component } from 'react';
import { TaskOptions } from '../../components/options/TaskOptions';

class TaskOptionsContainer extends Component {
  render() {
    return (
      <TaskOptions
        userRole={this.props.userRole}
        isLoading={this.props.isLoading}
        taskContent={this.props.taskContent}
        deleteActiveTask={this.props.deleteActiveTask}
        duplicateActiveTask={this.props.duplicateActiveTask}
        editActiveTask={this.props.editActiveTask}
      />
    );
  }
}

export default TaskOptionsContainer;
