import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const AllTasksDiv = styled.div`
  width: 86%;
  min-height: 100vh;
  background-color: #f7f7f7;
  overflow-y: scroll;
  transition: all 0.5s ease;
  margin-top: 45px;

  .widgets-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 92%;
    margin: 40px auto 0 auto;

    .grid-widget {
      /*overflow:hidden;*/
    }
    .widget-title {
      margin-top: 0;
      margin-bottom: 0;
      color: #4b4b4b;
      font-weight: 600;
    }

    .tasks-title {
      margin: 0;
      padding: 20px 22px 15px 22px;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        color: ${themeConsts.secondaryBlue};
        font-size: 2em;
      }
    }
    .tasks-list {
      border-right: 1px solid #e6e6e6;
      padding: 0 15px 15px 15px;
      overflow: scroll;
      position:relative;
    }
    .tasks-options {
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      svg {
        color: ${themeConsts.secondaryBlue};
        font-size: 2em;
        padding: 0 15px;
      }
      .account-avatar {
        display: flex;
        justify-content: flex-end;
        margin: 0;
        padding: 10px 15px;
      }
      img {
        border: 2px solid #0036ff;
      }
    }
    .tasks-detail {
      position:relative
    }
  }
  .cards-container {
    padding: 0;
  }
`;

export const TaskDetailsDiv = styled.div`
  color: #797979;
  
  .task-details-grid{
    display:grid;
    grid-template-columns: 7% 93%;

      .task-icon{
        text-align:center;
        margin-top:28px;

        svg{
          font-size:2.2em;
          color:${themeConsts.primaryBlue};
        }
      }

      .task-header {
        margin: 30px 30px 0 0;
        border-bottom: 1px solid #e6e6e6;
        .task-title {
          margin: 0;
          font-size: 1.6em;
          font-weight: 600;
          color:${themeConsts.titlesDarkGrey}
        }
        .task-date {
          margin-top: 5px;

          svg{
            font-size: 1.1em;
            color:${themeConsts.textDarkGrey};
            position: relative;
            top: 1px;
            stroke-width: 2.5;
          }

          span{
            color:${themeConsts.textDarkGrey};
            padding-left: 7px;
          }
        }
      
      }

      .task-infos {
        display: flex;
        justify-content: flex-start;
        padding-bottom: 5px;
        margin-top: 15px;

        span {
          padding-right: 25px;
          font-size: 1.1em;

          .task-info-icon {
            color: ${themeConsts.secondaryBlue};
            font-size: 1.5em;
            stroke-width: 2.5;
            padding-right: 5px;
            position: relative;
            top: 2px;
          }
        }
      }

      .task-descr {
        margin-right: 30px;
        border-bottom: 1px solid #e6e6e6;
        padding: 20px 0 20px 0;

        h4{
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin:0;
          margin-bottom: 10px;
        }

        .task-descr-text{
          font-size: 1.1em;
          line-height: 1.6em;
        }
      }

      .task-extras {
        display:flex;
        justify-content:space-evenly;
        margin-right: 30px;
        padding: 30px 0;
      
      .task-hour-container{
        width:50%;
        border-right:1px solid #e6e6e6;
          
        .task-hour-counter{
          display: flex;
          position: relative;
          justify-content: center;

          svg {
            height:13vh
          }
        }

        .task-hour-counter::after{
          content:'${props => props.hours}';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          text-align: center;
          color: ${themeConsts.primaryBlue};
          font-weight: 600;
          font-size:1.6em;
        }
        .see-hours{
          color: #7f9aff;
          margin-top: 13px;
          font-weight: 600;
          position: relative;
          top: 4px;
          text-align: center;

          .arrow-hours {
            position: relative;
            top: 3px;
            padding:0 5px;
          }
        }
      }

      .task-comments{
        width:50%;
        margin: 0 30px;
        .task-comment-title{
          margin-top:0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .comment-status{
          svg{
            position: relative;
            top: 1px;
          }
        }
        .single-comment-details{
          font-size: .9em;
          margin-top: 2px;
        }
      }

      }
      .task-billing-section {
        display: grid;
        grid-template-columns: 6% 94%;
        color: ${themeConsts.textDarkGrey};
        grid-row-gap: 15px;
        margin-right: 30px;
        border-top: 1px solid #e6e6e6;
        padding: 25px 0;
        .billing-icon {
          display:flex;
          justify-content:flex-start;
          align-items:center;
          font-size:2em;
        }
        .billing-title h4{
          margin:0;
        }
        .billing-descr{
          margin-top: 1px;
        }
      }
  }
  

  .task-add-comment{
    border-top:1px solid #e6e6e6;
    display: grid;
    grid-template-columns: 7% 83% 10%;
    padding:25px 0;

    .comment-input{
      display:flex;
      justify-content:center;
      align-items:center;
     textarea {
        width:100%;
        resize: none;
        overflow:auto;
        outline:none;
        border: 0;
        font: inherit;
        color: ${themeConsts.secondaryBlue};
        position: relative;
        top: 6px;
        font-size: 1.1em;
      }
      textarea::placeholder{
        color: #aabcff;
      }
    } 
    
    .comment-submit{
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:2.5em;

      svg{
        color: ${themeConsts.secondaryBlue};
      }
    }
   }

`;
