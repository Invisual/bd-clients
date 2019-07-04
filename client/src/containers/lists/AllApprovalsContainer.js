import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllApprovals } from '../../components/lists/AllApprovals';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
const axios = require('axios');
const history = createBrowserHistory();
 
class AllApprovalsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      activeType: '',
      activeTab: 'projectreview',
      itemContent: [],
      reloadItems: false,
      filtersAreActive: false,
      filters: {
        type: '',
        client: '',
        account: ''
      },
      clientsList: [],
      accountsList: [],
      searchQuery: '',
      displaySearchInput: '',
      isLoading: true,
      redirect: false,
      costsModalOpen: false,
      costsModalType: 'project',
      placeholder: false
    };
  }
 
  changeFilters = (filters) => this.setState({filters: filters})
  changeFiltersAreActive = () => this.setState({filtersAreActive: !this.state.filtersAreActive})
  changePlaceholder = () => this.setState({placeholder: false})
 
  changeSearchQuery = e => this.setState({searchQuery: e.target.value})
 
  toggleSearchInput = () => {
    if(this.state.displaySearchInput === '' || this.state.displaySearchInput === 'hidesearch'){
      this.setState({displaySearchInput: 'showsearch'})
    }
    else if(this.state.displaySearchInput === 'showsearch'){
      this.setState({displaySearchInput: 'hidesearch'})
    }
  }
 
  getNumberOfActiveFilters = () => {
    var x = 0;
    if(this.state.filters.client !== '') {x++}
    if(this.state.filters.account !== '') {x++}
    if(this.state.filters.type !== '') {x++}
    return x
  }
 
  getClients = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/clients/basic`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ clientsList: res.data});
    });
  }

  getAccounts = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/users/accounts`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ accountsList: res.data});
    });
  }
 
  getItemDetails = () => {
    const {
      match: { params }
    } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    if (this.state.activeItem) {
      axios.get(`/api/misc/approvals/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ itemContent: res.data, isLoading: false }, () => this.scrollToElementD());
      });
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/approvals' });
        axios
          .get(`/api/misc/approvals/${params.type}/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            if (res.data === 'nodata') {
              Swal.fire({
                type: 'error',
                title: 'Tarefa inexistente'
              }).then(click => {
                this.setState({ redirect: true });
              });
            } else {
              this.setState({ activeItem: res.data.details[0].id, activeType: res.data.details[0].type});
            }
          })
          .then(res => {
            axios.get(`/api/misc/approvals/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ itemContent: null, isLoading: false });
              } else {
                this.setState({ itemContent: res.data, isLoading: false }, () => this.scrollToElementD());
              }
            });
          });
      } else {
        axios
          .get('/api/misc/approvals', { headers: { Authorization: AuthStr } })
          .then(res => {
 
            var items 

             if ( res.data.tasks && res.data.projects && res.data.budgets ) {
              items = [...res.data.tasks, ...res.data.projects, ...res.data.budgets]
             }
             else if (res.data.tasks && res.data.projects && !res.data.budgets) {
              items = [...res.data.tasks, ...res.data.projects]
             }
             else if (!res.data.tasks && res.data.projects && res.data.budgets) {
              items = [...res.data.budgets, ...res.data.projects]
             }
             else if (res.data.tasks && !res.data.projects && res.data.budgets) {
              items = [...res.data.tasks, ...res.data.budgets]
             }
             else if (!res.data.tasks && res.data.projects && !res.data.budgets) {
              items = res.data.projects
             }
             else if (res.data.tasks && !res.data.projects && !res.data.budgets) {
              items = res.data.tasks
             }
             else if (!res.data.tasks && !res.data.projects && res.data.budgets) {
              items = res.data.budgets
             } else {
               items = null
             }
            
            items = items ? items.sort((a, b) =>  a.conclusion_date>b.conclusion_date ? 1 : a.conclusion_date<b.conclusion_date ? -1 : 0) : null
            if(items) {this.setState({activeItem: items[0].id, activeType: items[0].type})}
          })
          .then(res => {
            axios
              .get(`/api/misc/approvals/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ itemContent: null, isLoading: false });
                } else {
                  this.setState({ itemContent: res.data, isLoading: false});
                }
              });
          });
      }
    }
  };
 
  changeActiveItem = (itemId, itemType) => {
    if (itemId === this.state.activeItem) {
      this.changePlaceholder()
      return null;
    } else if (itemId === null) {
      this.setState({placeholder: true})
    }else {
      this.setState({ activeItem: itemId, activeType: itemType, placeholder: false, isLoading: true });
    }
  };

  changeActiveTab = activeTab => {
    this.setState({activeTab: activeTab})
  };
 
  approveActiveItem = (itemId, itemType) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var user = JSON.parse(localStorage.getItem('user'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
    title: 'Tem a certeza?',
    text: 'Esta ação é irreversível',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Aprovar!',
    cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {
 
          var data = {
            id : itemId,
            type : itemType,
            billing : this.state.itemContent.details[0].billed,
            title: this.state.itemContent.details[0].title,
            mode: this.state.itemContent.details[0].name_billing_mode,
            user: user.id_user,
            date: moment(new Date()).format('YYYY-MM-DD')
          }
          
            axios.put(`/api/misc/approvals/`, data, { headers: { Authorization: AuthStr } }).then( res => {
                Swal.fire('Aprovado!', '', 'success').then(click => {
                    this.setState({activeItem: '', activeType:'', reloadItems: true})
                })
            })
        }
    });
  };

  rejectActiveItem = (itemId, itemType) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
    title: 'Tem a certeza?',
    text: 'Esta ação é irreversível',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, reprovado!',
    cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {
 
          var data = {
            id : itemId,
            type : itemType
          }
 
            axios.put(`/api/misc/approvals/reject`, data, { headers: { Authorization: AuthStr } }).then( res => {
                Swal.fire('Reprovado!', '', 'success').then(click => {
                    this.setState({activeItem: '', activeType:'', reloadItems: true})
                })
            })
        }
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
 
  openCostsModal = (type) => {
    this.setState({costsModalType: type})
  }

  componentDidMount() {
    this.getItemDetails()
    this.getClients()
    this.getAccounts()
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      this.getItemDetails();
      this.setState({activeTab:'projectreview'})
    }
    if (prevState.reloadItems !== this.state.reloadItems) {
      this.setState({ reloadItems: false });
    }
  }
 
  render() {
    return (
      <AllApprovals
        userRole={this.props.userInfo.ref_id_role}
        itemContent={this.state.itemContent}
        isLoading={this.state.isLoading}
        activeItem={this.state.activeItem}
        activeType={this.state.activeType}
        changeActiveItem={this.changeActiveItem}
        changeActiveTab={this.changeActiveTab}
        activeTab={this.state.activeTab}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        redirect={this.state.redirect}
        reloadItems={this.state.reloadItems}
        filtersAreActive={this.state.filtersAreActive}
        changeFiltersAreActive={this.changeFiltersAreActive}
        filters={this.state.filters}
        changeFilters={this.changeFilters}
        getNumberOfActiveFilters={this.getNumberOfActiveFilters}
        clientsList={this.state.clientsList}
        accountsList={this.state.accountsList}
        searchQuery={this.state.searchQuery}
        changeSearchQuery={this.changeSearchQuery}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        approveActiveItem={this.approveActiveItem}
        rejectActiveItem={this.rejectActiveItem}
        openCostsModal={this.openCostsModal}
        openModal={this.props.openModal}
        closeModal={this.props.closeModal}
        costsModalType={this.state.costsModalType}
        placeholder={this.state.placeholder}
        changePlaceholder={this.changePlaceholder}
      />
    );
  }
}
 
export default AllApprovalsContainer;