import React, {Component} from 'react'
const axios = require('axios')
const md5 = require('md5')

class ClientInfoTab extends Component {
  constructor(props){
    super(props)
    this.state = {
      infosPassword: '',
      userPasswordInput: '',
      userTries: 0,
      triesLimit: 3,
      passwordsMatch: false,
      showErrorMessage: false
    }
  }

  getPassword = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios.get(`/api/misc/pws/clientsinfos`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ infosPassword: res.data[0].value_pw});
    });
  }

  changeUserPasswordInput = (e) => this.setState({userPasswordInput: e.target.value})

  checkPasswords = (e) => {
    e.preventDefault()
    var userPass = md5(this.state.userPasswordInput)
    if(userPass === this.state.infosPassword){
      this.setState({passwordsMatch: true, showErrorMessage: false})
    }
    else{
      this.setState({userTries: this.state.userTries+1, showErrorMessage: true})
      this.refs.passwordinput.value = ''
    }
  }

  setUserInactive = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var user = JSON.parse(localStorage.getItem('user')).id_user
    axios.put(`/api/users/inactive/${user}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.logout()
    });
  }

  componentDidMount(){
    this.getPassword()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.userTries !== this.state.userTries){
      if(this.state.userTries > 3){
        this.setUserInactive()
      }
    }
  }

  render() {
   var noInfo = "Informação indisponível"
   if(this.state.passwordsMatch){
     return (
        <>
          <div className="client-content">
            <div className="client-info-grid50">
              <div className="client-info">
                <h4 className="client-content-title">cPanel</h4>
                <div><b>Link:</b> <span>{this.props.clientContent.details[0].cpanel_link_client? this.props.clientContent.details[0].cpanel_link_client : noInfo}</span></div>
                <div><b>Username: </b><span>{this.props.clientContent.details[0].cpanel_username_client ? this.props.clientContent.details[0].cpanel_username_client : noInfo}</span></div>
                <div><b>Password: </b><span>{this.props.clientContent.details[0].cpanel_password_client ? this.props.clientContent.details[0].cpanel_password_client : noInfo}</span></div>
              </div>
              <div className="client-info right">
                <h4 className="client-content-title">Wordpress</h4>
                <div><b>Link: </b><span>{this.props.clientContent.details[0].wordpress_link_client ? this.props.clientContent.details[0].wordpress_link_client : noInfo}</span></div>
                <div><b>Username: </b><span>{this.props.clientContent.details[0].wordpress_username_client ? this.props.clientContent.details[0].wordpress_username_client : noInfo}</span></div>
                <div><b>Password: </b><span>{this.props.clientContent.details[0].wordpress_password_client ? this.props.clientContent.details[0].wordpress_password_client : noInfo}</span></div>
              </div>
            </div>
            <div className="client-info-grid50">
              <div className="client-info">
                <h4 className="client-content-title">DNS</h4>
                <div><b>Username: </b><span>{this.props.clientContent.details[0].dns_nichandle_client ? this.props.clientContent.details[0].dns_nichandle_client : noInfo}</span></div>
                <div><b>Password: </b><span>{this.props.clientContent.details[0].dns_password_client ? this.props.clientContent.details[0].dns_password_client : noInfo}</span></div>
              </div>
              <div className="client-info right">
              <h4 className="client-content-title">Outras Informações</h4>
                {this.props.clientContent.details[0].others_client ?
                  this.props.clientContent.details[0].others_client.split(',').map( (other, index)=> {
                  return <div key={index}>{other}</div>
                }): <div>{noInfo}</div>}
              </div>
            </div>
            <div className="client-info-grid100">
              <div className="client-info">
              <h4 className="client-content-title">Emails</h4>
                {this.props.clientContent.details[0].email_client ?
                  this.props.clientContent.details[0].email_client.split(',').map( (email, index) =>{
                  return <div key={index}>{email}</div>
                }): <div>{noInfo}</div>}
              </div>
            </div>
          </div>
        </>
     )
   }
   else{
    return (
      <div className="client-info-password">
              <form onSubmit={this.checkPasswords}>
                <input type="password" placeholder="Password" className="info-password-input" onChange={this.changeUserPasswordInput} ref="passwordinput"/>
                {this.state.showErrorMessage ? 
                  this.state.userTries === this.state.triesLimit ?
                  <div className="password-error-message">Password Errada, última tentativa. Depois disto a sua conta será desactivada.</div>
                  :
                  <div className="password-error-message">Password Errada. Tem mais {this.state.triesLimit - this.state.userTries} tentativas.</div> 
                : null 
                }
                <div className="form-buttons">
                  <button className="btn main-btn">Submeter</button>
                </div>
              </form>
      </div>
    )
   }
  }
}

export default ClientInfoTab;
