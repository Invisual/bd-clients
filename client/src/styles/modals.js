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
        top: 20px;
        right: 20px;
        cursor: pointer;
        z-index: 1;

        svg{
            font-size: 2.5em;
            color: ${themeConsts.textLightGrey};
        }
    }

    h2{
        text-align: center;
        margin: 25px 0;
        font-size: 1.6em;
        color:${themeConsts.titlesDarkGrey};
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
            background: ${themeConsts.tableColor1};
            border-bottom: 2px solid ${themeConsts.white};
            border-radius: 4px;

            h5{
                text-align:center;
                color:${themeConsts.textDarkGrey};
                font-size: 1.34em;
            }
        }
        .costs-list-row{
            display:grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr .5fr;
            padding: 6px 0;
            border-bottom: 2px solid ${themeConsts.white};
            border-radius: 4px;

            p{
                text-align:center;
                color:${themeConsts.textLightGrey};
                font-size: 1.1em;
            }
        }
        .costs-list-row:nth-child(odd){
            background-color:${themeConsts.tableColor1}
        }
        .costs-list-row:nth-child(even){
            background-color:${themeConsts.tableColor2}
        }
    }
`
