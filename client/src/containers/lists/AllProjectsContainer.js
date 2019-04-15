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
      reloadProjects: false,
      filtersAreActive: false,
      filters: {
        client: '',
        billing: '',
        users: []
      },
      clientsList: [],
      billingList: [],
      usersList: [],
      isLoading: true
    };
  }

  changeFilters = (filters) => this.setState({filters: filters})
  changeFiltersAreActive = () => this.setState({filtersAreActive: !this.state.filtersAreActive})

  getClients = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/clients/basic`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ clientsList: res.data});
    });
  }

  getBillingModes = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/billing`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ billingList: res.data});
    });
  }

  getUsers = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/users`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ usersList: res.data});
    });
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
          .get(`/api/projects/details/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeProject: res.data.details[0].id_project });
          })
          .then(res => {
            axios
              .get(`/api/projects/details/${this.state.activeProject}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ projectContent: null, isLoading: false });
                } else {
                  this.setState({ projectContent: res.data, isLoading: false }, () => this.scrollToElementD());
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

  deleteActiveProject = projectId => {
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
        Swal.fire('Eliminado!', '', 'success');
        axios.delete(`/api/projects/${projectId}`, { headers: { Authorization: AuthStr } }).then(this.setState({ reloadProjects: true }));
      }
    });
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


  scrollToElementD = () => {
    var topPos = document.querySelector('.active').offsetTop;
    document.querySelector('.tasks-list').scrollTop = topPos-10;
   }

  componentDidMount() {
    this.getProjectDetails();
    this.getClients();
    this.getBillingModes();
    this.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeProject !== this.state.activeProject) {
      this.getProjectDetails();
      this.setState({activeTab:'projectreview'})
    }
    if (prevState.reloadProjects !== this.state.reloadProjects) {
      this.setState({ activeProject:'', reloadProjects: false });
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
        deleteActiveProject={this.deleteActiveProject}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        changeActiveTab={this.changeActiveTab}
        activeTab={this.state.activeTab}
        filtersAreActive={this.state.filtersAreActive}
        changeFiltersAreActive={this.changeFiltersAreActive}
        filters={this.state.filters}
        changeFilters={this.changeFilters}
        clientsList={this.state.clientsList}
        billingList={this.state.billingList}
        usersList={this.state.usersList}
        reloadProjects={this.state.reloadProjects}
      />
    );
  }
}

export default AllProjectsContainer;
