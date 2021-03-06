import React, {Component} from 'react'
const axios = require('axios')

class ClientInfoTab extends Component {
  setUserInactive = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    var user = JSON.parse(localStorage.getItem('user')).id_user
    axios.put(`/api/users/inactive/${user}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.props.logout()
    });
  }

  render() {
   var noInfo = "Informação indisponível"

    function copy(text, splice) {
        let dummy = document.createElement("textarea")
        document.body.appendChild(dummy)
        if (splice) {
            text = text.split(":").slice(1).join(":").trim()
        }
        dummy.value = text
        dummy.select()
        document.execCommand("copy")
        document.body.removeChild(dummy)
    }
     return (
        <>
          <div className="client-content">
            <div className="client-info-grid50">
              <div className="client-info">
                <h4 className="client-content-title">Google</h4>
                <div>
                    <b>Username: </b>
                    <span>
                        {this.props.clientContent.details[0].google_username ? this.props.clientContent.details[0].google_username : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].google_username ? this.props.clientContent.details[0].google_username : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
                <div>
                    <b>Password: </b>
                    <span>
                        {this.props.clientContent.details[0].google_password ? this.props.clientContent.details[0].google_password : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].google_password ? this.props.clientContent.details[0].google_password : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
              </div>
              <div className="client-info right">
                <h4 className="client-content-title">Facebook</h4>
                <div>
                    <b>Username: </b>
                    <span>
                        {this.props.clientContent.details[0].facebook_username ? this.props.clientContent.details[0].facebook_username : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].facebook_username ? this.props.clientContent.details[0].facebook_username : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
                <div>
                    <b>Password: </b>
                    <span>
                        {this.props.clientContent.details[0].facebook_password ? this.props.clientContent.details[0].facebook_password : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].facebook_password ? this.props.clientContent.details[0].facebook_password : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
              </div>
            </div>
            <div className="client-info-grid50">
              <div className="client-info">
                <h4 className="client-content-title">Instagram</h4>
                <div>
                    <b>Username | E-mail: </b>
                    <span>
                        {this.props.clientContent.details[0].instagram_username ? this.props.clientContent.details[0].instagram_username : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].instagram_username ? this.props.clientContent.details[0].instagram_username : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
                <div>
                    <b>Password: </b>
                    <span>
                        {this.props.clientContent.details[0].instagram_password ? this.props.clientContent.details[0].instagram_password : noInfo}
                    </span>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        copy(this.props.clientContent.details[0].instagram_password ? this.props.clientContent.details[0].instagram_password : noInfo)
                      }}
                    >
                      <span role="img" aria-label="Botão de Copiar">
                        &#x1f4cb;
                      </span>
                    </button>
                </div>
              </div>
            </div>
            <div className="client-info-grid100">
              <div className="client-info">
              <h4 className="client-content-title">Outras Informações</h4>
                {this.props.clientContent.details[0].others_marketing ?
                  this.props.clientContent.details[0].others_marketing.split(',').map( (other, index)=> {
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
