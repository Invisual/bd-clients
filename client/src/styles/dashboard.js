import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const DashboardContainer = styled.div`
    width:95%;
    background-color: #f7f7f7;
    overflow-y: scroll;
    transition:all .5s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  .widgets-grid {
    display: grid;
    grid-template-columns: 69% 29%;
    grid-gap: 2%;
    width: 95%;
    height: 90%;

    .grid-widget {
      /*overflow:hidden;*/
    }
    
    .project-labels{
      display: grid;
      grid-template-columns: 4% 57% 8% 8% 23%;
      padding: 0 20px;
      margin-top: 0;
      font-size: 1em;
      font-weight:500;
      color:${themeConsts.textLightGrey};
      span{
        margin:auto
      }
    }
    
    .user-labels{
      display: grid;
      grid-template-columns: 10% 60% 10% 10% 10%;
      padding: 0 20px;

      span{
        text-align:center;
        font-size: 1em;
        font-weight:500;
        color:${themeConsts.textLightGrey};
      }
    }

    .user-areas-container{
      height: 72vh;
      overflow-y: scroll;
      padding: 3px 8px;
    }
  }
`;
