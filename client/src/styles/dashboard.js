import styled from 'styled-components';

export const DashboardContainer = styled.div`
  width: 86%;
  min-height: 100vh;
  background-color: #f7f7f7;
  overflow-y: scroll;

  .widgets-grid {
    display: grid;
    grid-template-columns: 69% 29%;
    grid-gap: 2%;
    width: 92%;
    margin: 40px auto 0 auto;

    .grid-widget {
      /*overflow:hidden;*/
    }
    .widget-title {
      margin-top: 0;
      color: #4b4b4b;
      font-weight:600;
    }
    .project-labels{
      display: grid;
      grid-template-columns: 4% 57% 8% 8% 23%;
      padding: 0 20px;
      margin-top: 0;
      font-size: 10px;
      font-weight:500;
      color:#AAAAAA;
      span{
        margin:auto
      }
    }

  }
`;
