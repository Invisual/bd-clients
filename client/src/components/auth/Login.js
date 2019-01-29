import React from 'react';
import {LoginDiv} from '../../styles/login';
import { FiUser, FiLock } from 'react-icons/fi';

export const Login = (props) => {
    return (
        <LoginDiv>
            <div className="ilustration">
                <img src="/img/ilust-login.svg" alt="Login Tarefas" />
            </div>
            <div className="login-form">
                {props.sucessfullLogin ? 
                <div>
                    <div className="check_mark">
                        <div className="sa-icon sa-success opacityanim">
                            <span className="sa-line sa-tip animateSuccessTip"></span>
                            <span className="sa-line sa-long animateSuccessLong"></span>
                            <div className="sa-placeholder"></div>
                            <div className="sa-fix"></div>
                        </div>
                    </div>
                    <div className="welcome-user">
                        Bem Vindo
                    </div>
                    <div className="welcome-user-name"></div>
                 </div>
                : //SE AINDA NAO TIVER LOGADO COM SUCESSO VAMOS MOSTRAR O FORM PARA LOGIN. CASO CONTRARIO VAMOS MOSTRAR A ANIMACAO
                <div>
                    <div className="login-header">
                        <img src="img/logo.png" alt="Invisual Branding Solutions" />
                    </div>
                    <div className="login-fields">
                        <div className={props.incUsername ? 'error-animation input-wrapper' : 'input-wrapper'}>
                            <input type="text" className={props.incUsername ? 'input-error' : null} placeholder="Username" onChange={props.setUsername} onKeyDown={props.enterLogin} onClick={props.removeErrors}/>
                            <FiUser />
                        </div>
                        <div className={props.incPassword ? 'error-animation input-wrapper' : 'input-wrapper'}>
                            <input type="password" className={props.incPassword ? 'input-error' : null} placeholder="Password" onChange={props.setPassword} onKeyDown={props.enterLogin} onClick={props.removeErrors}/>
                            <FiLock />
                        </div>
                        <div className={props.incPassword ? 'forgot-password' : 'nodisplay forgot-password'}>Esqueceu-se da password?</div>
                        <button onClick={props.loginUser}>Login</button>
                    </div>
                </div>
                }
            </div>

            
        </LoginDiv>
    );
}