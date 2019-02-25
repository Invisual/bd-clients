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
      activeProject: '',
      activeTab: 'projectreview',
      projectContent: [],
      commentVal: '',
      isLoading: true
    };
  }

  getProjectDetails = () => {
    const { match: { params } } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    if (this.state.activeProject) {
      axios.get(`/api/projects/details/${this.state.activeProject}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ projectContent: res.data, isLoading: false });
      });
    } else {
      if (this.props.isShare) {
        history.replace({pathname:'/projects'}
        )
        axios
          .get(`/api/tasks/link/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeProject: res.data.details[0].id_task });
          })
          .then(res => {
            axios
              .get(`/api/tasks/link/${this.state.activeProject}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ projectContent: null, isLoading: false });
                } else {
                  this.setState({ projectContent: res.data, isLoading: false });
                }
              });
          });
      } else {
        axios
          .get(`/api/projects/${idUser.id_user}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeProject: res.data[0].id_project });
          })
          .then(res => {
            axios
              .get(`/api/projects/details/${this.state.activeProject}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ projectContent: null, isLoading: false });
                } else {
                  this.setState({ projectContent: res.data, isLoading: false });
                }
              });
          });
      }
    }
  };

  changeActiveProject = projectId => {
    if (projectId === this.state.activeProject) {
      return null;
    } else {
      this.setState({ activeProject: projectId, isLoading: true });
    }
  };

  changeActiveTab = activeTab => {
    switch (activeTab) {
      case 'projectreview':
        this.setState({ activeTab: 'projectreview' });
        break;
      case 'projecttasks':
        this.setState({ activeTab: 'projecttasks' });
        break;
      case 'projectcomments':
        this.setState({ activeTab: 'projectcomments' });
        break;
      default:
        this.setState({ activeTab: 'projectreview' });
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

    axios.post(`/api/projects/comments/${this.state.activeProject}`, data, { headers: { Authorization: AuthStr } }).then(res => {
      document.getElementById('comment-textarea').value = '';
      this.setState({ commentVal: '' });
      this.getProjectDetails();
    });
  };

  componentDidMount() {
    this.getProjectDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeProject !== this.state.activeProject) {
      this.getProjectDetails();
      this.setState({activeTab:'projectreview'})
    }
  }

  render() {
    return (
      <AllProjects
        userRole={this.props.userInfo.ref_id_role}
        projectContent={this.state.projectContent}
        isLoading={this.state.isLoading}
        activeProject={this.state.activeProject}
        changeActiveProject={this.changeActiveProject}
        deleteActiveTask={this.deleteActiveTask}
        duplicateActiveTask={this.duplicateActiveTask}
        editActiveTask={this.editActiveTask}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        changeActiveTab={this.changeActiveTab}
        activeTab={this.state.activeTab}
      />
    );
  }
}

export default AllProjectsContainer;
