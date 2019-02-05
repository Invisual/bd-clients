import React, { Component } from 'react';
import { Login } from '../../components/auth/Login';

const axios = require('axios');

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: '',
            incorrectUsername: false,
            incorrectPassword: false,
            sucessfullLogin: false,
            forgotPassword: false,
            emailInput: '',
            incorrectEmail: false,
            emailSent: false
        }
    }

    setUsername = (e) => {
        this.setState({ usernameInput: e.target.value })
    }

    setPassword = (e) => {
        this.setState({ passwordInput: e.target.value })
    }

    setEmail = (e) => {
        this.setState({ emailInput: e.target.value })
    }

    enterLogin = (e) => {
        if (e.keyCode === 13) {
            this.loginUser();
        }
    }

    enterEmail = (e) => {
        if (e.keyCode === 13) {
            this.requestNewPassword();
        }
    }

    loginUser = () => {
        axios.post('/api/users/login', {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        })
            .then((response) => {
                if (response.data.hasOwnProperty('token') && response.data.hasOwnProperty('user')) {
                    //USER LOGGADO COM SUCESSO, VAMOS MOSTRAR O ALERTA E DEPOIS ENVIAR A INFO PARA O COMPONENTE APP E VAMOS METER OS DADOS DO USER EM LOCAL STORAGE
                    this.setState({ sucessfullLogin: true })
                    document.querySelector('.welcome-user-name').innerHTML = response.data.user.name_user;
                    var that = this;
                    setTimeout(function() {
                        localStorage.setItem('loggedIn', JSON.stringify(true));
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        localStorage.setItem('token', JSON.stringify(response.data.token));
                        that.props.login(response.data.user, response.data.token); 
                    }, 2500);
                }
                else {
                    //DADOS DE LOGIN INCORRECTOS. VAMOS MOSTRAR O ERRO
                    //document.getElementById('loginerrors').innerHTML = response.data
                    if (response.data === 'badusername') {
                        this.setState({ incorrectUsername: true })
                    }
                    else if (response.data === 'badpassword') {
                        this.setState({ incorrectPassword: true })
                    }
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    removeErrors = () => {
        this.setState({
            incorrectUsername: false,
            incorrectPassword: false,
            incorrectEmail: false
        })
    }

    userForgotPassword = () => {
        this.setState({
            forgotPassword: true,
        })
    }

    requestNewPassword = () => {
        axios.post('/api/users/requestpassword', {
            email: this.state.emailInput
        })
        .then((response) => {
            if(response.data === 'bademail'){
                this.setState({incorrectEmail: true})
            }
            else{
                this.setState({emailSent: true})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }


    render() {
        return <Login
            setUsername={this.setUsername}
            setPassword={this.setPassword}
            loginUser={this.loginUser}
            enterLogin={this.enterLogin}
            incUsername={this.state.incorrectUsername}
            incPassword={this.state.incorrectPassword}
            sucessfullLogin={this.state.sucessfullLogin}
            removeErrors={this.removeErrors}
            forgotPassword={this.state.forgotPassword}
            userForgotPassword={this.userForgotPassword}
            setEmail={this.setEmail}
            requestNewPassword={this.requestNewPassword}
            incEmail={this.state.incorrectEmail}
            emailSent={this.state.emailSent}
            enterEmail={this.enterEmail}
        />;
    }
}


export default LoginContainer;