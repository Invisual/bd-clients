import React, { Component } from 'react';
import { MyTasks } from '../../components/tables/MyTasks';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class MyTasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: true,
    };
  }

  changeTaskStatus = (taskId, currStatus) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));

    var nextStatus = '';
    switch (currStatus) {
      case 1:
        nextStatus = 2;
        break;
      case 2:
        nextStatus = 3;
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
      user: idUser.id_user
    };

    axios.put('/api/tasks/userTaskStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.getTasks();
    });
  };

  getTasks = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));

    axios.get(`/api/tasks/${user.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ tasks: null, isLoading: false });
      } else {
        this.setState({ tasks: res.data, isLoading: false });
      }
    });
  };

  startCountingHours = (taskId, taskTitle) => {
    if(this.props.activeHours !== undefined && this.props.activeHours !== null){
      if(this.props.activeHours.length > 0){
        console.log('JA TENS HORAS FDP!')
      }
    } 
    else{
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var user = JSON.parse(localStorage.getItem('user'));

      var data = {
        beginningHour: moment().format('H:mm:ss'),
        day: moment().format('D/MM/YYYY'),
        user: user.id_user,
        task: taskId
      }

      axios.post(`/api/hours/`, data, { headers: { Authorization: AuthStr } }).then(res => {
        this.props.getActiveHours();
        //document.title = 'Tem um registo de Horas a contar'
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000
        });
        Toast.fire({
          type: 'success',
          title: `Contagem de Horas iniciada na Tarefa '${taskTitle}'`
        })
      });
    }
  }

  stopCountingHours = (hourId, taskTitle) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    var data = {
      endingHour: moment().format('H:mm'),
      idHour: hourId
    }

    axios.put(`/api/hours/`, data, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.getActiveHours();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000
      });
      Toast.fire({
        type: 'error',
        title: `Contagem de Horas parada na Tarefa '${taskTitle}'`
      })
    });
  }

  componentDidMount() {
    this.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadTasks !== this.props.reloadTasks) {
      this.getTasks();
    }
  }


  render() {
    return (
      <MyTasks
        tasks={this.state.tasks}
        title={this.props.title}
        changeTaskStatus={this.changeTaskStatus}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveTask={this.props.changeActiveTask}
        activeTask={this.props.activeTask}
        copyAlert={this.props.copyAlert}
        startCountingHours={this.startCountingHours}
        stopCountingHours={this.stopCountingHours}
        activeHours={this.props.activeHours}
      />
    );
  }
}

export default MyTasksContainer;
