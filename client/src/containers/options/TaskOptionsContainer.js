import React, { Component } from 'react';
import { TaskOptions } from '../../components/options/TaskOptions';

const axios = require('axios');

class TaskOptionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskOptions: [],
      isLoading: true
    };
  }

  getTaskOptions = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${idUser.id_user}/${this.props.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ taskOptions: res.data, isLoading: false });
    });
  };

  componentDidMount() {
    this.getTaskOptions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTask !== this.props.activeTask) {
      this.getTaskOptions();
    }
  }

  render() {
    return <TaskOptions userRole={this.props.userRole} taskOptions={this.state.taskOptions} />;
  }
}

export default TaskOptionsContainer;
