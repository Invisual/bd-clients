import React from 'react';
import {LoginDiv} from '../../styles/login';

export const Login = (props) => {
    return (
        <LoginDiv>
            <div className="ilustration">
                <img src="/img/ilust-login.svg" alt="Login Tarefas" />
            </div>
            <div className="login-form">
                <div className="login-header">
                    <img src="img/logo.png" alt="Invisual Branding Solutions" />
                </div>
                <div className="login-fields">
                    <input type="text" className="username-password-input" placeholder="Username" onChange={props.setUsername} onKeyDown={props.enterLogin}/>
                    <input type="password" className="login-password-input" placeholder="Password" onChange={props.setPassword} onKeyDown={props.enterLogin}/>
                    <button onClick={props.loginUser}>Login</button>
                </div>
                <div id="loginerrors" className="login-errors"></div>
            </div>
        </LoginDiv>
    );
}