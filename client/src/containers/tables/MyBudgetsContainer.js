import React, { Component } from 'react';
import { MyBudgets } from '../../components/tables/MyBudgets';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class MyBudgetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      filteredBudgets: [],
      isLoading: true,
    };
  }

  changeBudgetStatus = (budgetId, currStatus) => {
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
        nextStatus = 5;
        break;
      case 5:
        nextStatus = 1;
        break;
      default:
        nextStatus = 1;
    }
    const data = {
      budget: budgetId,
      status: nextStatus,
      user: idUser.id_user
    };

    axios.put('/api/budgets/internalBudgetStatus', data, { headers: { Authorization: AuthStr } }).then(res => {
      this.getBudgets();
      this.props.getBudgetDetails()
    });
  };

  getBudgets = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    var user = JSON.parse(localStorage.getItem('user'));
    var url = '/api/budgets/all'
    
    axios.get(url, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ budgets: null, isLoading: false });
      } else {
        this.setState({ budgets: res.data, filteredBudgets: res.data, isLoading: false });
      }
    });
  };

  startCountingHours = (budgetId, budgetTitle) => {
    if(this.props.activeBudgetHours !== undefined && this.props.activeBudgetHours !== null){
      console.log('primeiro if')
      if(this.props.activeBudgetHours.length > 0 || this.props.activeHours.length > 0){
        console.log('tem horas ja')
        Swal.fire({
          type: 'error',
          title: 'Erro!',
          text: `Já existe uma contagem de horas iniciada no Orçamento '${budgetTitle}'`
        })
      }
    } else if (this.props.activeHours !== undefined && this.props.activeHours !== null)
    {
      Swal.fire({
        type: 'error',
        title: 'Erro!',
        text: `Já existe uma contagem de horas iniciada numa Tarefa!`
      })
    }
    else {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      var user = JSON.parse(localStorage.getItem('user'));

      var data = {
        beginningHour: moment().format('H:mm'),
        day: moment().format('YYYY-MM-D'),
        user: user.id_user,
        budget: budgetId
      }

      axios.post(`/api/hours/budget`, data, { headers: { Authorization: AuthStr } }).then(res => {
        this.props.getActiveBudgetHours();
        //document.title = 'Tem um registo de Horas a contar'
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000
        });
        Toast.fire({
          type: 'success',
          title: `Contagem de Horas iniciada no Orçamento '${budgetTitle}'`
        })
      });
    }
  }

  stopCountingHours = (hourId, budgetTitle) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    var data = {
      endingHour: moment().format('H:mm'),
      idHour: hourId
    }

    axios.put(`/api/hours/budget`, data, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.getActiveBudgetHours();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000
      });
      Toast.fire({
        type: 'error',
        title: `Contagem de Horas parada no Orçamento '${budgetTitle}'`
      })
    });
  }

  filterBudgets = () => {
    switch(this.props.type){
      case 'alltasks':
      if(this.state.budgets !== null){
        this.setState({filteredBudgets: this.state.budgets.filter( budget => {
          return this.props.filters.client === '' ? true : Number(budget.ref_id_client) === Number(this.props.filters.client)
        }).filter( budget => {
          return this.props.filters.account === '' ? true : Number(budget.ref_id_user) === Number(this.props.filters.account)
        }).filter( budget => {
          return this.props.filters.internalStatus === '' ? true : Number(budget.ref_id_budget_internal_status) === Number(this.props.filters.internalStatus)
        }).filter( budget => {
          return this.props.filters.externalStatus === '' ? true : Number(budget.ref_id_budget_external_status) === Number(this.props.filters.externalStatus)
        })
      }, ()=>this.props.changeActiveBudget(this.state.filteredBudgets.length > 0 ? this.state.filteredBudgets[0].id_budget : null))
      }
      else{
        this.setState({filteredBudgets : null})
      }
      
      break;

      default:
        this.setState({filteredBudgets : this.state.budgets})
    }
  }

  componentDidMount() {
    this.getBudgets()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadBudgets !== this.props.reloadBudgets) {
      this.getBudgets()
    }
    if(prevProps.filters !== this.props.filters){
      this.filterBudgets()
    }

  }


  render() {
    return (
      <MyBudgets
        budget={this.state.filteredBudgets}
        title={this.props.title}
        changeBudgetStatus={this.changeBudgetStatus}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveBudget={this.props.changeActiveBudget}
        activeBudget={this.props.activeBudget}
        copyAlert={this.props.copyAlert}
        startCountingHours={this.startCountingHours}
        stopCountingHours={this.stopCountingHours}
        activeBudgetHours={this.props.activeBudgetHours}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default MyBudgetsContainer;
