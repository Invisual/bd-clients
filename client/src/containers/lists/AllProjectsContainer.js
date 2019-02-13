import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllProjects } from '../../components/lists/AllProjects';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');
const history = createBrowserHistory();

class AllProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTask: '',
      taskContent: [],
      commentVal: '',
      isLoading: true
    };
  }

  getTaskDetails = () => {
    const { match: { params } } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    if (this.state.activeTask) {
      axios.get(`/api/tasks/${idUser.id_user}/${this.state.activeTask}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ taskContent: res.data, isLoading: false });
      });
    } else {
      if (this.props.isShare) {
        history.replace({pathname:'/tasks'}
        )
        axios
          .get(`/api/tasks/link/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeTask: res.data.details[0].id_task });
          })
          .then(res => {
            axios
              .get(`/api/tasks/link/${this.state.activeTask}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ taskContent: null, isLoading: false });
                } else {
                  this.setState({ taskContent: res.data, isLoading: false });
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
                  this.setState({ taskContent: res.data, isLoading: false });
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

  copyAlert = () =>{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000
    });
    
    Toast.fire({
      type: 'success',
      title: 'Link copiado com sucesso!'
    })
  }

  deleteActiveTask = taskId => {
    window.alert('Delete task ' + taskId + '?');
  };
  duplicateActiveTask = taskId => {
    window.alert('Duplicate task ' + taskId + '?');
  };
  editActiveTask = taskId => {
    window.alert('Edit task ' + taskId + '?');
  };

  changeCommentVal = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitComment();
    } else {
      this.setState({ commentVal: event.target.value });
    }
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

  componentDidMount() {
    this.getTaskDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTask !== this.state.activeTask) {
      this.getTaskDetails();
    }
  }

  render() {
    return (
      <AllProjects
        userRole={this.props.userInfo.ref_id_role}
        taskContent={this.state.taskContent}
        isLoading={this.state.isLoading}
        activeTask={this.state.activeTask}
        changeActiveTask={this.changeActiveTask}
        deleteActiveTask={this.deleteActiveTask}
        duplicateActiveTask={this.duplicateActiveTask}
        editActiveTask={this.editActiveTask}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
      />
    );
  }
}

export default AllProjectsContainer;
