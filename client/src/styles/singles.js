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