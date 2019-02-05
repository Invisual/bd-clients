import React, { Component } from 'react';
import {AllTasks} from '../../components/lists/AllTasks';

class AllTasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTask: 3,
  }
}

changeActiveTask = (taskId) => {
  this.setState({activeTask: taskId})
}

  render() {
    return <AllTasks userRole={this.props.userInfo.ref_id_role} activeTask={this.state.activeTask} changeActiveTask={this.changeActiveTask} />
  }
}

export default AllTasksContainer;
