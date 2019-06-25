import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllBudgets } from '../../components/lists/AllBudgets';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';

const axios = require('axios');
const history = createBrowserHistory();

class AllBudgetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBudget: '',
      budgetContent: [],
      commentVal: '',
      reloadBudgets: false,
      filtersAreActive: false,
      filters: {
        client: '',
        account: '',
        internalStatus: '',
        externalStatus: ''
      },
      clientsList: [],
      accountsList: [],
      internalStatusList: [],
      externalStatusList: [],
      currentTaskList: 'all',
      isLoading: true,
      redirect: false,
      placeholder: false
    };
  }

  changeFilters = filters => this.setState({filters: filters})
  changeFiltersAreActive = () => this.setState({filtersAreActive: !this.state.filtersAreActive})
  changePlaceholder = () => this.setState({placeholder: false})

  changeCurrentTaskList = () => this.setState({currentTaskList: this.state.currentTaskList === 'all' ? 'self' : 'all' })

  getNumberOfActiveFilters = () => {
    var x = 0;
    if(this.state.filters.client !== '') {x++}
    if(this.state.filters.account !== '') {x++}
    if(this.state.filters.internalStatus !== '') {x++}
    if(this.state.filters.externalStatus !== '') {x++}
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

  getInternalStatus = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/internalStatus`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ internalStatusList: res.data});
    });
  }

  getExternalStatus = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios.get(`/api/misc/externalStatus`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ externalStatusList: res.data});
    });
  }

  getBudgetDetails = () => {
    const {
      match: { params }
    } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var idUser = JSON.parse(localStorage.getItem('user'));
    if (this.state.activeBudget) {
      axios.get(`/api/budgets/content/${this.state.activeBudget}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ budgetContent: res.data, isLoading: false }, () => this.scrollToElementD());
      });
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/budgets' });
        axios
          .get(`/api/budgets/content/${params.id}`, { headers: { Authorization: AuthStr } })
          .then(res => {
            if (res.data === 'nodata') {
              Swal.fire({
                type: 'error',
                title: 'Orçamento inexistente'
              }).then(click => {
                this.setState({ redirect: true });
              });
            } else {
              this.setState({ activeBudget: res.data.details[0].id_budget });
            }
          })
          .then(res => {
            axios.get(`/api/budgets/content/${this.state.activeBudget}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ budgetContent: null, isLoading: false });
              } else {
                this.setState({ budgetContent: res.data, isLoading: false }, () => this.scrollToElementD());
              }
            });
          });
      } else {
        var url = `/api/budgets/all`
        axios
          .get(url, { headers: { Authorization: AuthStr } })
          .then(res => {
            this.setState({ activeBudget: res.data[0].id_budget });
          })
          .then(res => {
            axios
              .get(`/api/budgets/content/${this.state.activeBudget}`, { headers: { Authorization: AuthStr } })
              .then(res => {
                if (res.data === 'nodata') {
                  this.setState({ budgetContent: null, isLoading: false });
                } else {
                  this.setState({ budgetContent: res.data, isLoading: false});
                }
              });
          });
      }
    }
  };

  changeActiveBudget = budgetId => {
    if (budgetId === this.state.activeBudget) {
      this.changePlaceholder()
      return null;
    } else if (budgetId === null) {
      this.setState({placeholder: true})
    }
    else {
      this.setState({ activeBudget: budgetId, placeholder: false, isLoading: true });
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

  concludeActiveBudget = (itemId) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
    title: 'Tem a certeza?',
    text: 'Esta ação é irreversível',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, concluir!',
    cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {
 
          var data = {
            id : itemId,
            date : moment().format('YYYY-MM-DD')
          }
 
            axios.put(`/api/budgets/conclude`, data, { headers: { Authorization: AuthStr } }).then( res => {
                Swal.fire('Concluído!', '', 'success').then(click => {
                    this.setState({activeBudget: '', reloadBudgets: true})
                })
            })
        }
    });
  };

  deleteActiveBudget = budgetId => {
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
        Swal.fire('Orçamento eliminado!', '', 'success').then(result => {
          if (result.value) {
            axios
              .delete(`/api/budgets/${budgetId}`, { headers: { Authorization: AuthStr } })
              .then(this.setState({ activeBudget: '', reloadBudgets: true }));
          }
        });
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

    axios.post(`/api/budgets/comments/${this.state.activeBudget}`, data, { headers: { Authorization: AuthStr } }).then(res => {
      document.getElementById('comment-textarea').value = '';
      this.setState({ commentVal: '' });
      this.getBudgetDetails();
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
    this.getBudgetDetails()
    this.getClients()
    this.getAccounts()
    this.getInternalStatus()
    this.getExternalStatus()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeBudget !== this.state.activeBudget) {
      this.getBudgetDetails();
    }
    if (prevState.reloadBudgets !== this.state.reloadBudgets) {
      this.setState({ reloadBudgets: false });
    }
  }

  render() {
    return (
      <AllBudgets
        userRole={this.props.userInfo.ref_id_role}
        budgetContent={this.state.budgetContent}
        isLoading={this.state.isLoading}
        activeBudget={this.state.activeBudget}
        changeActiveBudget={this.changeActiveBudget}
        deleteActiveBudget={this.deleteActiveBudget}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        redirect={this.state.redirect}
        activeBudgetHours={this.props.activeBudgetHours}
        getActiveBudgetHours={this.props.getActiveBudgetHours}
        activeHours={this.props.activeHours}
        getActiveHours={this.props.getActiveHours}
        reloadBudgets={this.state.reloadBudgets}
        filtersAreActive={this.state.filtersAreActive}
        changeFiltersAreActive={this.changeFiltersAreActive}
        filters={this.state.filters}
        changeFilters={this.changeFilters}
        getNumberOfActiveFilters={this.getNumberOfActiveFilters}
        clientsList={this.state.clientsList}
        accountsList={this.state.accountsList}
        internalStatusList={this.state.internalStatusList}
        externalStatusList={this.state.externalStatusList}
        getBudgetDetails={this.getBudgetDetails}
        concludeActiveBudget={this.concludeActiveBudget}
        placeholder={this.state.placeholder}
        changePlaceholder={this.changePlaceholder}
      />
    );
  }
}

export default AllBudgetsContainer;
