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
      hoursInput: '',
      redirect: false,
      isLoading: true
    }
  }

  changeNameInput = e => {
    this.setState({ nameInput: e.target.value })
  }

  changeHoursInput = e => {
    this.setState({ hoursInput: e.target.value })
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
            nameInput: res.data[0].name_client,
            hoursInput: res.data[0].monthly_hours_client
          })
        }
      })
  }

  insertClient = e => {
    e.preventDefault()
    var data = {
      clientName: this.state.nameInput,
      clientHours: this.state.hoursInput
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
      clientHours: this.state.hoursInput
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
    if (this.props.type === 'edit') {
      this.getClientData()
    }
  }

  render() {
    return (
      <CreateClient
        title={this.props.title}
        changeNameInput={this.changeNameInput}
        changeHoursInput={this.changeHoursInput}
        nameInput={this.state.nameInput}
        hoursInput={this.state.hoursInput}
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
