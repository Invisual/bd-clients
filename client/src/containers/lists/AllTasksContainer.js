import React, { Component } from 'react';
import { AllTasks } from '../../components/lists/AllTasks';
const axios = require('axios');

class AllTasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTask: 3,
      taskContent: [],
      isLoading: true
    };
  }

  getTaskDetails = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${idUser.id_user}/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ taskContent: res.data, isLoading: false });
    });
  };

  changeActiveTask = taskId => {
    this.setState({ activeTask: taskId });

  };

  deleteActiveTask = taskId =>{
    window.alert('Delete task '+ taskId +'?')
  }
  duplicateActiveTask = taskId =>{
    window.alert('Duplicate task '+ taskId +'?')
  }
  editActiveTask = taskId =>{
    window.alert('Edit task '+ taskId +'?')
  }

  componentDidMount() {
    this.getTaskDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTask !== this.state.activeTask) {
      this.getTaskDetails();
    }
  }
  render() {
    return (
      <AllTasks
        userRole={this.props.userInfo.ref_id_role}
        taskContent={this.state.taskContent}
        isLoading={this.state.isLoading}
        activeTask={this.state.activeTask}
        changeActiveTask={this.changeActiveTask}
        deleteActiveTask={this.deleteActiveTask}
        duplicateActiveTask={this.duplicateActiveTask}
        editActiveTask={this.editActiveTask}
      />
    );
  }
}

export default AllTasksContainer;
