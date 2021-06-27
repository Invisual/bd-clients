import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const RegulationDiv = styled.div`
    margin-top:100px;
    padding:20px;
    max-height: 80vh;
    overflow: scroll;
    width: 95%;

    .content-title{
        text-align:center;
        width: 80%;
        margin: 0 auto;

        h2{
            color:${themeConsts.primaryBlue};
            font-size: 2em;
        }

        p{
            color:${themeConsts.textDarkGrey};
            font-size: 1.3em;
            line-height: 1.6em;
        }
    }

    .content-rules{
        width: 80%;
        margin: 50px auto 0 auto;

        .single-rule{
            margin-bottom:30px;

            h3{
                color:${themeConsts.titlesDarkGrey};
                margin-bottom: 10px;
                font-size: 1.4em;
            }

            p{
                color:${themeConsts.textDarkGrey};
                white-space: pre-wrap;
                font-size: 1.1em;
                font-size: 1.2em;
                line-height: 1.5em;
            }
        }
    }
`