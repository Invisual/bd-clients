import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

const axios = require('axios');

class TaskDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetails: [],
      isLoading: true
    };
  }

  getTaskDetails = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${idUser.id_user}/${this.props.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ taskDetails: res.data, isLoading: false });
    });
  };

  getTaskComments = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/tasks/comments/${this.props.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ comments: res.data });
      console.log(res.data>0)
    });
  };

  componentDidMount() {
    this.getTaskDetails();
    //this.getTaskComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTask !== this.props.activeTask) {
      this.getTaskDetails();
      //this.getTaskComments();
    }
  }

  render() {
    return <TaskDetail taskDetails={this.state.taskDetails} isLoading={this.state.isLoading} />;
  }
}

export default TaskDetailContainer;
