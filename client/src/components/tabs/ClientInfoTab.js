import React, {Component} from 'react'
const axios = require('axios')

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

  setUserInactive = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var user = JSON.parse(localStorage.getItem('user')).id_user
    axios.put(`/api/users/inactive/${user}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.logout()
    });
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
            </div>
            
            <div className="client-info-grid50">
              <div className="client-info">
                <h4 className="client-content-title">Emails</h4>
                {this.props.clientContent.details[0].email_client ?
                  this.props.clientContent.details[0].email_client.split(',').map( (email, index) =>{
                  return <div key={index}>{email}</div>
                }): <div>{noInfo}</div>}
              </div>
              <div className="client-info right">
              <h4 className="client-content-title">Outras Informações</h4>
                {this.props.clientContent.details[0].others_client ?
                  this.props.clientContent.details[0].others_client.split(',').map( (other, index)=> {
                  return <div key={index}>{other}</div>
                }): <div>{noInfo}</div>}
              </div>
            </div>
          </div>
        </>
     )
  }
}

export default ClientInfoTab;
