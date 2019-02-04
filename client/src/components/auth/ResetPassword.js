import React from 'react';
import {LoginDiv} from '../../styles/auth';
import { FiLock } from 'react-icons/fi';
import { Redirect } from 'react-router'

export const ResetPassword = (props) => {

    if(props.redirect){
        return <Redirect to='/'/>;
    }

    return (
        <LoginDiv>
            <div className="ilustration">
                <img src="/img/ilust-login.svg" alt="Repôr Password" />
            </div>
            <div className="login-form reset-form">
                <div className="login-fields reset-fields">
                    <div className="input-wrapper">
                        <input type="password" placeholder="Nova Password" />
                        <FiLock />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="Repita a Password" />
                        <FiLock />
                    </div>
                    <button>Confirmar</button>
                </div>
            </div>
        </LoginDiv>
    );
}