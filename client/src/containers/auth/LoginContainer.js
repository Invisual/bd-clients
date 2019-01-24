import React, { Component } from 'react';
import {Login} from '../../components/auth/Login';

class LoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
    }
    render(){
        return <Login/>;
    }
}


export default LoginContainer;