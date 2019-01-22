import styled from 'styled-components'

export const DashboardContainer = styled.div`
    width:86%;
    min-height:100vh;
    background-color:#f7f7f7;
    
    .widgets-grid{
        display:grid;
        grid-template-columns: 49% 49%;
        grid-gap: 2%;

        .grid-widget{
            overflow:hidden;

            .widget-title{
                padding-left:20px;
            }
        }
    }
`