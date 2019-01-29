import styled from 'styled-components';
import {themeConsts} from './themeConsts'


export const LoginDiv = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: space-around;
    align-items: center;
    background:url('./img/fundo-login.svg');
    background-size:cover;
    background-repeat:no-repeat;

    .ilustration{
        width:50%;

        img{
            max-width:100%;
        }
    }

    .login-form{
        width:300px;
        text-align: center;

        .login-fields{
            margin-top:35px;
            text-align:center;

            input{
                width:90%;
                margin:0 auto;
                background-color:${themeConsts.white};
                margin-top:15px;
                border:none;
                color: ${themeConsts.textDarkGrey};
            }

            input:-internal-autofill-previewed, input:-internal-autofill-selected, textarea:-internal-autofill-previewed, textarea:-internal-autofill-selected, select:-internal-autofill-previewed, select:-internal-autofill-selected {
                background-color: ${themeConsts.white} !important;
                background-image: none !important;
                color: ${themeConsts.textDarkGrey} !important;
            }

            input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px white inset;
            }

            button{
                width:90%;
                margin:0 auto;
                background-color:#006cff;
                border:none;
                box-shadow:none;
                color:#fff;
                padding: 15px;
                border-radius:3px;
                margin-top:25px;
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
    }
`