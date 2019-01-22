import styled from 'styled-components'

export const DashboardContainer = styled.div`
    width:86%;
    min-height:100vh;
    background-color:#f7f7f7;
    
    .widgets-grid{
        display:grid;
        grid-template-columns: 50% 50%;
        grid-gap: 20px;

        .grid-widget{
            overflow:hidden;

            .widget-title{
                padding-left:20px;
            }
        }
    }
`