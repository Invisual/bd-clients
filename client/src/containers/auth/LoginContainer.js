import React, { Component } from 'react';
import {Login} from '../../components/auth/Login';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class LoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
    }

    setUsername = (e) => {
        this.setState({usernameInput: e.target.value})
    }

    setPassword = (e) => {
        this.setState({passwordInput: e.target.value})
    }

    enterLogin = (e) => {
        if (e.keyCode === 13) {
          this.loginUser();
        }
    }

    loginUser = () => {
        axios.post('/api/users/login',{
            username: this.state.usernameInput,
            password: this.state.passwordInput
        })
        .then((response) => {
            if(response.data.hasOwnProperty('token') && response.data.hasOwnProperty('user')){
                //USER LOGGADO COM SUCESSO, VAMOS MOSTRAR O ALERTA E DEPOIS ENVIAR A INFO PARA O COMPONENTE APP E VAMOS METER OS DADOS DO USER EM LOCAL STORAGE
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
                  Toast.fire({
                    type: 'success',
                    title: `Bem-vindo ${response.data.user.name_user}`
                  }).then(()=>{
                    localStorage.setItem('loggedIn', JSON.stringify(true));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    this.props.login(response.data.user, response.data.token);
                  })
            }
            else{
                //DADOS DE LOGIN INCORRECTOS. VAMOS MOSTRAR O ERRO
                document.getElementById('loginerrors').innerHTML = response.data
            }
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    render(){
        return <Login setUsername={this.setUsername} setPassword={this.setPassword} loginUser={this.loginUser} enterLogin={this.enterLogin}/>;
    }
}


export default LoginContainer;