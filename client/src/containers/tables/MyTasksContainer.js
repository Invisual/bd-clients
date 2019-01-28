import React, { Component } from 'react';
import {MyTasks} from '../../components/tables/MyTasks';

const axios = require('axios');

class MyTasksContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            getTasks:[],
        }
    }
    
      getTasks = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var idUser = JSON.parse(localStorage.getItem('user'))
    
        axios.get(`/api/tasks/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
          this.setState({ getTasks: res.data });
        }); 
        
      };
    
      componentDidMount(){
        this.getTasks();
      }

  render() {

    return <MyTasks tasks={this.state.getTasks} title={this.props.title}/>;
  }
}

export default MyTasksContainer;
