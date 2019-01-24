import styled from 'styled-components'

export const DashboardContainer = styled.div`
    width:86%;
    min-height:100vh;
    background-color:#f7f7f7;
    
    .widgets-grid{
        display:grid;
        grid-template-columns: 69% 29%;
        grid-gap: 2%;
        width: 92%;
        margin: 40px auto 0 auto;

        .grid-widget{
            /*overflow:hidden;*/
        }
    }
`