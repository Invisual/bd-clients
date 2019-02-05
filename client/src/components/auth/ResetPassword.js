import React from 'react';
import {LoginDiv} from '../../styles/auth';
import { FiLock } from 'react-icons/fi';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

export const ResetPassword = (props) => {

    if(props.redirect){
        return <Redirect to='/'/>;
    }

    return (
        <LoginDiv>
            <div className="ilustration">
                <img src="/img/resetpassword.svg" alt="Repôr Password" />
            </div>
            {props.passwordReseted ?
                <div className="password-reseted">
                    A Password foi alterada com sucesso ! Faça login <Link to="/">aqui</Link>.
                </div>
            :    
                <div className="login-form reset-form">
                    <div className="login-fields reset-fields">
                        <div className={props.passwordsMatch ? 'input-wrapper' : 'error-animation input-wrapper'}>
                            <input type="password" placeholder="Nova Password" className={props.passwordsMatch ? null : 'input-error'} onChange={props.setPassword} onClick={props.removeErrors}/>
                            <FiLock />
                        </div>
                        <div className={props.passwordsMatch ? 'input-wrapper' : 'error-animation input-wrapper'}>
                            <input type="password" placeholder="Repita a Password" className={props.passwordsMatch ? null : 'input-error'} onChange={props.setRePassword} onClick={props.removeErrors}/>
                            <FiLock />
                        </div>
                        <div className={props.passwordsMatch ? 'nodisplay forgot-password' : 'forgot-password'}>As Passwords não coincidem!</div>
                        <button onClick={props.changePassword}>Confirmar</button>
                    </div>
                </div>
            }    
        </LoginDiv>
    );
}