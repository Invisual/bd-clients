import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const CalendarDiv = styled.div`


.rbc-calendar{
    margin-top: 20px;
    
    .rbc-btn-group {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        align-items: center;

        .rbc-toolbar-label{
        font-weight: 600;
        color:${themeConsts.textDarkGrey};
        text-transform:uppercase;
        letter-spacing: .23em;
        font-size: .9em;
        font-weight: 500;
        }

        button{
        cursor:pointer;
        border: none;

        img{
            width:15px;
        }
        }
        
        button:hover, button:active, button:focus{
        background-color: transparent;
        box-shadow:none;
        outline: none;
        }

        button:first-child{
        display:none;
        }
    }

    .rbc-header, .rbc-month-view, .rbc-day-bg, .rbc-month-row{
        border:none;
    }

    .rbc-header{
        font-size: 1.4em;
        font-weight: 700;
        color:${themeConsts.secondaryBlue};
    }

    .rbc-month-header {
        margin-bottom: 15px;
    }

    .rbc-month-row {
        justify-content: center;
        max-height:40px;
    }

    .rbc-today {
        background-color: transparent;
    }

    .rbc-date-cell{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right:0;
    }

    .rbc-date-cell div{
        display: flex;
        align-items: center;
        justify-content: center;
        width:30px;
        height:30px;
        font-size: 1.4em;
        font-weight: 600;
        color:${themeConsts.textDarkerGrey};
    }

    .rbc-off-range div{
        color:${themeConsts.textLighterGrey};
    }

    .rbc-date-cell div.has-meeting{
        background-color: ${themeConsts.orange};
        color: ${themeConsts.white};
        border-radius: 50%;
        cursor:pointer;
    }

    .rbc-date-cell div.has-vacation{
        background-color: ${themeConsts.thirdBlue};
        color: ${themeConsts.white};
        border-radius: 50%;
        cursor:pointer;
    }

    .rbc-date-cell div.has-out-meeting{
        background-color: ${themeConsts.thirdBlue};
        cursor:pointer;
    }

    .rbc-date-cell div.has-task-deadline{
        background-color: ${themeConsts.red};
        color: ${themeConsts.white};
        border-radius: 50%;
        cursor:pointer;
    }

    .rbc-off-range-bg {
        background: transparent;
    }

    .rbc-row-segment{
        position:relative;
    }

    .rbc-event{
        display:none;
    }

    .rbc-show-more{
        display:none;
    }
}
`