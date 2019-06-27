import styled from 'styled-components'
import {themeConsts} from './themeConsts'

export const CostsModalDiv = styled.div`
    position:fixed !important;
    top:50%;
    left:0;
    right:0;
    margin:auto;
    z-index:111;
    width:80%;
    min-height: 250px !important;
    height: unset !important;
    transform: translateY(-50%);
    box-shadow: none !important;
    padding-bottom: 36px !important;

    .modal-close{
        position: absolute;
        top: 17px;
        right: 20px;
        cursor: pointer;
        z-index: 1;

        svg{
            font-size: 2.5em;
            color: ${themeConsts.secondaryBlue};
        }
    }

    h2{
        margin: 0;
        margin-bottom: 12px;
        padding: 20px 0 12px 28px;
        font-size: 1.6em;
        color:${themeConsts.titlesDarkGrey};
        border-bottom: 1px solid ${themeConsts.tableListBorder}
    }

    .costs-grid{
        display: grid;
        grid-template-columns: 2fr 2fr 1fr 1fr 1fr .5fr;
        grid-gap: 15px;
        width: 95%;
        margin: 23px auto;
        padding-top: 1px;

        fieldset{
            border:none;
            padding:0;

            legend{
                color: #4b4b4b;
                font-weight: 500;
                font-size: 1.4em;
                padding: 0;
                margin-bottom: 8px;
            }

            input[type='text'], input[type='number'], select{
                height:50px;
                width: 100%;
                border: none;
                box-shadow: 0px 1px 6px rgba(0,0,0,.16);
                border-radius: 10px;
                text-indent: 12px;
                color:${themeConsts.placeholderGrey}
            }

            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background: url(/img/seta-circulo.svg) 88% / 15% no-repeat #fff;
                background-size: 20px;
                cursor: pointer;
            }
        }

        .costs-form-copy{
            display:flex;
            align-items:center;
            justify-content:center;

            svg{
                font-size:2em;
                color:${themeConsts.secondaryBlue};
                stroke-width:3;
                position:relative;
                top:12px;
                cursor:pointer;
            }
        }
    }

    .costs-form-buttons{
        margin-top:40px;
        position:relative;

        svg{
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2em;
            stroke-width: 3;
            color:${themeConsts.secondaryBlue};
        }
    }


    .modal-costs-listing{
        width: 95%;
        margin: 0 auto;
        padding-top: 1px;

        .costs-list-header{
            display:grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr .5fr;
            background: ${themeConsts.tableHeader};

            h5{
                text-align:left;
                margin-left:15px;
                color:${themeConsts.titlesDarkGrey};
                font-size: 1.34em;
            }
        }
        .costs-list-row{
            display:grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr .5fr;
            padding: 4px 0;
            background-color:${themeConsts.white};
            border-bottom: 1px solid ${themeConsts.tableListBorder};

            p{
                text-align:left;
                margin-left:15px;
                color:${themeConsts.textDarkerGrey};
                font-weight:500;
                font-size: 1.1em;

                svg {
                    font-size: 1.6em;
                    color: ${themeConsts.secondaryBlue}
                }
            }
        }
        .costs-list-row:hover{
            background-color:${themeConsts.lightGrey}
        }
    }
`

export const HoursModalDiv = styled.div`
    position: fixed !important;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 111;
    width: 85%;
    height: unset !important;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    box-shadow: none !important;
    min-height: 200px !important;

    .todo-close{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        z-index: 1;

        svg{
            font-size: 2.5em;
            color: #aaaaaa;
        }
    }

    .todo-content{
        .widget-title{
            text-align:center;
        }

        .hours-form-row{
            display: grid;
            grid-template-columns: 1.5fr 2.5fr .75fr .75fr 1fr;
            grid-gap: 15px;
            margin-top:30px;

            fieldset{
                border: none;
                padding: 0;
                margin: 0;
            }

            legend{
                color: ${themeConsts.titlesDarkGrey};
                font-weight: 500;
                font-size: 1.4em;
                padding: 0;
                margin-bottom: 8px;
            }

            input, select{
                width: 100%;
                border: none;
                box-shadow: 0px 1px 6px rgba(0,0,0,.16);
                border-radius: 10px;
                text-indent: 12px;
                height:50px;
                color:${themeConsts.placeholderGrey};
            }

            select{
                appearance: none;
                background: url(/img/seta-circulo.svg) 94% / 15% no-repeat #fff;
                background-size: 20px;
                cursor: pointer;
            }

            .react-date-picker{
                width:100%;

                .react-date-picker__calendar{
                        left:unset;
                        right:0;
                }

                .react-date-picker__wrapper{
                    border:none;
                    box-shadow: 0px 1px 6px rgba(0,0,0,.16);
                    border-radius: 10px;
                    width:100%;
                    padding-left: 10px;

                    input{
                        box-shadow: none;
                        text-indent:unset;
                        border-radius: unset;
                        width: 14px !important;
                    }

                    .react-date-picker__clear-button{
                        display:none;
                    }

                    svg{
                        color: #7f9aff;
                        font-size: 1.5em;
                        stroke-width: 1.8;
                        position: relative;
                        right: 8px;
                    }

                    .react-date-picker__inputGroup__year {
                        width: 35px !important;
                    }
                }
            }
        }

        .hours-form-buttons{
            margin-top:50px;
            margin-bottom: 25px;
        }
    }
`


export const ConcludeModalDiv = styled.div`
    position:fixed !important;
    top:50%;
    left:0;
    right:0;
    margin:auto;
    z-index:111;
    width:600px;
    min-height: 250px !important;
    height: unset !important;
    transform: translateY(-50%);
    box-shadow: none !important;
    padding-bottom: 36px !important;

    .modal-close{
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        z-index: 1;

        svg{
            font-size: 2.5em;
            color: ${themeConsts.secondaryBlue};
        }
    }

    h2{
        margin: 0;
        font-size: 1.6em;
        color:${themeConsts.titlesDarkGrey};
        padding: 20px 0 12px 15px;
        border-bottom: 1px solid #e6e6e6;
    }

    form{
        margin-top:29px;

        .inputs-grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            width: 90%;
            margin: 0 auto;
        }

        fieldset{
            padding: 0;
            margin: 0;
            border: none;
        }

        .observations-input{
            width: 94%;
            margin: 14px auto 0 auto;
        }

        legend{
            font-size:1.5em;
            color:${themeConsts.titlesDarkGrey};
        }

        textarea{
            width: 100%;
            border: none;
            box-shadow: 0px 1px 6px rgba(0,0,0,.16);
            border-radius: 10px;
            height:90px;
            padding: 10px 14px;
            box-sizing: border-box;
            margin-top: 11px;
        }

        .costs-form-buttons{
            margin-top: 30px;
        }

        .container {
            display: block;
            position: relative;
            padding-left: 25px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 1.5em;
            color:${themeConsts.textDarkGrey};
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            }

            .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
            }

            .checkmark {
            position: absolute;
            top: 0px;
            left: 0;
            height: 12px;
            width: 12px;
            background-color: transparent;
            border: 2px solid ${themeConsts.secondaryBlue};
            border-radius: 50%;
            }

            .container:hover input ~ .checkmark {
            background-color: ${themeConsts.secondaryBlue};
            }

            .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            }

            .container input:checked ~ .checkmark:after {
            display: block;
            }

            .container .checkmark:after {
                left: 0;
                right: 0;
                margin: auto;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                background-color: ${themeConsts.secondaryBlue};
                border-radius: 50%;
            }

    }
`