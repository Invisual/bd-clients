import React, { Component } from 'react';
import {MyTasks} from '../../components/tables/MyTasks';

const axios = require('axios');

class MyTasksContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            counter:0,
            isLoading: true
        }
    }

    changeTaskStatus = (taskId, currStatus) => {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var idUser = JSON.parse(localStorage.getItem('user'))

      var nextStatus = '';
      switch(currStatus){
        case 1:
        nextStatus = 2;
        break;
        case 2:
        nextStatus =  3;
        break;
        case 3:
        nextStatus = 1;
        break;
        default:
        nextStatus = 1;
      }
     const data = {
        task: taskId,
        status: nextStatus,
        user:idUser.id_user
      }
  
      axios.put('/api/tasks/userTaskStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
        this.getTasks();
      }); 
      
    };
    
      getTasks = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var idUser = JSON.parse(localStorage.getItem('user'))
    
        axios.get(`/api/tasks/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
          this.setState({ tasks: res.data, isLoading: false });
        }); 
        
      };

      componentDidMount(){
        this.getTasks();
      }

  render() {
    return <MyTasks tasks={this.state.tasks} title={this.props.title} changeTaskStatus={this.changeTaskStatus} type={this.props.type} isLoading={this.state.isLoading} changeActiveTask={this.props.changeActiveTask}/>;
  }
}

export default MyTasksContainer;
