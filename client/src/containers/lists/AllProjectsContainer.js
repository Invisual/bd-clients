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
        account: '',
        percentage: '',
        categories: [],
        users: []
      },
      clientsList: [],
      billingList: [],
      accountsList: [],
      categoriesList: [],
      usersList: [],
      currentProjectList: 'all',
      searchQuery: '',
      displaySearchInput: '',
      isLoading: true,
      costsModalOpen: false,
      costsModalType: 'project'
    };
  }

  changeFilters = (filters) => this.setState({filters: filters})
  changeFiltersAreActive = () => this.setState({filtersAreActive: !this.state.filtersAreActive})

  changeSearchQuery = e => this.setState({searchQuery: e.target.value})

  toggleSearchInput = () => {
    if(this.state.displaySearchInput === '' || this.state.displaySearchInput === 'hidesearch'){
      this.setState({displaySearchInput: 'showsearch'})
    }
    else if(this.state.displaySearchInput === 'showsearch'){
      this.setState({displaySearchInput: 'hidesearch'})
    }
  }

  changeCurrentProjectList = () => this.setState({currentProjectList: this.state.currentProjectList === 'all' ? 'self' : 'all' })

  getNumberOfActiveFilters = () => {
    var x = 0;
    if(this.state.filters.client !== '') {x++}
    if(this.state.filters.billing !== '') {x++}
    if(this.state.filters.account !== '') {x++}
    if(this.state.filters.percentage !== '') {x++}
    if(this.state.filters.categories.length > 0) {x++}
    if(this.state.filters.users.length > 0) {x++}
    return x
  }

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

  getAccounts = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/users/accounts`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ accountsList: res.data});
    });
  }

  getCategories = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/categories`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ categories: res.data});
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
        this.setState({ projectContent: res.data, isLoading: false }, () => this.scrollToElementD());
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

        var url = this.props.userInfo.ref_id_role === 3 || this.props.userInfo.ref_id_role === 2 ? `/api/projects` : `/api/projects/${idUser.id_user}`
        axios
          .get(url, { headers: { Authorization: AuthStr } })
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
    this.scrollTo(document.querySelector('.tasks-list'), topPos - 10, 600);
   }
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

  openCostsModal = (type) => {
    document.body.classList.add('costs-open', 'modal-open')
    document.getElementById('overlay').addEventListener('click', () => this.closeCostsModal())
    this.setState({costsModalOpen: true, costsModalType: type})
  }

  closeCostsModal = () => {
    document.body.classList.remove('costs-open', 'modal-open')
    document.getElementById('overlay').removeEventListener('click', () => this.closeCostsModal());
    this.setState({costsModalOpen: false})
  }


  componentDidMount() {
    this.getProjectDetails();
    this.getClients();
    this.getBillingModes();
    this.getUsers();
    this.getAccounts();
    this.getCategories();
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
        getNumberOfActiveFilters={this.getNumberOfActiveFilters}
        clientsList={this.state.clientsList}
        billingList={this.state.billingList}
        accountsList={this.state.accountsList}
        usersList={this.state.usersList}
        categoriesList={this.state.categories}
        reloadProjects={this.state.reloadProjects}
        currentProjectList={this.state.currentProjectList}
        changeCurrentProjectList={this.changeCurrentProjectList}
        searchQuery={this.state.searchQuery}
        changeSearchQuery={this.changeSearchQuery}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        openCostsModal={this.openCostsModal}
        closeCostsModal={this.closeCostsModal}
        isCostsModalOpen={this.state.costsModalOpen}
        costsModalType={this.state.costsModalType}
        getProjectDetails={this.getProjectDetails}
      />
    );
  }
}

export default AllProjectsContainer;
