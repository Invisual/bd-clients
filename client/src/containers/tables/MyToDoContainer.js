import React, { Component } from 'react';
import {MyToDo} from '../../components/tables/MyToDo';

const axios = require('axios');

class MyToDoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo:[
              {
                id:1,
                text: 'FOTOLIA - INvisualLDA lausivni',
                status:1
              },
              {
                id:2,
                text: 'unifloresta2012',
                status:0
              },
              {
                id:3,
                text:"var token = JSON.parse(localStorage.getItem('token'));",
                status:1
              },
              {
                id:4,
                text: 'FOTOLIA - INvisualLDA lausivni',
                status:1
              },
              {
                id:5,
                text: 'unifloresta2012',
                status:0
              },
              {
                id:6,
                text:"var token = JSON.parse(localStorage.getItem('token'));",
                status:1
              }
            ]
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

  render() {
    return <MyToDo todo={this.state.todo} title={this.props.title} changeTaskStatus={this.changeTaskStatus}/>;
  }
}

export default MyToDoContainer;
