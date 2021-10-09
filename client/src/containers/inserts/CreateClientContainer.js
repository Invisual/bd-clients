import React, { Component } from 'react'
import CreateClient from '../../components/inserts/CreateClient'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const axios = require('axios')

class CreateClientContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameInput: '',
      redirect: false,
      isLoading: true
    }
  }

  changeNameInput = e => {
    this.setState({ nameInput: e.target.value })
  }

  getClientData = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var id = this.props.match.params.id
    axios
      .get(`/api/clients/basic/${id}`, { headers: { Authorization: AuthStr } })
      .then(res => {
        if (res.data === 'noclient') {
          Swal.fire({
            type: 'error',
            title: 'ID não existente',
            text: `O Cliente que está a tentar editar não existe.`
          }).then(click => {
            this.setState({ redirect: true })
          })
        } else {
          this.setState({
            nameInput: res.data[0].name_client
          })
        }
      })
  }

  insertClient = e => {
    e.preventDefault()
    var data = {
      clientName: this.state.nameInput,
      userId: JSON.parse(localStorage.getItem('user')).id_user
    }
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios
      .post('/api/clients/', data, { headers: { Authorization: AuthStr } })
      .then(res => {
        if (res.data.affectedRows) {
          Swal.fire({
            type: 'success',
            title: 'Novo Cliente Inserido',
            text: `O Cliente foi inserido com sucesso!`
          }).then(click => {
            this.setState({ redirect: true })
          })
        }
      })
  }

  editClient = e => {
    e.preventDefault()
    var data = {
      id: this.props.match.params.id,
      clientName: this.state.nameInput,
      userId: JSON.parse(localStorage.getItem('user')).id_user
    }
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios
      .put('/api/clients/', data, { headers: { Authorization: AuthStr } })
      .then(res => {
        if (res.data.affectedRows) {
          Swal.fire({
            type: 'success',
            title: 'Cliente Editado',
            text: `O Cliente foi editado com sucesso!`
          }).then(click => {
            this.setState({ redirect: true })
          })
        }
      })
  }

  componentDidMount() {
    const userRole = JSON.parse(localStorage.getItem('user')).ref_id_role
    if (userRole !== 0 && userRole !== 1) {
      this.setState({ redirect: true })
    }
    if (this.props.type === 'edit') {
      this.getClientData()
    }
  }

  render() {
    return (
      <CreateClient
        title={this.props.title}
        changeNameInput={this.changeNameInput}
        nameInput={this.state.nameInput}
        insertClient={this.insertClient}
        editClient={this.editClient}
        redirect={this.state.redirect}
        isLoading={this.state.isLoading}
        type={this.props.type}
      />
    )
  }
}

export default CreateClientContainer
