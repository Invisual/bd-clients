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
      overflow-y: scroll;
      position: relative;
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
        border: 2px solid ${themeConsts.primaryBlue};
      }
    }
    .tasks-detail {
      position: relative;
    }
  }
  .cards-container {
    padding: 0;
  }
`;

export const AllProjectsDiv = styled.div`
  width: 86%;
  min-height: 100vh;
  background-color: #f7f7f7;
  overflow-y: scroll;
  transition: all 0.5s ease;
  margin-top: 45px;

  .widgets-grid {
    display: grid;
    grid-template-columns: 25% 75%;
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
      height: 79vh;
      overflow-y: scroll;
      position: relative;
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
        border: 2px solid ${themeConsts.primaryBlue};
      }
    }
    .tasks-detail {
      position: relative;
    }
  }

  .meetings-grid{
    grid-template-columns: 60% 40%;

    .meetings-calendar{

      .cards-container{
        box-shadow: none;
        border: none;
        padding: 10px 15px;
        height: 350px;
        border-radius: 0;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }

  .cards-container {
    padding: 0;
  }

  .active-day-meetings-container{
    padding:0 30px;

    .day{
      margin: 20px 0;
      
      h5{
        color:${themeConsts.primaryBlue};
        margin:0;
        font-size: 2em;
        font-weight: 500;
      }
      span{
        color:${themeConsts.primaryBlue};
        text-transform: lowercase;
        font-size: 1.3em;
      }
    }
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

export const ProjectDetailsDiv = styled.div`
  color: #797979;
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: space-between;

  .project-details-grid {
    display: grid;
    grid-template-columns: 7% 93%;

    .project-icon {
      text-align: center;
      margin-top: 28px;

      svg {
        font-size: 2.2em;
        color: ${themeConsts.primaryBlue};
      }
    }

    .project-header {
      margin: 30px 30px 0 0;
      border-bottom: 1px solid #e6e6e6;
      .project-title {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
        color: ${themeConsts.titlesDarkGrey};
      }
      .project-date {
        margin-top: 5px;

        svg {
          font-size: 1.1em;
          color: ${themeConsts.textDarkGrey};
          position: relative;
          top: 1px;
          stroke-width: 2.5;
        }

        span {
          color: ${themeConsts.textDarkGrey};
          padding-left: 7px;
          margin-right: 15px;
          .name-client {
            color: #7f9aff;
            font-size: 1.2em;
            font-weight: 700;
          }
        }
      }
    }

    .project-infos {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 5px;
      margin-top: 15px;

      .project-tab {
        padding-right: 45px;
        font-size: 1.1em;
        font-weight:600;
        cursor: pointer
      }
      .project-tab:hover {
        color:${themeConsts.secondaryBlue};
        
      }
      .active-tab {
          color: ${themeConsts.primaryBlue};
        }

        .project-info-icon {
          color: ${themeConsts.secondaryBlue};
          font-size: 1.5em;
          stroke-width: 2.5;
          padding-right: 5px;
          position: relative;
          top: 2px;
        }
      }
    
    .project-task-tab {
      margin-right: 30px;
      padding: 20px 0 10px 0;
      display: grid;
      grid-template-columns: 32% 32% 32%;
      grid-column-gap:2%;
      span {
        font-size:1.2em;
        font-weight:500;
        color: ${themeConsts.activeBlue}
      }
      img {
            margin-top: 7px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${themeConsts.bordersGrey};
            margin-right: 10px;
          }
    }
    .project-comment-tab {
      margin-right: 30px;
      padding: 20px 0 10px 0;
      span {
        font-size: 1.2em;
        font-weight: 500;
        color: ${themeConsts.activeBlue};
      }
      .task-comments {
        margin: 0 30px;
        .task-comment-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .comment-status {
          svg {
            position: relative;
            top: 1px;
          }
        }
        .single-comment-details {
          font-size: 0.9em;
          margin-top: 2px;
        }
      }
    }
    .project-descr {
      margin-right: 30px;
      border-bottom: 1px solid #e6e6e6;
      padding: 20px 0 10px 0;

      h4 {
        font-weight: 600;
        font-size: 1.1em;
        color: ${themeConsts.titlesDarkGrey};
        margin: 0;
        margin-bottom: 10px;
      }

      .project-descr-text {
        font-size: 1.1em;
        line-height: 1.6em;
        margin: 0;
        margin-bottom: 10px;
      }

      .project-descr-cat {
        display: flex;

        .project-category {
          margin-right: 5px;
          padding: 3px 10px;
          color: white;
          background-color: ${themeConsts.secondaryBlue};
          border-radius: 2em;
        }
      }
    }

    .project-extras {
      display: flex;
      justify-content: space-evenly;
      margin-right: 30px;
      padding: 30px 0;

      .project-members-infos {
        width: 50%;
        border-right: 1px solid #e6e6e6;
        .project-members {
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin-bottom: 10px;
          img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${themeConsts.primaryBlue};
            margin-right: 10px;
          }
          .project-members-title {
            margin-bottom: 10px;
          }
        }
        .project-account-deadline {
          display: flex;
          justify-content: space-between;
          margin-right: 20px;
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          .project-account-title,
          .project-deadline-title {
            margin-bottom: 10px;
          }
          span {
            color: ${themeConsts.secondaryBlue};
            font-size: 1.6em;
            font-weight: 500;
          }

          img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${themeConsts.primaryBlue};
          }
        }
      }
      .project-status {
        width: 50%;
        margin: 0 30px;
        .project-status-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin-bottom: 10px;
        }
        .project-tasks-progress {
          display: flex;
          justify-content: space-evenly;
          margin: 15px 0;
          .project-tasks {
            display: flex;
            flex-direction: column;
            align-items: center;
            .label {
              color: ${themeConsts.textLightGrey};
              font-size: 1.2em;
            }
            .label-value {
              padding-top: 3px;
              font-size: 1.6em;
              font-weight: 500;
            }
          }
        }
      }
      .project-comments {
        width: 50%;
        margin: 0 30px;
        .project-comment-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .comment-status {
          svg {
            position: relative;
            top: 1px;
          }
        }
        .single-comment-details {
          font-size: 0.9em;
          margin-top: 2px;
        }
      }
    }
    .project-billing-section {
      display: grid;
      grid-template-columns: 6% 94%;
      color: ${themeConsts.textDarkGrey};
      grid-row-gap: 15px;
      margin-right: 30px;
      border-top: 1px solid #e6e6e6;
      padding: 25px 0;
      .billing-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 2em;
      }
      .billing-title h4 {
        margin: 0;
      }
      .billing-descr {
        margin-top: 1px;
      }
    }
  }

  .project-add-comment {
    border-top: 1px solid #e6e6e6;
    display: grid;
    grid-template-columns: 7% 83% 10%;
    padding: 25px 0;

    .comment-input {
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        width: 100%;
        resize: none;
        overflow: auto;
        outline: none;
        border: 0;
        font: inherit;
        color: ${themeConsts.secondaryBlue};
        position: relative;
        top: 6px;
        font-size: 1.1em;
      }
      textarea::placeholder {
        color: #aabcff;
      }
    }

    .comment-submit {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5em;

      svg {
        color: ${themeConsts.secondaryBlue};
      }
    }
  }
`;


export const AllClientsDiv = styled.div`
  width: 86%;
  min-height: 100vh;
  background-color: #f7f7f7;
  overflow-y: scroll;
  transition: all 0.5s ease;
  margin-top: 45px;

  .widgets-grid {
    display: grid;
    grid-template-columns: 40% 60%;
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
      height: 79vh;
      overflow-y: scroll;
      position: relative;
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
        border: 2px solid ${themeConsts.primaryBlue};
      }
    }
    .tasks-detail {
      position: relative;
    }
  }
  .cards-container {
    padding: 0;
  }
`;

export const ClientDetailsDiv = styled.div`
  color: #797979;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .project-details-grid {
    display: grid;
    grid-template-columns: 7% 93%;

    .project-icon {
      text-align: center;
      margin-top: 28px;

      svg {
        font-size: 2.2em;
        color: ${themeConsts.primaryBlue};
      }
    }

    .project-header {
      margin: 30px 30px 0 0;
      border-bottom: 1px solid #e6e6e6;
      .project-title {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
        color: ${themeConsts.titlesDarkGrey};
      }
      .project-date {
        margin-top: 5px;

        svg {
          font-size: 1.1em;
          color: ${themeConsts.textDarkGrey};
          position: relative;
          top: 1px;
          stroke-width: 2.5;
        }

        span {
          color: ${themeConsts.textDarkGrey};
          padding-left: 7px;
          margin-right: 15px;
          .name-client {
            color: #7f9aff;
            font-size: 1.2em;
            font-weight: 700;
          }
        }
      }
    }

    .project-infos {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 5px;
      margin-top: 15px;

      .project-tab {
        padding-right: 45px;
        font-size: 1.1em;
        font-weight: 600;
        cursor: pointer;
      }
      .project-tab:hover {
        color: ${themeConsts.secondaryBlue};
      }
      .active-tab {
        color: ${themeConsts.primaryBlue};
      }

      .project-info-icon {
        color: ${themeConsts.secondaryBlue};
        font-size: 1.5em;
        stroke-width: 2.5;
        padding-right: 5px;
        position: relative;
        top: 2px;
      }
    }

    .project-task-tab {
      margin-right: 30px;
      padding: 20px 0 10px 0;
      display: grid;
      grid-template-columns: 32% 32% 32%;
      grid-column-gap: 2%;
      span {
        font-size: 1.2em;
        font-weight: 500;
        color: ${themeConsts.activeBlue};
      }
      img {
        margin-top: 7px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${themeConsts.bordersGrey};
        margin-right: 10px;
      }
    }
    .project-comment-tab {
      margin-right: 30px;
      padding: 20px 0 10px 0;
      span {
        font-size: 1.2em;
        font-weight: 500;
        color: ${themeConsts.activeBlue};
      }
      .task-comments {
        margin: 0 30px;
        .task-comment-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .comment-status {
          svg {
            position: relative;
            top: 1px;
          }
        }
        .single-comment-details {
          font-size: 0.9em;
          margin-top: 2px;
        }
      }
    }

    .client-content {
      margin-right: 30px;
      padding: 20px 0 10px 0;
      .client-info-grid50 {
        display: grid;
        grid-template-columns: 50% 50%;
        border-bottom: 1px solid #e6e6e6;
        padding: 10px 10px 10px 0;
        margin-bottom: 10px;

        .client-info {
          h4 {
            font-weight: 600;
            font-size: 1.1em;
            color: ${themeConsts.titlesDarkGrey};
            margin: 0;
            margin-bottom: 10px;
          }
        }
      }
      .client-info-grid100 {
        display: grid;
        grid-template-columns: 100%;
        border-bottom: 1px solid #e6e6e6;
        padding: 10px 10px 10px 0;
        margin-bottom: 10px;
      }
      .client-info-grid50,
      .client-info-grid100 {
        .client-info {
          h4 {
            font-weight: 600;
            font-size: 1.1em;
            color: ${themeConsts.titlesDarkGrey};
            margin: 0;
            margin-bottom: 10px;
          }
        }
      }

      .project-descr-text {
        font-size: 1.1em;
        line-height: 1.6em;
        margin: 0;
        margin-bottom: 10px;
      }

      .project-descr-cat {
        display: flex;

        .project-category {
          margin-right: 5px;
          padding: 3px 10px;
          color: white;
          background-color: ${themeConsts.secondaryBlue};
          border-radius: 2em;
        }
      }
    }

    .project-extras {
      display: flex;
      justify-content: space-evenly;
      margin-right: 30px;
      padding: 30px 0;

      .project-members-infos {
        width: 50%;
        border-right: 1px solid #e6e6e6;
        .project-members {
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin-bottom: 10px;
          img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${themeConsts.primaryBlue};
            margin-right: 10px;
          }
          .project-members-title {
            margin-bottom: 10px;
          }
        }
        .project-account-deadline {
          display: flex;
          justify-content: space-between;
          margin-right: 20px;
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          .project-account-title,
          .project-deadline-title {
            margin-bottom: 10px;
          }
          span {
            color: ${themeConsts.secondaryBlue};
            font-size: 1.6em;
            font-weight: 500;
          }

          img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${themeConsts.primaryBlue};
          }
        }
      }
      .project-status {
        width: 50%;
        margin: 0 30px;
        .project-status-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin-bottom: 10px;
        }
        .project-tasks-progress {
          display: flex;
          justify-content: space-evenly;
          margin: 15px 0;
          .project-tasks {
            display: flex;
            flex-direction: column;
            align-items: center;
            .label {
              color: ${themeConsts.textLightGrey};
              font-size: 1.2em;
            }
            .label-value {
              padding-top: 3px;
              font-size: 1.6em;
              font-weight: 500;
            }
          }
        }
      }
      .project-comments {
        width: 50%;
        margin: 0 30px;
        .project-comment-title {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .comment-status {
          svg {
            position: relative;
            top: 1px;
          }
        }
        .single-comment-details {
          font-size: 0.9em;
          margin-top: 2px;
        }
      }
    }
    .project-billing-section {
      display: grid;
      grid-template-columns: 6% 94%;
      color: ${themeConsts.textDarkGrey};
      grid-row-gap: 15px;
      margin-right: 30px;
      border-top: 1px solid #e6e6e6;
      padding: 25px 0;
      .billing-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 2em;
      }
      .billing-title h4 {
        margin: 0;
      }
      .billing-descr {
        margin-top: 1px;
      }
    }
  }

  .project-add-comment {
    border-top: 1px solid #e6e6e6;
    display: grid;
    grid-template-columns: 7% 83% 10%;
    padding: 25px 0;

    .comment-input {
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        width: 100%;
        resize: none;
        overflow: auto;
        outline: none;
        border: 0;
        font: inherit;
        color: ${themeConsts.secondaryBlue};
        position: relative;
        top: 6px;
        font-size: 1.1em;
      }
      textarea::placeholder {
        color: #aabcff;
      }
    }

    .comment-submit {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5em;

      svg {
        color: ${themeConsts.secondaryBlue};
      }
    }
  }
`;
