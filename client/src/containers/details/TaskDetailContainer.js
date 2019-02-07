import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

class TaskDetailContainer extends Component {
  render() {
    return (
      <TaskDetail
        taskContent={this.props.taskContent}
        isLoading={this.props.isLoading}
        changeCommentVal={this.props.changeCommentVal}
        submitComment={this.props.submitComment}
      />
    );
  }
}

export default TaskDetailContainer;
