import React from 'react';
import {LoginDiv} from '../../styles/auth';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';

export const Login = (props) => {
    return (
        <LoginDiv>
            <div className="ilustration">
                <img src="/img/ilust-login.svg" alt="Login Tarefas" />
            </div>
            {props.forgotPassword ?
                props.emailSent ?
                    <div className="email-sent">
                        Verifique o seu email e siga as instruções.
                    </div>
                :    
                    <div className="forgot-password">
                        <div className={props.incEmail ? 'error-animation input-wrapper' : 'input-wrapper'}>
                            <input type="email" className={props.incEmail ? 'input-error forgot-input-email' : 'forgot-input-email'} placeholder="Insira o seu Email" onKeyDown={props.enterEmail} onChange={props.setEmail} onClick={props.removeErrors}/>
                            <FiMail />
                        </div>
                        <div className={props.incEmail ? 'forgot-password' : 'nodisplay forgot-password'} onClick={props.userForgotPassword}>Este email não está associado a nenhuma conta!</div>
                        <button onClick={props.requestNewPassword}>Pedir Nova Password</button>
                    </div>
            :
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
                            <div className={props.incPassword ? 'forgot-password' : 'nodisplay forgot-password'} onClick={props.userForgotPassword}>Esqueceu-se da password?</div>
                            <button onClick={props.loginUser}>Login</button>
                        </div>
                    </div>
                    }
                </div>
            }

            
        </LoginDiv>
    );
}