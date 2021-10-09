import React, { Component } from 'react'
import CreateClientInfo from '../../components/inserts/CreateClientInfo'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const axios = require('axios')

class CreateClientInfoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cpanelLinkInput: '',
      cpanelUserInput: '',
      cpanelPassInput: '',
      dnsNicInput: '',
      dnsPassInput: '',
      wpLinkInput: '',
      wpUserInput: '',
      wpPassInput: '',
      emailsInput: '',
      othersInput: '',
      googleUserInput: '',
      googlePassInput: '',
      facebookUserInput: '',
      facebookPassInput: '',
      instagramUserInput: '',
      instagramPassInput: '',
      othersMarketingInput: '',
      clientInfo: [],
      redirect: false,
      isLoading: true
    }
  }

  changeCpanelLinkInput = e => {
    this.setState({ cpanelLinkInput: e.target.value })
  }

  changeCpanelUserInput = e => {
    this.setState({ cpanelUserInput: e.target.value })
  }

  changeCpanelPassInput = e => {
    this.setState({ cpanelPassInput: e.target.value })
  }

  changeDnsNicInput = e => {
    this.setState({ dnsNicInput: e.target.value })
  }

  changeDnsPassInput = e => {
    this.setState({ dnsPassInput: e.target.value })
  }

  changeWpLinkInput = e => {
    this.setState({ wpLinkInput: e.target.value })
  }

  changeWpUserInput = e => {
    this.setState({ wpUserInput: e.target.value })
  }

  changeWpPassInput = e => {
    this.setState({ wpPassInput: e.target.value })
  }

  changeEmailsInput = e => {
    this.setState({ emailsInput: e.target.value })
  }

  changeOthersInput = e => {
    this.setState({ othersInput: e.target.value })
  }

  changeGoogleUserInput = e => {
    this.setState({ googleUserInput: e.target.value })
  }

  changeGooglePassInput = e => {
    this.setState({ googlePassInput: e.target.value })
  }

  changeInstagramUserInput = e => {
    this.setState({ instagramUserInput: e.target.value })
  }

  changeInstagramPassInput = e => {
    this.setState({ instagramPassInput: e.target.value })
  }

  changeFacebookUserInput = e => {
    this.setState({ facebookUserInput: e.target.value })
  }

  changeFacebookPassInput = e => {
    this.setState({ facebookPassInput: e.target.value })
  }

  changeOthersMarketingInput = e => {
    this.setState({ othersMarketingInput: e.target.value })
  }

  getClientInfo = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var id = this.props.match.params.id
    axios
      .get(`/api/clients/details/${id}`, {
        headers: { Authorization: AuthStr }
      })
      .then(res => {
        if (res.data === 'nodata') {
          Swal.fire({
            type: 'error',
            title: 'ID não existente',
            text: `O Cliente que está a tentar editar não existe.`
          }).then(click => {
            this.setState({ redirect: true })
          })
        } else {
          this.setState({
            clientInfo: res.data.details[0],
            cpanelLinkInput: res.data.details[0].cpanel_link_client,
            cpanelUserInput: res.data.details[0].cpanel_username_client,
            cpanelPassInput: res.data.details[0].cpanel_password_client,
            dnsNicInput: res.data.details[0].dns_nichandle_client,
            dnsPassInput: res.data.details[0].dns_password_client,
            wpLinkInput: res.data.details[0].wordpress_link_client,
            wpUserInput: res.data.details[0].wordpress_username_client,
            wpPassInput: res.data.details[0].wordpress_password_client,
            emailsInput: res.data.details[0].email_client,
            othersInput: res.data.details[0].others_client,
            googleUserInput: res.data.details[0].google_username,
            googlePassInput: res.data.details[0].google_password,
            instagramUserInput: res.data.details[0].instagram_username,
            instagramPassInput: res.data.details[0].instagram_password,
            facebookUserInput: res.data.details[0].facebook_username,
            facebookPassInput: res.data.details[0].facebook_password,
            othersMarketingInput: res.data.details[0].others_marketing
          })
        }
      })
  }

  editClientInfo = e => {
    e.preventDefault()
    var data = {
      id: this.props.match.params.id,
      userId: JSON.parse(localStorage.getItem('user')).id_user,
      cpanelLink: this.state.cpanelLinkInput,
      cpanelUser: this.state.cpanelUserInput,
      cpanelPass: this.state.cpanelPassInput,
      dnsNic: this.state.dnsNicInput,
      dnsPass: this.state.dnsPassInput,
      wpLink: this.state.wpLinkInput,
      wpUser: this.state.wpUserInput,
      wpPass: this.state.wpPassInput,
      emails: this.state.emailsInput,
      others: this.state.othersInput,
      googleUser: this.state.googleUserInput,
      googlePass: this.state.googlePassInput,
      facebookUser: this.state.facebookUserInput,
      facebookPass: this.state.facebookPassInput,
      instagramUser: this.state.instagramUserInput,
      instagramPass: this.state.instagramPassInput,
      othersMarketing: this.state.othersMarketingInput
    }
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios
      .put('/api/clients/details/', data, {
        headers: { Authorization: AuthStr }
      })
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
      this.getClientInfo()
    }
  }

  render() {
    return (
      <CreateClientInfo
        title={this.props.title}
        cpanelLinkInput={this.state.cpanelLinkInput}
        cpanelUserInput={this.state.cpanelUserInput}
        cpanelPassInput={this.state.cpanelPassInput}
        dnsNicInput={this.state.dnsNicInput}
        dnsPassInput={this.state.dnsPassInput}
        wpLinkInput={this.state.wpLinkInput}
        wpUserInput={this.state.wpUserInput}
        wpPassInput={this.state.wpPassInput}
        emailsInput={this.state.emailsInput}
        othersInput={this.state.othersInput}
        googleUserInput={this.state.googleUserInput}
        googlePassInput={this.state.googlePassInput}
        facebookUserInput={this.state.facebookUserInput}
        facebookPassInput={this.state.facebookPassInput}
        instagramUserInput={this.state.instagramUserInput}
        instagramPassInput={this.state.instagramPassInput}
        othersMarketingInput={this.state.othersMarketingInput}
        clientInfo={this.state.clientInfo}
        changeCpanelLinkInput={this.changeCpanelLinkInput}
        changeCpanelUserInput={this.changeCpanelUserInput}
        changeCpanelPassInput={this.changeCpanelPassInput}
        changeWpLinkInput={this.changeWpLinkInput}
        changeWpUserInput={this.changeWpUserInput}
        changeWpPassInput={this.changeWpPassInput}
        changeDnsNicInput={this.changeDnsNicInput}
        changeDnsPassInput={this.changeDnsPassInput}
        changeEmailsInput={this.changeEmailsInput}
        changeOthersInput={this.changeOthersInput}
        changeGoogleUserInput={this.changeGoogleUserInput}
        changeGooglePassInput={this.changeGooglePassInput}
        changeFacebookUserInput={this.changeFacebookUserInput}
        changeFacebookPassInput={this.changeFacebookPassInput}
        changeInstagramUserInput={this.changeInstagramUserInput}
        changeInstagramPassInput={this.changeInstagramPassInput}
        changeOthersMarketingInput={this.changeOthersMarketingInput}
        editClientInfo={this.editClientInfo}
        redirect={this.state.redirect}
        isLoading={this.state.isLoading}
        type={this.props.type}
      />
    )
  }
}

export default CreateClientInfoContainer
