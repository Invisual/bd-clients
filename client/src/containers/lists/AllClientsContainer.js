import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { AllClients } from '../../components/lists/AllClients'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios')
const history = createBrowserHistory()

class AllClientsContainer extends Component {
  _isMounted = false
  constructor(props) {
    var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role
    super(props)
    this.state = {
      activeClient: '',
      activeTab: userRole === 3 ? 'clientinfo' : 'clientmarketing',
      clientContent: [],
      searchQuery: '',
      displaySearchInput: '',
      onlyAvencados: false,
      isLoading: true
    }
  }

  changeOnlyAvencados = () => {
    this.setState(prevState => ({ onlyAvencados: !prevState.onlyAvencados }))
  }

  getClientDetails = () => {
    const {
      match: { params }
    } = this.props
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    if (this.state.activeClient) {
      axios
        .get(`/api/clients/details/${this.state.activeClient}`, {
          headers: { Authorization: AuthStr }
        })
        .then(res => {
          if (this._isMounted) {
            this.setState({ clientContent: res.data, isLoading: false })
          }
        })
    } else {
      if (this.props.isShare) {
        history.replace({ pathname: '/clients' })
        axios
          .get(`/api/clients/details/${params.id}`, {
            headers: { Authorization: AuthStr }
          })
          .then(res => {
            if (this._isMounted) {
              this.setState({ activeClient: res.data.details[0].id_client })
            }
          })
          .then(res => {
            axios
              .get(`/api/clients/details/${this.state.activeClient}`, {
                headers: { Authorization: AuthStr }
              })
              .then(res => {
                if (this._isMounted) {
                  if (res.data === 'nodata') {
                    this.setState({ clientContent: null, isLoading: false })
                  } else {
                    this.setState({ clientContent: res.data, isLoading: false })
                  }
                }
              })
          })
      } else {
        axios
          .get(`/api/clients`, { headers: { Authorization: AuthStr } })
          .then(res => {
            if (this._isMounted) {
              this.setState({ activeClient: res.data.details[0].id_client })
            }
          })
          .then(res => {
            axios
              .get(`/api/clients/details/${this.state.activeClient}`, {
                headers: { Authorization: AuthStr }
              })
              .then(res => {
                if (this._isMounted) {
                  if (res.data === 'nodata') {
                    this.setState({ clientContent: null, isLoading: false })
                  } else {
                    this.setState({ clientContent: res.data, isLoading: false })
                  }
                }
              })
          })
      }
    }
  }

  changeActiveClient = clientId => {
    if (clientId === this.state.activeClient) {
      return null
    } else {
      this.setState({ activeClient: clientId, isLoading: true })
    }
  }

  changeActiveTab = activeTab => {
    this.setState({ activeTab: activeTab })
  }

  copyAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000
    })

    Toast.fire({
      type: 'success',
      title: 'Link copiado com sucesso!'
    })
  }

  deleteActiveClient = (id, name) => {
    if (window.confirm('Eliminar cliente ' + name + '?')) {
      var token = JSON.parse(localStorage.getItem('token'))
      var AuthStr = 'Bearer ' + token
      axios
        .delete(`/api/clients/${id}`, {
          headers: { Authorization: AuthStr }
        })
        .then(res => {
          if (res.data === 'deleted') {
            window.location.reload()
          }
        })
    }
  }
  duplicateActiveTask = taskId => {
    window.alert('Duplicate task ' + taskId + '?')
  }
  editActiveTask = taskId => {
    window.alert('Edit task ' + taskId + '?')
  }

  changeSearchQuery = e => this.setState({ searchQuery: e.target.value })

  toggleSearchInput = () => {
    if (
      this.state.displaySearchInput === '' ||
      this.state.displaySearchInput === 'hidesearch'
    ) {
      this.setState({ displaySearchInput: 'showsearch' }, () =>
        document.getElementById('clients-search').focus()
      )
    } else if (this.state.displaySearchInput === 'showsearch') {
      this.setState(
        { displaySearchInput: 'hidesearch', searchQuery: '' },
        () => (document.getElementById('clients-search').value = '')
      )
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.getClientDetails()
  }

  componentDidUpdate(prevProps, prevState) {
    var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role

    if (prevState.activeClient !== this.state.activeClient) {
      this.getClientDetails()
      this.setState({
        activeTab: userRole === 3 ? 'clientinfo' : 'clientmarketing'
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <AllClients
        userRole={this.props.userInfo.ref_id_role}
        clientContent={this.state.clientContent}
        isLoading={this.state.isLoading}
        activeClient={this.state.activeClient}
        changeActiveClient={this.changeActiveClient}
        deleteActiveTask={this.deleteActiveClient}
        duplicateActiveTask={this.duplicateActiveTask}
        editActiveTask={this.editActiveTask}
        changeCommentVal={this.changeCommentVal}
        submitComment={this.submitComment}
        isShare={this.props.isShare}
        copyAlert={this.copyAlert}
        changeActiveTab={this.changeActiveTab}
        activeTab={this.state.activeTab}
        searchQuery={this.state.searchQuery}
        changeSearchQuery={this.changeSearchQuery}
        displaySearchInput={this.state.displaySearchInput}
        toggleSearchInput={this.toggleSearchInput}
        onlyAvencados={this.state.onlyAvencados}
        changeOnlyAvencados={this.changeOnlyAvencados}
        logout={this.props.logout}
      />
    )
  }
}

export default AllClientsContainer
