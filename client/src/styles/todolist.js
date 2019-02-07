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
`


export const TodoListCompleteDiv = styled.div`
    position:absolute !important;
    top:50%;
    left:0;
    right:0;
    margin:auto;
    z-index:111;
    width:40%;
    height:70vh !important;
    transform: translateY(-50%);
    box-shadow: none !important;

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
        position:relative;

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
            right:-2px;
            bottom:-11px;
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