import styled from 'styled-components';
import {themeConsts} from './themeConsts'


export const LoginDiv = styled.div`
    width:100vw;
    height:100vh;
    display:grid;
    grid-template-columns: 58% 25%;
    grid-gap: 5%;
    align-items: center;
    background:url('../../img/fundo-login.svg');
    background-size:cover;
    background-repeat:no-repeat;

    .ilustration{
        padding-left: 50px;

        img{
            max-width:100%;
        }
    }

    .login-form{
        text-align: center;

        .login-fields{
            margin-top:35px;
            text-align:center;

            .error-animation{
                animation: errorShake .2s ease;
            }
            @keyframes errorShake {
                    0%, 100% { left: 0px;}
                    20% , 60%{left: 15px;}
                    40% , 80%{left: -15px;}
                }

            .forgot-password{
                margin-top:10px;
                color:${themeConsts.white};
                letter-spacing: .04em;
                cursor:pointer;
            }
        }

        .login-errors{
            position: absolute;
            font-size: .9em;
            color: #006cff;
            text-align: center;
            right: 0;
            left: 0;
            bottom: 13px;
        }
        
        .welcome-user{
            color: ${themeConsts.white};
            font-size: 2em;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .2em;
            animation: opacityAnimation .9s ease .5s;
            animation-fill-mode:forwards;
            opacity:0;
        }

        .welcome-user-name{
            color: ${themeConsts.white};
            font-weight: 500;
            margin-top: 15px;
            font-size: 1.4em;
            letter-spacing: .02em;
            animation: opacityAnimation .9s ease 1s;
            animation-fill-mode:forwards;
            opacity:0;
        }


        /* CSS PARA A ANIMAÇÃO DE LOGIN c*/
        .check_mark {
            width: 80px;
            height: auto;
            margin: 0 auto;
        }
        
        .sa-icon {
            width: 80px;
            height: 80px;
            border: 4px solid gray;
            -webkit-border-radius: 40px;
            border-radius: 40px;
            border-radius: 50%;
            margin: 20px auto;
            padding: 0;
            position: relative;
            box-sizing: content-box;
        }
        
        .sa-icon.sa-success {
            border-color: ${themeConsts.green};
        }
        
        .sa-icon.sa-success::before, .sa-icon.sa-success::after {
            content: '';
            -webkit-border-radius: 40px;
            border-radius: 40px;
            border-radius: 50%;
            position: absolute;
            width: 60px;
            height: 120px;
            background: white;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        .sa-icon.sa-success::before {
            -webkit-border-radius: 120px 0 0 120px;
            border-radius: 120px 0 0 120px;
            top: -7px;
            left: -33px;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transform-origin: 60px 60px;
            transform-origin: 60px 60px;
        }
        
        .sa-icon.sa-success::after {
            -webkit-border-radius: 0 120px 120px 0;
            border-radius: 0 120px 120px 0;
            top: -11px;
            left: 30px;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transform-origin: 0px 60px;
            transform-origin: 0px 60px;
        }
        
        .sa-icon.sa-success .sa-placeholder {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(76, 175, 80, .5);
            -webkit-border-radius: 40px;
            border-radius: 40px;
            border-radius: 50%;
            box-sizing: content-box;
            position: absolute;
            left: -4px;
            top: -4px;
            z-index: 2;
        }
        
        .sa-icon.sa-success .sa-fix {
            width: 5px;
            height: 90px;
            background-color: white;
            position: absolute;
            left: 28px;
            top: 8px;
            z-index: 1;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        
        .sa-icon.sa-success.animate::after {
            -webkit-animation: rotatePlaceholder 4.25s ease-in;
            animation: rotatePlaceholder 4.25s ease-in;
        }
        
        .sa-icon.sa-success {
            border-color: transparent\9;
        }
        .sa-icon.sa-success .sa-line.sa-tip {
            -ms-transform: rotate(45deg) \9;
        }
        .sa-icon.sa-success .sa-line.sa-long {
            -ms-transform: rotate(-45deg) \9;
        }
        
        .animateSuccessTip {
            -webkit-animation: animateSuccessTip 0.75s;
            animation: animateSuccessTip 0.75s;
        }
        
        .animateSuccessLong {
            -webkit-animation: animateSuccessLong 0.75s;
            animation: animateSuccessLong 0.75s;
        }
        
        @-webkit-keyframes animateSuccessLong {
            0% {
            width: 0;
            right: 46px;
            top: 54px;
            }
            65% {
            width: 0;
            right: 46px;
            top: 54px;
            }
            84% {
            width: 55px;
            right: 0px;
            top: 33px;
            }
            100% {
            width: 47px;
            right: 8px;
            top: 37px;
            }
        }
        @-webkit-keyframes animateSuccessTip {
            0% {
            width: 0;
            left: 1px;
            top: 19px;
            }
            54% {
            width: 0;
            left: 1px;
            top: 19px;
            }
            70% {
            width: 50px;
            left: -8px;
            top: 37px;
            }
            84% {
            width: 17px;
            left: 21px;
            top: 50px;
            }
            100% {
            width: 25px;
            left: 14px;
            top: 48px;
            }
        }
        @keyframes animateSuccessTip {
            0% {
            width: 0;
            left: 1px;
            top: 19px;
            }
            54% {
            width: 0;
            left: 1px;
            top: 19px;
            }
            70% {
            width: 50px;
            left: -8px;
            top: 37px;
            }
            84% {
            width: 17px;
            left: 21px;
            top: 50px;
            }
            100% {
            width: 25px;
            left: 14px;
            top: 48px;
            }
        }
        
        @keyframes animateSuccessLong {
            0% {
            width: 0;
            right: 46px;
            top: 54px;
            }
            65% {
            width: 0;
            right: 46px;
            top: 54px;
            }
            84% {
            width: 55px;
            right: 0px;
            top: 33px;
            }
            100% {
            width: 47px;
            right: 8px;
            top: 37px;
            }
        }
        
        .sa-icon.sa-success .sa-line {
            height: 10px;
            background-color: ${themeConsts.green};
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 2;
        }
        
        .sa-icon.sa-success .sa-line.sa-tip {
            width: 25px;
            left: 14px;
            top: 48px;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        .sa-icon.sa-success .sa-line.sa-long {
            width: 47px;
            right: 8px;
            top: 37px;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        
        @-webkit-keyframes rotatePlaceholder {
            0% {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            }
            5% {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            }
            12% {
            transform: rotate(-405deg);
            -webkit-transform: rotate(-405deg);
            }
            100% {
            transform: rotate(-405deg);
            -webkit-transform: rotate(-405deg);
            }
        }
        @keyframes rotatePlaceholder {
            0% {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            }
            5% {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            }
            12% {
            transform: rotate(-405deg);
            -webkit-transform: rotate(-405deg);
            }
            100% {
            transform: rotate(-405deg);
            -webkit-transform: rotate(-405deg);
            }
        }

        .sa-fix, .sa-icon.sa-success::before{
            display:none;
        }

        .sa-icon.sa-success, .sa-placeholder{
            border:none !important;
        }

        .sa-icon.sa-success::after{
            content: '';
            position: absolute;
            width: 50%;
            height: 50%;
            background-color: #fff;
            transform: none;
            border-radius: 50%;
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
        }

        .opacityanim{
            animation: opacityAnimation .9s ease;
            animation-fill-mode: forwards;
        }
        @keyframes opacityAnimation{
            0%{opacity: 0;}
            100%{opacity: 1;}
        }

    }

    .input-wrapper{
        position:relative;
        margin:18px auto 0 auto;
        max-width:375px;

        input{
            width:90%;
            margin:0 auto;
            background-color:${themeConsts.white};
            color: ${themeConsts.textDarkGrey};
            border:none;
            height:42px;
            border-radius: ${themeConsts.borderRadius};
            text-indent: 15px;
            font-weight:600;
            position:relative;
        }

        input:-internal-autofill-previewed, input:-internal-autofill-selected, textarea:-internal-autofill-previewed, textarea:-internal-autofill-selected, select:-internal-autofill-previewed, select:-internal-autofill-selected {
            background-color: ${themeConsts.white} !important;
            background-image: none !important;
            color: ${themeConsts.textDarkGrey} !important;
            font-weight:600;
        }

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset;
            font-weight:600;
            -webkit-text-fill-color: ${themeConsts.textDarkGrey} !important;
        }

        .input-error{
            border: 2px solid ${themeConsts.red};
        }

        svg{
            font-size:2em;
            color:${themeConsts.textDarkGrey};
            position: absolute;
            right:35px;
            top:0;
            bottom:0;
            margin: auto;
        }
    }

    button{
        margin:0 auto;
        background-color:${themeConsts.activeBlue};
        border:none;
        box-shadow:none;
        color:#fff;
        padding: 12px 20px;
        border-radius:${themeConsts.borderRadius};
        margin-top:45px;
        font-weight: 600;
        font-size: 1.4em;
        letter-spacing: .05em;
        cursor: pointer;
    }

    .forgot-password{
        text-align: center;
    }

`



export const ResetPasswordDiv = styled.div`

`