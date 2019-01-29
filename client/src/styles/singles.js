import styled from 'styled-components'

export const SingleTaskDiv = styled.div`
    display: grid;
    grid-template-columns: 80% 5% 5% 10%;
    padding-left: 20px;
    margin-top: 15px;
    color:#797979;

    .project-title{
        margin:0;
        padding:18px 0;
        position: relative;
        top: 2px;
    }
    .task-watch{
        padding:18px 0;
    }

    .task-state{
        color: #fff;
        border-radius: 10px;
        font-size: 18px;
        font-weight:600;
        padding:18px 0;
        text-align:center;
        background-color:${props => props.taskColor};
    }
    svg{
        font-size:2em;
    }
`

export const SingleProjectDiv = styled.div`
    display: grid;
    grid-template-columns: 4% 60% 8% 8% 20%;
    color:#797979;
    

    .project-title{
        margin:0;
        padding:18px 0;
        position: relative;
        top: 8px;
        
        .title-divider {
            padding-right: 5px;
            border-right: 1px solid #afacd1; /* Line color */
        }
        .project-client{
            padding-left: 7px;
            color:#7f9aff
        }
    }


    .project-status,
    .project-total-tasks,
    .project-concluded-tasks{
        padding:18px 0;
        position: relative;
        top: 8px;
        margin: 0;
    }
    .project-status{
        margin:auto 0;
        position: relative;
        top: 4px;
    }
    .task-progress{
        padding:18px 0;
        position: relative;
        top: 4px;
    }

    svg{
        font-size:2em;
    }
`