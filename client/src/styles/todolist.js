import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const TodoListDashboardDiv = styled.div`

    .todo-scroll-container{
        overflow: scroll;
        height:216px;
        margin-top:25px;

        .single-todo{
            margin-top:6px;
            margin-right:10px;
            background-color: #fff;
            border-bottom: 1px solid #afacd1;
        }
        .single-todo:first-of-type{
            margin-top:0
        }
        .single-todo:first-of-type .todo-status{
            margin-top:0
        }
        .single-todo:first-of-type .todo-text{
            padding-top:0
        }
    }

    .todo-scroll-container::-webkit-scrollbar {
        width: 0.8em;
    }
    
    /* Track */
    .todo-scroll-container::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    
    /* Handle */
    .todo-scroll-container::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #DFE4F8; 
    }
    .todo-scroll-container::-webkit-scrollbar-thumb:window-inactive {
        background:#DFE4F8; 
    }
    .todo-textarea{
            
            textarea{
                width: 90%;
                margin-top: 17px;
                border: none;
                text-indent: 20px;
                color:${themeConsts.secondaryBlue};
                resize:none;
            }
            textarea::placeholder{
                color:${themeConsts.secondaryBlue};
            }
        }

        .todo-add{
            position:absolute;
            right: 5px;
            bottom: 3px;
            cursor:pointer;

            svg{
                font-size:2.5em;
                color:${themeConsts.primaryBlue}
            }

            svg.todo-send-icon{
                font-size:2.2em;
                stroke-width:1.5;
            }
        }
`


export const TodoListCompleteDiv = styled.div`
    position:fixed !important;
    top:50%;
    left:0;
    right:0;
    margin:auto;
    z-index:111;
    width:40%;
    height:unset !important;
    transform: translateY(-50%);
    box-shadow: none !important;
    min-height: 225px !important;
    padding-right:10px !important;

    .todo-close{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor:pointer;
        z-index: 1;

        svg{
            font-size:2.5em;
            color:${themeConsts.textLightGrey}
        }
    }

    .todo-content-container{
        height:100%;
        max-height: 80vh;
        overflow: hidden;
        overflow-y: scroll;

        .todo-scroll-container{
            overflow: auto;
            height: 88%;
            margin-top: 17px;

            .single-todo{
                margin-top:10px;
                margin-right:10px;
                background-color: #fff;
                border-bottom: 1px solid #afacd1;
            }
            .single-todo:first-of-type{
                margin-top:0
            }
            .single-todo:first-of-type .todo-status{
                margin-top:0
            }
            .single-todo:first-of-type .todo-text{
                padding-top:0
            }
        }

        .todo-scroll-container::-webkit-scrollbar {
            width: 0.8em;
        }
        
        /* Track */
        .todo-scroll-container::-webkit-scrollbar-track {
            -webkit-border-radius: 10px;
            border-radius: 10px;
        }
        
        /* Handle */
        .todo-scroll-container::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: #DFE4F8; 
        }
        .todo-scroll-container::-webkit-scrollbar-thumb:window-inactive {
            background:#DFE4F8; 
        }

        .todo-textarea{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            text-align: center;

            textarea{
                width: 90%;
                margin-top: 17px;
                border: none;
                text-indent: 20px;
                color:${themeConsts.secondaryBlue};
                resize:none;
            }
            textarea::placeholder{
                color:${themeConsts.secondaryBlue};
            }
        }

        .todo-add{
            position:absolute;
            right: 5px;
            bottom: 3px;
            cursor:pointer;

            svg{
                font-size:2.5em;
                color:${themeConsts.primaryBlue}
            }

            svg.todo-send-icon{
                font-size:2.2em;
                stroke-width:1.5;
            }
        }
    }
    

`