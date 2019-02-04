import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

const axios = require('axios');

class TaskDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetails: [],
      comments: [],
      isLoading: true, 
      activeTask: 3
    };
  }

  getTaskDetails = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${idUser.id_user}/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ taskDetails: res.data, isLoading: false });
    });
  };

  getTaskComments = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/tasks/comments/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ comments: res.data });
    });
  };

  componentDidMount() {
    //this.getTaskDetails();
    //this.getTaskComments();
    this.setState({activeTask: this.props.activeTask})
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeTask !== prevState.activeTask) {
      this.getTaskDetails();
      this.getTaskComments();
    }
  }

  render() {
    return <TaskDetail comments={this.state.comments} taskDetails={this.state.taskDetails} isLoading={this.state.isLoading} />;
  }
}

export default TaskDetailContainer;
