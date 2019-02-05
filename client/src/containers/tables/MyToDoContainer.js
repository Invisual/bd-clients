import React, { Component } from 'react';
import {MyToDo} from '../../components/tables/MyToDo';

const axios = require('axios');

class MyToDoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos:[],
            isLoading: true
        }
    }
    getTodos = () => {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var idUser = JSON.parse(localStorage.getItem('user'))
  
      axios.get(`/api/todos/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ todos: res.data, isLoading: false });
      }); 
      
    };

    componentDidMount(){
      this.getTodos();
    }

    changeToDoStatus = (todoId, currStatus) => {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var idUser = JSON.parse(localStorage.getItem('user'))

      var nextStatus = '';
      switch(currStatus){
        case 0:
        nextStatus = 1;
        break;
        case 1:
        nextStatus =  0;
        break;
        default:
        nextStatus = 1;
      }
     const data = {
        todo: todoId,
        status: nextStatus,
        user:idUser.id_user
      }
  
      axios.put('/api/todos/userToDoStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
        this.getTodos();
      }); 
    };

    openFullModal = () => {
      document.body.classList.add('todo-open');
    }

    closeFullModal = () => {
      document.body.classList.remove('todo-open');
    }
    

  render() {
    return <MyToDo 
            todos={this.state.todos} 
            title={this.props.title} 
            changeToDoStatus={this.changeToDoStatus} 
            isLoading={this.state.isLoading} 
            type={this.props.type}
            openFullModal={this.openFullModal}
            closeFullModal={this.closeFullModal}
            />;
  }
}

export default MyToDoContainer;
