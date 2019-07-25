import React, { Component } from 'react';
import { MyTasks } from '../../components/tables/MyTasks';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class MyTasksContainer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filteredTasks: [],
      isLoading: true,
    };
  }

  changeTaskStatus = (taskId, currStatus, projectId, account) => {
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
        nextStatus = 4;
        break;
      case 4:
        nextStatus = 1;
        break;
      default:
        nextStatus = 1;
    }
    const data = {
      task: taskId,
      status: nextStatus,
      user: idUser.id_user,
      project: projectId,
      account: account,
    };
    axios.put('/api/tasks/userTaskStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.getTasks();
    });
  };

  getTasks = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));
    var url = ''
    if(this.props.concluded){
      url = '/api/tasks/concluded'
    } else {
      if(this.props.userRole === 2 || this.props.userRole === 3){
        if(this.props.type === 'dashboard' && user.ref_id_position === 1){
          url = '/api/tasks/all'
        } 
        else if(this.props.type === 'dashboard' && this.props.isAccount){
          url = `/api/tasks/${user.id_user}`
        }
        else {
          url = this.props.currentTaskList === 'all' ? `/api/tasks/all` : `/api/tasks/accounts/${user.id_user}`
        }
      }
      else {
        url = `/api/tasks/${user.id_user}`
      }
    }
    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (this._isMounted) {
        if (res.data === 'nodata') {
          this.setState({ tasks: [], filteredTasks: [], isLoading: false });
        } else {
          this.setState({ tasks: res.data, filteredTasks: res.data, isLoading: false });
        }
      }
    });
  };

  startCountingHours = (taskId, taskTitle, projectId, account) => {
    if(this.props.activeHours !== undefined && this.props.activeHours !== null){
      if(this.props.activeHours.length > 0){
        Swal.fire({
          type: 'error',
          title: 'Erro!',
          text: `Já existe uma contagem de horas iniciada na Tarefa '${taskTitle}'`
        })
      }
    } else if (this.props.activeBudgetHours !== undefined && this.props.activeBudgetHours !== null)
    {
      Swal.fire({
        type: 'error',
        title: 'Erro!',
        text: `Já existe uma contagem de horas iniciada num Orçamento!`
      })
    }
    else{
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var user = JSON.parse(localStorage.getItem('user'));

      var data = {
        beginningHour: moment().format('H:mm:ss'),
        day: moment().format('YYYY-MM-DD'),
        user: user.id_user,
        task: taskId
      }
      const data2 = {
        task: taskId,
        status: 2,
        user: user.id_user,
        project: projectId,
        account: account,
      };
      axios.put('/api/tasks/userTaskStatus', data2, { headers: { Authorization: AuthStr } }).then(res => {
        this.getTasks();
      });

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

  stopCountingHours = (hourId, taskTitle, taskId, projectId, account) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));

    var data = {
      endingHour: moment().format('H:mm:ss'),
      idHour: hourId
    }

    const data2 = {
      task: taskId,
      status: 3,
      user: user.id_user,
      project: projectId,
      account: account,
    };
    axios.put('/api/tasks/userTaskStatus', data2, { headers: { Authorization: AuthStr } }).then(res => {
      this.getTasks();
    });

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

  filterTasks = () => {
    switch(this.props.type){
      case 'alltasks':
      if(this.state.tasks !== null){
        this.setState({filteredTasks: this.state.tasks.filter( task => {
          return this.props.filters.client === '' ? true : Number(task.ref_id_client) === Number(this.props.filters.client)
        }).filter(task => {
          return this.props.searchQuery === '' ? true : task.title_task.toLowerCase().includes(this.props.searchQuery.toLowerCase()) || task.name_client.toLowerCase().includes(this.props.searchQuery.toLowerCase())
        }).filter(task => {
          return this.props.filters.billing === '' ? true : Number(task.ref_id_billing_mode) === Number(this.props.filters.billing)
        }).filter(task => {
          return this.props.filters.type === '' ? true : Number(task.ref_id_type_task) === Number(this.props.filters.type)
        }).filter(task => {
          return this.props.filters.user === '' ? true : Number(task.ref_id_user) === Number(this.props.filters.user)
        }).filter(task => {
          return this.props.filters.status === '' ? true : Number(task.ref_id_user_task_status) === Number(this.props.filters.status)
        }).filter(task => {
          return this.props.filters.project === '' ? true : Number(task.ref_id_project) === Number(this.props.filters.project)
        }).filter(task => {
          return this.props.filters.isDeadlineSet === false ? true : moment(task.deadline_date_task).isSameOrBefore(this.props.filters.deadline, 'day')
        }) 
      }, ()=>this.props.changeActiveTask(this.state.filteredTasks.length > 0 ? this.state.filteredTasks[0].id_task : null)) 
        
      }
      else{
        this.setState({filteredTasks : null})
      }
      break;

      default:
        this.setState({filteredTasks : this.state.tasks})

    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getTasks()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reloadTasks !== this.props.reloadTasks) {
      this.getTasks()
    }
    if(prevProps.currentTaskList !== this.props.currentTaskList){
      this.getTasks()
    }
    if(prevProps.filters !== this.props.filters || prevProps.searchQuery !== this.props.searchQuery){
      this.filterTasks()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <MyTasks
        tasks={this.state.filteredTasks}
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
        activeBudgetHours={this.props.activeBudgetHours}
        concluded={this.props.concluded}
        placeholder={this.props.placeholder}
        userInfo={this.props.userInfo}
      />
    );
  }
}

export default MyTasksContainer;
