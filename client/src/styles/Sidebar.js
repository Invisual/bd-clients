import styled from 'styled-components'

export const SidebarDiv = styled.div`
    width:14%;
    height:100vh;
    background-color:#666;
    position:relative;

    .logo{
        text-align: center;
        margin-top: 50px;

        img{
            max-width: 80%;
        }
    }

    .navigation{
        margin-top:100px;

        ul{
            padding-inline-start: 25px;
            list-style-type: none;
            padding-bottom: 15px;

            li{
                padding-bottom:15px;
            }
        }
    }

    .footer{
        position:absolute;
        bottom:0;
    }
 
`