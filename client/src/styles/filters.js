import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const FiltersDiv = styled.div`
    padding:25px;

    .grid50-50{
        display: grid;
        grid-template-columns: 48% 48%;
        grid-gap: 4%;
    }


    .filters-grid{

        fieldset{
            border: none;
            padding: 0;
            margin: 0;
            margin-bottom: 25px;

            legend{
                color: #4b4b4b;
                font-weight: 500;
                font-size: 1.4em;
                padding: 0;
                margin-bottom: 8px;
            }
            select, .categories-card, .users-card{
                width: 100%;
                border: none;
                box-shadow: 0px 1px 6px rgba(0,0,0,.16);
                border-radius: 10px;
                text-indent: 12px;
            }
            select, .categories-card{
                height:50px;
            }
            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background: url(/img/seta-circulo.svg) 94% / 15% no-repeat #fff;
                background-size: 20px;
                cursor: pointer;
            }
            .react-date-picker{
                height: 50px;
                box-shadow: 0px 1px 6px rgba(0,0,0,.16);
                border-radius: 10px;
                width: 100%;

                .react-date-picker__wrapper {
                    width: 100%;
                    border: none;
                    padding-left: 12px;

                    svg{
                        color: #7f9aff;
                        font-size: 1.5em;
                        stroke-width: 1.8;
                        position: relative;
                        right: 8px;
                    }
                }
                .react-date-picker__clear-button{
                    display:none;
                }
            }
            .range-input-container{
                height: 50px;
                display: flex;
                align-items: center;
                position: relative;

                .range-input{
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 10px;
                    background: ${themeConsts.lightGreen};
                    outline: none;
                    border-radius: 50px;
                }
                .range-input::-webkit-slider-thumb {
                    -webkit-appearance: none; /* Override default look */
                    appearance: none;
                    width: 25px; /* Set a specific slider handle width */
                    height: 25px; /* Slider handle height */
                    background: ${themeConsts.green};
                    border:2px solid #fff;
                    border-radius:50%;
                    cursor: pointer; /* Cursor on hover */
                }

                .range-input::-moz-range-thumb {
                    width: 25px;
                    height: 25px;
                    background: ${themeConsts.green};
                    border:2px solid #fff;
                    border-radius:50%;
                    cursor: pointer;
                }
                .range-value{
                    position:absolute;
                    bottom:0;
                    right:0%;
                }
            }
            .categories-flex{
                padding: 0 15px;
                display: flex;
                justify-content: space-between;
                height: 100%;
                align-items: center;
            }
            .users-grid{
                padding: 15px;
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;
                grid-row-gap: 10px;
            }
            .checkmark-container{

                .label-container{
                    display: block;
                    position: relative;
                    padding-left: 15px;
                    cursor: pointer;
                    font-size: 1.3em;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                input{
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark{
                    position: absolute;
                    top: 50%;
                    bottom: 0;
                    left: 0;
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    border: 2px solid ${themeConsts.secondaryBlue};
                    background-color: transparent;
                    -webkit-transform: translateY(-50%);
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
                .label-container:hover input ~ .checkmark, .label-container input:checked ~ .checkmark {
                    background-color: ${themeConsts.secondaryBlue};
                }
            }
        }
    }

    .filters-buttons{
        margin-top: 50px;
        text-align: center;

        .btn{
            margin: 0 10px;
        }
    }
`