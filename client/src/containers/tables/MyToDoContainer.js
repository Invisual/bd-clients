import React, { Component } from 'react';
import { MyToDo } from '../../components/tables/MyToDo';

const axios = require('axios');

class MyToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isLoading: true,
      textAreaVal: '',
      textAreaOpen: false
    };
  }

  getTodos = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/todos/${idUser.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ todos: null, isLoading: false });
      } else {
        this.setState({ todos: res.data, isLoading: false });
      }
    });
  };

  componentDidMount() {
    this.getTodos();
  }

  changeToDoStatus = (todoId, currStatus) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    var nextStatus = '';
    switch (currStatus) {
      case 0:
        nextStatus = 1;
        break;
      case 1:
        nextStatus = 0;
        break;
      default:
        nextStatus = 1;
    }
    const data = {
      todo: todoId,
      status: nextStatus,
      user: idUser.id_user
    };

    axios.put('/api/todos/userToDoStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.getTodos();
    });
  };

  openTextAreaModal = () => {
    this.setState({
      textAreaOpen: true
    });
  };

  closeTextAreaModal = () => {
    this.setState({
      textAreaOpen: false
    });
  };

  changeTextAreaVal = e => {
    this.setState({
      textAreaVal: e.target.value
    });
  };

  addToDo = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));
    var data = {
      todo: this.state.textAreaVal,
      user: user.id_user
    };
    axios.post('/api/todos/', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({
        textAreaOpen: false
      });
      this.getTodos();
      document.getElementById('textarea-fullmodal').value = '';
    });
  };

  render() {
    return (
      <MyToDo
        todos={this.state.todos}
        title={this.props.title}
        changeToDoStatus={this.changeToDoStatus}
        isLoading={this.state.isLoading}
        type={this.props.type}
        openModal={this.props.openModal}
        closeModal={this.props.closeModal}
        textAreaOpen={this.state.textAreaOpen}
        openTextAreaModal={this.openTextAreaModal}
        closeTextAreaModal={this.closeTextAreaModal}
        changeTextAreaVal={this.changeTextAreaVal}
        addToDo={this.addToDo}
      />
    );
  }
}

export default MyToDoContainer;
