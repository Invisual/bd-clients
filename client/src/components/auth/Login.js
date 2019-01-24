import React from 'react';
import {LoginDiv} from '../../styles/login';

export const Login = (props) => {
    return (
        <LoginDiv>
            <div className="login-form">
                <div className="login-header">
                    Login Tarefas
                </div>
                <div className="login-fields">
                    <input type="text" className="username-password-input" placeholder="Username" />
                    <input type="password" className="login-password-input" placeholder="Password" />
                    <button>Login</button>
                </div>
            </div>
        </LoginDiv>
    );
}