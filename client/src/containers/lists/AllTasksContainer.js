import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllTasks } from '../../components/lists/AllTasks';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const axios = require('axios');
const history = createBrowserHistory();

class AllTasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTask: '',
      taskContent: [],
      commentVal: '',
      reloadTasks: false,
      isLoading: true,
      redirect: false
    };
  }

  getTaskDetails = () => {
    const {
      match: { params }
    } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    if (this.state.activeTask) {
      axios.get(`/api/tasks/${idUser.id_user}/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ taskContent: res.data, isLoading: false });
      });
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/tasks' });
        axios
          .get(`/api/tasks/link/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            if (res.data === 'nodata') {
              Swal.fire({
                type: 'error',
                title: 'Tarefa inexistente'
              }).then(click => {
                this.setState({ redirect: true });
              });
            } else {
              this.setState({ activeTask: res.data.details[0].id_task });
            }
          })
          .then(res => {
            axios.get(`/api/tasks/link/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ taskContent: null, isLoading: false });
              } else {
                this.setState({ taskContent: res.data, isLoading: false }, () => this.scrollToElementD());
              }
            });
          });
      } else {
        axios
          .get(`/api/tasks/${idUser.id_user}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeTask: res.data[0].id_task });
          })
          .then(res => {
            axios
              .get(`/api/tasks/${idUser.id_user}/${this.state.activeTask}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ taskContent: null, isLoading: false });
                } else {
                  this.setState({ taskContent: res.data, isLoading: false});
                }
              });
          });
      }
    }
  };

  changeActiveTask = taskId => {
    if (taskId === this.state.activeTask) {
      return null;
    } else {
      this.setState({ activeTask: taskId, isLoading: true });
    }
  };

  copyAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000
    });

    Toast.fire({
      type: 'success',
      title: 'Link copiado com sucesso!'
    });
  };

  deleteActiveTask = taskId => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Esta ação é irreversível',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        Swal.fire('Tarefa eliminada!', '', 'success').then(result => {
          if (result.value) {
            axios
              .delete(`/api/tasks/${taskId}`, { headers: { Authorization: AuthStr } })
              .then(this.setState({ activeTask: '', reloadTasks: true }));
          }
        });
      }
    });
  };
  duplicateActiveTask = taskId => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.post(`/api/tasks/${taskId}`, null, { headers: { Authorization: AuthStr } }).then(this.setState({ reloadTasks: true }));
  };

  submitComment = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    const data = {
      text_comment: this.state.commentVal,
      id_user: idUser.id_user
    };

    axios.post(`/api/tasks/comments/${this.state.activeTask}`, data, { headers: { Authorization: AuthStr } }).then(res => {
      document.getElementById('comment-textarea').value = '';
      this.setState({ commentVal: '' });
      this.getTaskDetails();
    });
  };

  scrollToElementD = () => {
    var topPos = document.querySelector('.active').offsetTop;
    this.scrollTo(document.querySelector('.tasks-list'), topPos - 10, 600);
  };

  scrollTo = (element, to, duration) => {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
    var that= this;
    var animateScroll = function(){        
        currentTime += increment;
        var val = that.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  easeInOutQuad = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
  };
  

  componentDidMount() {
    this.getTaskDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTask !== this.state.activeTask) {
      this.getTaskDetails();
    }
    if (prevState.reloadTasks !== this.state.reloadTasks) {
      this.setState({ reloadTasks: false });
    }
  }

  render() {
    return (
      <AllTasks
        userRole={this.props.userInfo.ref_id_role}
        taskContent={this.state.taskContent}
        isLoading={this.state.isLoading}
        activeTask={this.state.activeTask}
        changeActiveTask={this.changeActiveTask}
        deleteActiveTask={this.deleteActiveTask}
        duplicateActiveTask={this.duplicateActiveTask}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        redirect={this.state.redirect}
        activeHours={this.props.activeHours}
        getActiveHours={this.props.getActiveHours}
        reloadTasks={this.state.reloadTasks}
      />
    );
  }
}

export default AllTasksContainer;
