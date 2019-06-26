import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { AllBilling } from '../../components/lists/AllBilling';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const axios = require('axios');
const history = createBrowserHistory();

class AllBillingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      activeType: '',
      itemContent: [],
      reloadItems: false,
      filtersAreActive: false,
      filters: {
        client: '',
        type: ''
      },
      clientsList: [],
      searchQuery: '',
      displaySearchInput: '',
      isLoading: true,
      redirect: false,
      concludedModalOpen: false,
      concludedModalType: 'task',
      placeholder: false
    };
  }

  changeFilters = (filters) => this.setState({filters: filters}, () => console.log(this.state.filters))
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

  getItemDetails = () => {
    const {
      match: { params }
    } = this.props;
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    if (this.state.activeItem) {
      axios.get(`/api/billing/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ itemContent: res.data, isLoading: false }, () => this.scrollToElementD());
      });
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/billing' });
        axios
          .get(`/api/billing/${params.type}/${params.id}`, { headers: { Authorization: AuthStr } })
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
            axios.get(`/api/billing/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } }).then(res => {
              if (res.data === 'nodata') {
                this.setState({ itemContent: null, isLoading: false });
              } else {
                this.setState({ itemContent: res.data, isLoading: false }, () => this.scrollToElementD());
              }
            });
          });
      } else {
        axios
          .get('/api/billing', { headers: { Authorization: AuthStr } })
          .then(res => {
            var items = [...res.data.tasks, ...res.data.projects]
            items = items.sort((a, b) =>  a.conclusion_date>b.conclusion_date ? 1 : a.conclusion_date<b.conclusion_date ? -1 : 0)
            this.setState({activeItem: items[0].id, activeType: items[0].type})
          })
          .then(res => {
            axios
              .get(`/api/billing/${this.state.activeType}/${this.state.activeItem}`, { headers: { Authorization: AuthStr } })
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

  billActiveItem = (itemId, itemType) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
    title: 'Tem a certeza?',
    text: 'Esta ação é irreversível',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Faturar!',
    cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {

          var data = {
            id : itemId,
            type : itemType,
            billed_status: 2
          }

            axios.put(`/api/billing/`, data, { headers: { Authorization: AuthStr } }).then( res => {
                Swal.fire('Faturado!', '', 'success').then(click => {
                    this.getItemDetails()
                    this.setState({reloadItems: true})
                })
            })
        }
    });
  };

  unBillActiveItem = (itemId, itemType) => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    Swal.fire({
    title: 'Marcar como "Não Faturado"',
    text: 'Tem a certeza?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, marcar!',
    cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {

          var data = {
            id : itemId,
            type : itemType,
            billed_status: 1
          }

            axios.put(`/api/billing/`, data, { headers: { Authorization: AuthStr } }).then( res => {
                Swal.fire('Marcado!', '', 'success').then(click => {
                    this.getItemDetails()
                    this.setState({reloadItems: true})
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

  componentDidMount() {
    this.getItemDetails()
    this.getClients()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      this.getItemDetails();
    }
    if (prevState.reloadItems !== this.state.reloadItems) {
      this.setState({ reloadItems: false });
    }
  }

  render() {
    return (
      <AllBilling
        userRole={this.props.userInfo.ref_id_role}
        itemContent={this.state.itemContent}
        isLoading={this.state.isLoading}
        activeItem={this.state.activeItem}
        activeType={this.state.activeType}
        changeActiveItem={this.changeActiveItem}
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
        searchQuery={this.state.searchQuery}
        changeSearchQuery={this.changeSearchQuery}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        openConcludeModal={this.openConcludeModal}
        closeConcludeModal={this.closeConcludeModal}
        isConcludeModalOpen={this.state.concludeModalOpen}
        concludeModalType={this.state.concludeModalType}
        billActiveItem={this.billActiveItem}
        unBillActiveItem={this.unBillActiveItem}
        placeholder={this.state.placeholder}
        changePlaceholder={this.changePlaceholder}
      />
    );
  }
}

export default AllBillingContainer;
