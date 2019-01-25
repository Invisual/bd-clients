import styled from 'styled-components'

export const SingleTaskDiv = styled.div`
    display: grid;
    grid-template-columns: 80% 5% 15%;
    padding-left: 20px;
    background-color: #efeeee;
    margin-top: 15px;

    p{
        margin:0;
        padding:18px 0;
    }

    .task-watch{
        padding:18px 0;
    }

    .task-state{
        padding:18px 0;
        text-align:center;
        background-color:${props => props.taskColor};
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
        top: 2px;
        
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
        top: 2px;
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
`