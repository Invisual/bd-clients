import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

const axios = require('axios');

class TaskDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskContent: [],
      isLoading: true
    };
  }

  getTaskDetails = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${idUser.id_user}/${this.props.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ taskContent: res.data, isLoading: false });
    });
  };

  componentDidMount() {
    this.getTaskDetails();
  }

  componentDidUpdate (prevProps){
    if(prevProps.activeTask!==this.props.activeTask){
    this.getTaskDetails();
    }
  }


  render() {
    if (this.state.isLoading === true) {
      return null;
    }
    return <TaskDetail taskContent={this.state.taskContent} isLoading={this.state.isLoading} />;
  }
}

export default TaskDetailContainer;