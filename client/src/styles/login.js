import styled from 'styled-components';

export const LoginDiv = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:#f7f7f7;

    .login-form{
        width:300px;
        padding: 40px 20px;
        background-color:#fff;
        position:relative;
        border-radius:3px;
        box-shadow: 0 1px 22px 5px rgba(0,0,0,.2);

        .login-header{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            background-color:#006cff;
            padding: 20px 0;
            color:#fff;
            text-align:center;
            font-weight:600;
            letter-spacing:.02em;
            border-top-left-radius:3px;
            border-top-right-radius:3px;
        }

        .login-fields{
            margin-top:35px;
            text-align:center;

            input{
                width:90%;
                margin:0 auto;
                background-color:transparent;
                border:none;
                border-bottom:2px solid #ccc;
                margin-top:25px;
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