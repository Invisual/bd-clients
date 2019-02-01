import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const AllTasksContainer = styled.div`
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
      padding: 15px;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
    }
    .tasks-list {
      border-right: 1px solid #e6e6e6;
      padding: 0 15px 15px 15px;
    }
    .tasks-options {
      border-bottom: 1px solid #e6e6e6;
    }
    .tasks-detail {
    }
  }
  .cards-container {
    padding: 0;
  }
`;

export const TaskDetails = styled.div`
  color: #797979;

  .task-header {
    margin: 30px 30px 0px 30px;
    border-bottom: 1px solid #e6e6e6;
    .task-title {
      margin: 0;
    }
    .task-date {
      margin-bottom: 10px;
    }
    .task-infos {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 5px;

      span {
        padding-right: 15px;
        .task-info-icon {
          color: #7f9aff;
        }
      }
    }
  }
  .task-descr {
    margin-right: 30px;
    margin-left: 30px;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0;
  }
  .task-extras {
    display:flex;
    justify-content:space-evenly;
    margin-right: 30px;
    margin-left: 30px;
    padding: 15px 0;
   
    .task-hour-container{
      width:50%;
      border-right:1px solid #e6e6e6;
    .task-hour-counter{
      display: flex;
      position: relative;
      justify-content: center;
     svg {
      height:10vh
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
    }
   }
   .task-comments{
    width:50%;
    margin: 0 30px;
    .task-comment-title{
      margin-top:0
    }
   }
  }
  .task-billing-section {
    display: grid;
    grid-template-columns: 10% 90%;
    color: ${themeConsts.textDarkGrey};
    grid-row-gap: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
    margin-left: 30px;
    border-top: 1px solid #e6e6e6;
    padding: 15px 0;
    .billing-icon {
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:2em;
    }
    .billing-title h4{
      margin:0
    }
  }
  .task-add-comment{
    border-top:1px solid #e6e6e6;
    display: grid;
    grid-template-columns: 90% 10%;
    padding:30px;

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
        color: #AABCFF;
      }
      textarea::placeholder{
        color: #AABCFF
      }
    } 
    
    .comment-submit{
      display:flex;
      justify-content:center;
      align-items:flex-start;
      font-size:2.5em
    }
   }

`;
