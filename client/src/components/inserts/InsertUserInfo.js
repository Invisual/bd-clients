import React, {Component} from 'react';
import {InsertFormDiv} from '../../styles/inserts'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const axios = require('axios');

class InsertUserInfo extends Component{

constructor(props){
  super(props);
  this.state = {
    userInfoTitle: '',
    userInfoEmail: '',
    userInfoPassword: '',
    userInfoObs: '',
  }
}

changeInfoTitle = (e) => {
  this.setState({ userInfoTitle: e.target.value })
}
changeInfoEmail = (e) => {
  this.setState({ userInfoEmail: e.target.value })
}
changeInfoPassword= (e) => {
  this.setState({ userInfoPassword: e.target.value })
}
changeInfoObs = (e) => {
  this.setState({ userInfoObs: e.target.value })
}

insertInfo = (e) => {
  e.preventDefault();
  var data = {
      infoTitle: this.state.userInfoTitle,
      infoEmail: this.state.userInfoEmail,
      infoPassword: this.state.userInfoPassword,
      infoObs: this.state.userInfoObs,
      activeMemberId: this.props.activeMember
  } 
  var token = JSON.parse(localStorage.getItem('token'));
  var AuthStr = 'Bearer ' + token;
  axios.post('/api/users/info', data, { headers: { Authorization: AuthStr } })
  .then(res => {
      if(res.data.affectedRows){
          Swal.fire({
              type: 'success',
              title: 'Nova Informação inserida',
              text: `As informações foram inseridas com sucesso!`
            })
            .then(click => {
              this.setState({redirect: true})
            })
      }
  })
}

render(){
    return (
      <InsertFormDiv className="limited-width white-bg nomargin">

            <div className="cards-container form-container insert-in-grid">

                <div className="form-title"><h4 className="widget-title">Adicionar Informações</h4></div>
                <form onSubmit={this.insertInfo}>
                <div className="grid50-50 form-grid">

                    <div className="grid-item">
                        <div className="input-wrapper">
                            <fieldset>
                                <legend>Titulo</legend>
                                <input type="text" onChange={this.changeInfoTitle} placeholder="Escrever" />
                            </fieldset>
                        </div>
                    </div>

                    <div className="grid-item">
                        <div className="input-wrapper">
                          <fieldset>
                            <legend>Email</legend>
                            <input type="text" onChange={this.changeInfoEmail} placeholder="Escrever" />
                          </fieldset>
                        </div>
                    </div>

                    <div className="grid-item">
                        <div className="input-wrapper">
                          <fieldset>
                            <legend>Password</legend>
                            <input type="text" onChange={this.changeInfoPassword} placeholder="Escrever" />
                          </fieldset>
                        </div>
                    </div>

                    <div className="grid-item">
                        <div className="input-wrapper">
                          <fieldset>
                            <legend>Observações</legend>
                            <input type="text" onChange={this.changeInfoObs} placeholder="Escrever" />
                          </fieldset>
                        </div>
                    </div>

                </div>

                <div className="form-buttons">
                    <button type="button" className="btn secondary-btn">Cancelar</button>
                    <button className="btn main-btn">Adicionar</button>
                </div>
                </form>
            </div>

      </InsertFormDiv>
    )
}

}

export default InsertUserInfo
