import React, {Component} from 'react'
import { AllTeam } from '../../components/lists/AllTeam';
import moment from 'moment';
import 'moment/locale/pt';
import { createBrowserHistory } from 'history';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const axios = require('axios')
const history = createBrowserHistory();

class AllTeamContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeMember: '',
            activeTab: 'history',
            memberContent: [],
            displaySearchInput: '',
            searchQuery: '',
            filtersAreActive: false,
            infosAreActive: false,
            filters: {
              client: '',
              startDate: new Date().setMonth(new Date().getMonth()-1),
              endDate: new Date(),
              isStartDateSet: false,
              isEndDateSet: false,
            },
            clientsList: [],
            reloadMembers: false,
            isLoading: true
        }
    }

    changeFilters = filters => this.setState({filters: filters}, () => console.log(this.state.filters))
    changeFiltersAreActive = () => this.setState({filtersAreActive: !this.state.filtersAreActive})
    changeInfosAreActive = () => this.setState({infosAreActive: !this.state.infosAreActive})
    
    getNumberOfActiveFilters = () => {
      var x = 0;
      if(this.state.filters.client !== '') {x++}
      if(this.state.filters.isStartDateSet) {x++}
      if(this.state.filters.isEndDateSet) {x++}
      return x
    }

    getMemberDetails = (startDate=moment(new Date()).subtract(30, 'days').format('YYYY-MM-D'), endDate=moment(new Date()).format('YYYY-MM-D')) => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token
        if (this.state.activeMember) {
            axios.get(`/api/users/details/${this.state.activeMember}/${startDate}/${endDate}`, { headers: { Authorization: AuthStr } }).then(res => {
                this.setState({ memberContent: res.data, isLoading: false });
            });
        }
        else{
            axios
            .get(`/api/users`, { headers: { Authorization: AuthStr } })
            .then(res => {
                this.setState({ activeMember: res.data[0].id_user });
            })
            .then(res => {
                axios.get(`/api/users/details/${this.state.activeMember}/${startDate}/${endDate}`, { headers: { Authorization: AuthStr } }).then(res => {
                if (res.data === 'nodata') {
                    this.setState({ memberContent: null, isLoading: false });
                } else {
                    this.setState({ memberContent: res.data, isLoading: false });
                }
            });
          });
        }
    }

    getClients = () => {
      var token = JSON.parse(localStorage.getItem('token'));
      var AuthStr = 'Bearer ' + token;
      axios.get(`/api/clients/basic`, { headers: { Authorization: AuthStr } }).then(res => {
        this.setState({ clientsList: res.data});
      });
    }

    changeActiveMember = userId => {
        if (userId === this.state.activeMember) { return null }
        else { this.setState({ activeMember: userId, isLoading: true }) }
    }

    changeActiveTab = tab => this.setState({activeTab: tab})

    changeSearchQuery = e => this.setState({searchQuery:e.target.value})

    toggleSearchInput = () => {
        if(this.state.displaySearchInput === '' || this.state.displaySearchInput === 'hidesearch'){
          this.setState({displaySearchInput: 'showsearch'})
        }
        else if(this.state.displaySearchInput === 'showsearch'){
          this.setState({displaySearchInput: 'hidesearch'})
        }
    }


    deleteActiveMember = memberId => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
          title: 'Tem a certeza que quer eliminar este Utilizador?',
          text: 'Esta ação é irreversível',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.value) {
            Swal.fire('Utilizador Eliminado', '', 'success').then(result => {
              if (result.value) {
                axios
                  .delete(`/api/users/${memberId}`, { headers: { Authorization: AuthStr } })
                  .then(this.setState({ activeMember: '', reloadMembers: true }))
              }
            });
          }
        });
    };

    componentDidMount(){
        if(this.props.isShare){this.setState({activeMember: this.props.match.params.id},
           () => this.getMemberDetails(moment(this.state.filters.startDate).format('YYYY-MM-D'), moment(this.state.filters.endDate).format('YYYY-MM-D')))
           history.replace({ pathname: '/team' })
        }
        else{
          this.getMemberDetails(moment(this.state.filters.startDate).format('YYYY-MM-D'), moment(this.state.filters.endDate).format('YYYY-MM-D'))
        }
        this.getClients()
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeMember !== this.state.activeMember) {
          this.getMemberDetails();
          this.setState({ activeTab: 'history' });
        }
        if (prevState.reloadMembers !== this.state.reloadMembers) {
            this.setState({ reloadMembers: false });
        }
        if(prevState.filters.startDate !== this.state.filters.startDate || prevState.filters.endDate !== this.state.filters.endDate){
          this.getMemberDetails(moment(this.state.filters.startDate).format('YYYY-MM-D'), moment(this.state.filters.endDate).format('YYYY-MM-D'))
        }
      }

    render(){
        return <AllTeam
                    userRole={this.props.userInfo.ref_id_role}
                    memberContent={this.state.memberContent}
                    isLoading={this.state.isLoading}
                    activeMember={this.state.activeMember}
                    changeActiveMember={this.changeActiveMember}
                    activeTab={this.state.activeTab}
                    changeActiveTab={this.changeActiveTab}
                    searchQuery={this.state.searchQuery}
                    changeSearchQuery={this.changeSearchQuery}
                    displaySearchInput={this.state.displaySearchInput}
                    toggleSearchInput={this.toggleSearchInput}
                    deleteActiveMember={this.deleteActiveMember}
                    reloadMembers={this.state.reloadMembers}
                    changeFilters={this.changeFilters}
                    filtersAreActive={this.state.filtersAreActive}
                    infosAreActive={this.state.infosAreActive}
                    changeFiltersAreActive={this.changeFiltersAreActive}
                    changeInfosAreActive={this.changeInfosAreActive}
                    filters={this.state.filters}
                    getNumberOfActiveFilters={this.getNumberOfActiveFilters}
                    clientsList={this.state.clientsList}
                />
    }

}

export default AllTeamContainer