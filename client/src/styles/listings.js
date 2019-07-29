import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const AllTasksDiv = styled.div`
  width: 86%;
  //min-height: 100vh;
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

    .tasks-title{
      margin: 0;
      padding: 20px 22px 15px 22px;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-options{
        display:flex;
        align-items:center;
        justify-content:space-around;
        svg {
          color: ${themeConsts.secondaryBlue};
          font-size: 2em;
        }
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
        cursor: pointer;
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
  //min-height: 100vh;
  background-color: #f7f7f7;
  overflow-y: scroll;
  transition: all 0.5s ease;
  margin-top: 45px;

  .widgets-grid {
    display: grid;
    grid-template-columns: 30% 70%;
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
      .left-options{
        display:flex;
        align-items:center;
        justify-content:space-around;
        svg {
          color: ${themeConsts.secondaryBlue};
          font-size: 2em;
        }
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
        cursor: pointer;
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

  .meetings-grid {
    grid-template-columns: 60% 40%;

    .meetings-calendar {
      .cards-container {
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

  .active-day-meetings-container {
    padding: 0 30px;

    .day {
      margin: 20px 0;

      h5 {
        color: ${themeConsts.primaryBlue};
        margin: 0;
        font-size: 2em;
        font-weight: 500;
      }
      span {
        color: ${themeConsts.primaryBlue};
        text-transform: lowercase;
        font-size: 1.3em;
      }
    }
  }
`;

export const TaskDetailsDiv = styled.div`
  color: #797979;
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  
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

      .no-border {
        border: 0;
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

      .task-stateinfo-section{
      border-top: 1px solid #e6e6e6;
      padding: 20px 0;

      h4{
        font-weight: 600;
        font-size: 1.1em;
        color: ${themeConsts.titlesDarkGrey};
        margin: 0;
        margin-bottom: 10px;
      }

      .task-approval-user{
        display:flex;
        align-items:center;
        margin-bottom: 5px;

        img{
          border-radius: 50%;
          width: 17px;
          height: 17px;
          border: 2px solid #0036ff;
          margin-right: 10px;
        }

        .approval-user{
          font-size: 1.2em;
          font-weight: 500;
          margin-right: 5px;
        }

        .approval-date{
          font-size: 1.1em;
          font-style: italic;
          margin-right: 10px;
        }

        .approval-status{
          font-size: 1.15em;
          color: #7f9aff;
        }

      }
    }

    .billing-costs-section{
        margin-right: 30px;
        border-top: 1px solid #e6e6e6;
        padding: 25px 0;

        h2{
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin: 0;
          margin-bottom: 10px;
        }

        .modal-costs-listing{
        width: 95%;
        margin: 0 auto;
        padding-top: 1px;
      
          .costs-list-header{
            display:grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr .5fr;
            background: ${themeConsts.tableHeader};

              h5{
                text-align:left;
                margin-left:15px;
                margin-top:10px;
                margin-bottom:10px;
                color:${themeConsts.titlesDarkGrey};
                font-size: 1.34em;
              }
          }
          .costs-list-row{
            display:grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr .5fr;
            padding: 4px 0;
            background-color:${themeConsts.white};
            border-bottom: 1px solid ${themeConsts.tableListBorder};

              p{
                text-align:left;
                margin-left:15px;
                color:${themeConsts.textDarkerGrey};
                font-weight:500;
                font-size: 1.1em;
              }
          }
          .costs-list-row:hover{
            background-color:${themeConsts.lightGrey}
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
        .billing-title h4 {
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin: 0;
          margin-bottom: 10px;
        }
        .billing-costs-wrapper {
          display: flex;
          flex-direction: column;
        }
        .see-all-costs,
        .billing-add-costs {
          margin-bottom: 10px;
          &:hover {
           cursor: pointer;
          }
          span{
            position: relative;
            width: max-content;
            span{
              display:inline-block;
            }
            svg {
              position: absolute;
              top: -2px;
              font-size: 1.4em;
              color: ${themeConsts.secondaryBlue};
              stroke-width: 3;
              padding-left: 8px;
          }
          }
          
          
        }
        .billing-descr {
          margin-top: 1px;
          margin-bottom: 5px;
        }
        
      }
      .budget-external-status{
        margin-right: 30px;
        border-top: 1px solid #e6e6e6;
        padding: 25px 0;

        h4 {
          margin-top: 0;
          font-weight: 600;
          font-size: 1.1em;
          color: #4b4b4b;
          margin-bottom: 10px;
        }
        .status-container {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          font-size: 1.3em;
          
            .single-status {
              border-radius: 2em;
              margin: 10px;
              padding: 5px 15px;
              border: 2px solid ${themeConsts.secondaryBlue}; 
              color: ${themeConsts.secondaryBlue};
              cursor: pointer;
            }
            .single-status:hover {
              color: white;
              background-color: ${themeConsts.secondaryBlue};
              box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.16);
              transform: translateY(-2px);
              transition: all .5s;
            }
            .active-status { 
              color:white;
              background-color: ${themeConsts.secondaryBlue}
            }
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
      .scrum-title {
        font-size: 1.2em;
        font-weight: 500;
        color: ${themeConsts.activeBlue};
      }
      img {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${themeConsts.activeBlue};
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
          margin-bottom: 20px;
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

    .project-stateinfo-section{
      border-top: 1px solid #e6e6e6;
      padding: 20px 0;

      h4{
        font-weight: 600;
        font-size: 1.1em;
        color: ${themeConsts.titlesDarkGrey};
        margin: 0;
        margin-bottom: 10px;
      }

      .project-approval-user{
        display:flex;
        align-items:center;
        margin-bottom: 5px;

        img{
          border-radius: 50%;
          width: 17px;
          height: 17px;
          border: 2px solid #0036ff;
          margin-right: 10px;
        }

        .approval-user{
          font-size: 1.2em;
          font-weight: 500;
          margin-right: 5px;
        }

        .approval-date{
          font-size: 1.1em;
          font-style: italic;
          margin-right: 10px;
        }

        .approval-status{
          font-size: 1.15em;
          color: #7f9aff;
        }

      }
    }

    .project-links-section{
      border-top: 1px solid #e6e6e6;
      padding:20px 0;

      h4{
        font-weight: 600;
        font-size: 1.1em;
        color: ${themeConsts.titlesDarkGrey};
        margin: 0;
        margin-bottom: 10px;
      }

      .single-links-wrapper{
        display: flex;
        align-items: center;

        .single-link{
          margin-right:20px;

          img{
            width:30px;
          }
          .zeplin-logo{
            width:35px;
          }
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
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin: 0;
          margin-bottom: 10px;
        }
        .billing-costs-wrapper {
          display: flex;
          flex-direction: column;
        }
        .see-all-costs,
        .billing-add-costs {
          margin-bottom: 10px;
          &:hover {
           cursor: pointer;
          }
          span{
            position: relative;
            width: max-content;
            span{
              display:inline-block;
            }
            svg {
              position: absolute;
              top: -2px;
              font-size: 1.4em;
              color: ${themeConsts.secondaryBlue};
              stroke-width: 3;
              padding-left: 8px;
          }
          }
          
          
        }
      .billing-descr {
        margin-top: 1px;
        margin-bottom: 5px;
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
  //min-height: 100vh;
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
      .left-options{
        display:flex;
        align-items:center;
        justify-content:space-around;
        svg {
          color: ${themeConsts.secondaryBlue};
          font-size: 2em;
        }
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
        cursor: pointer;
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
  .team-members-grid {
    grid-template-columns: 30% 70%;
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

    .member-avatar {
      margin-top: 22px;
      text-align: center;

      img {
        width: 29px;
        border: 2px solid ${themeConsts.primaryBlue};
        border-radius: 50%;
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
      .member-position {
        color: ${themeConsts.secondaryBlue};
        font-size: 1.1em;
        margin: 3px 0 0 0;
        font-weight: 500;
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
      .scrum-title {
        font-size: 1.2em;
        font-weight: 500;
        color: ${themeConsts.activeBlue};
      }
      img {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${themeConsts.activeBlue};
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

    .client-data {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      position: absolute;
      .client-data-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .client-monthly-hours {
          display: flex;
          flex-direction: column;
          color: ${themeConsts.primaryBlue};
          h1, span {
            margin: 0;
          }
        }
        .client-data-options{
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;

          button {
            color: ${themeConsts.placeholderGrey};
            border: none;
            padding: 10px 0;
            min-width: 90px;
            margin-right: 15px;
            border-radius: 10px;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
            background-color: ${themeConsts.white};
            transition: 0.4s ;
            cursor: pointer;
          }
          button:hover {
            box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.16);
            color: ${themeConsts.white};
            background-color: ${themeConsts.secondaryBlue}
          }

          .client-data-year select {
          width: 100%;
          border: none;
          box-shadow: ${themeConsts.mainShadow};
          border-radius: ${themeConsts.borderRadius};
          color: ${themeConsts.placeholderGrey};
          padding: 10px 45px 10px 15px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: url(/img/calendar.svg) 89% / 15% no-repeat #fff;
          background-size: 20px;
          cursor: pointer;
        }
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
        .right {
          border-left: 1px solid #e6e6e6;
          padding-left: 15px;
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

    .client-info-password {
      width: 70%;
      margin: 0 auto;
      margin-top: 150px;
      text-align: center;

      input {
        height: 50px;
        width: 100%;
        border: none;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        text-indent: 12px;
      }

      .password-error-message {
        margin-top: 10px;
        color: ${themeConsts.red};
        font-weight: 500;
      }

      .form-buttons {
        margin-top: 35px;
      }
    }

    .user-info-content {
      margin-right: 30px;
      padding: 20px 0 10px 0;

      .user-info-basic {
        font-size: 1.3em;
        margin-bottom: 25px;

        .user-info-email,
        .user-info-phone {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          svg {
            color: ${themeConsts.secondaryBlue};
            margin-right: 5px;
            font-size: 1.3em;
          }
        }
      }
      .user-other-infos {
        h1 {
          color: ${themeConsts.titlesDarkGrey};
        }
        .user-other-container {
          font-size: 1.2em;
          padding-left: 10px;
          border-bottom: 1px solid #e6e6e6;
          .user-other-infos-email,
          .user-other-infos-password,
          .user-other-infos-obs {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            svg {
              color: ${themeConsts.secondaryBlue};
              margin-right: 5px;
            }
          }
          .user-other-padding {
            padding-left: 15px;
          }
        }
      }
    }


    .user-hours-content{
      padding-top:12px;
      padding-right: 30px;
      position:relative;
      min-height: 350px;

      .user-hours-date-title{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .current-date{
          h2{
            color:${themeConsts.primaryBlue};
            margin:0;
            font-weight: 500;
          }
          h4{
            color:${themeConsts.primaryBlue};
            margin:0;
            font-weight: 100;
          }
        }

        .react-date-picker{
          box-shadow: 0px 1px 6px rgba(0,0,0,.16);
          border-radius: 10px;
          height:35px;
          padding:0 6px;

          .react-date-picker__wrapper{
            border:none;

            input{
              color:${themeConsts.placeholderGrey};
            }

            .react-date-picker__clear-button{
              display:none;
            }

            svg{
              color:${themeConsts.secondaryBlue};
              font-size:1.2em;
            }
          }
          .react-date-picker__calendar {
              left: unset;
              right: 0;
          }
        }
      }

      .hours-block{
        margin-top: 20px;

        h4{
          margin:0;
          color:${themeConsts.primaryBlue};
          font-size: 1.4em;
          font-weight: 300;
          border-bottom: 1px solid ${themeConsts.primaryBlue};
          padding-bottom: 5px;
        }


      }

      .single-user-hour{
        display: grid;
        grid-template-columns: 60% 10% 20% 10%;
        padding-left: 10px;
        border-bottom: 1px solid #e6e6e6;

        p{
          display:flex;
          align-items: center;
        }
        .hour-task-title{
          font-size: 1.2em;
          letter-spacing: .02em;

          span{
            margin-left: 10px;
            color:${themeConsts.secondaryBlue};
          }
        }
        .hour-task-time-difference{
          color:${themeConsts.secondaryBlue};
        }
        .hour-actions{
          display: flex;
          align-items: center;
          justify-content: center;

          svg{
            font-size: 1.3em;
            color: ${themeConsts.secondaryBlue};
            cursor: pointer;
            margin: 0 5px;
          }
        }
      }
    }

    .user-tasks-content{
      padding-right: 30px;
      position:relative;
      min-height: 350px;
      height: 69vh;
      overflow-y: scroll;

      .single-user-task{
        display: grid;
        grid-template-columns: 67% 11% 11% 11%;
        padding: 12px 0 12px 10px;
        border-bottom:1px solid #e6e6e6;

        .single-task-title-client{
          display:flex;
          align-items:center;

          h4{
            margin:0;
            color:${themeConsts.textDarkGrey};
            font-size:1.05em;
            font-weight: 300;
          }
          .task-client{
            margin:0;
            margin-left:10px;
            color:${themeConsts.secondaryBlue};
          }
        }

        .single-task-hours, .single-task-deadline, .single-task-status, .single-task-approval-time{
          text-align:center; 
        }

        .single-task-hours span{
          color:${themeConsts.secondaryBlue};
        }

        .single-task-status span, .single-task-approval-time span{
          color:${themeConsts.primaryBlue};
          font-weight:600;
        }

        .single-task-deadline{
          span{
            color:${themeConsts.textDarkGrey};
          }
          .red{
            color:${themeConsts.red};
          }
        }
      }

      .empty-placeholder{
        position: absolute;
        bottom: -30px;
        left: 0;
        right: 0;
        text-align: center;
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
          font-weight: 600;
          font-size: 1.1em;
          color: ${themeConsts.titlesDarkGrey};
          margin: 0;
          margin-bottom: 10px;
        }
        .billing-costs-wrapper {
          display: flex;
          flex-direction: column;
        }
        .see-all-costs,
        .billing-add-costs {
          margin-bottom: 10px;
          &:hover {
           cursor: pointer;
          }
          span{
            position: relative;
            width: max-content;
            span{
              display:inline-block;
            }
            svg {
              position: absolute;
              top: -2px;
              font-size: 1.4em;
              color: ${themeConsts.secondaryBlue};
              stroke-width: 3;
              padding-left: 8px;
          }
          }
          
          
        }
      .billing-descr {
        margin-top: 1px;
        margin-bottom: 5px;
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

  .member-history-tab {
    padding-left:10px;
    padding-right: 40px;
    height: 69vh;
    overflow-y: scroll;
    margin-top: 10px;

    .single-member-project:nth-child(1) {
      margin-top: 5px;
    }
    .single-member-project {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 20px;
      position: relative;
      padding-top: 20px;
      padding-bottom: 20px;

      h2 {
        font-size: 1.4em;
        font-weight: 500;
        margin: 0;
      }

      .project-client {
        display: flex;
        align-items: center;
        margin-top: 6px;

        svg {
          margin-right: 5px;
          font-size: 1.3em;
        }
        h3 {
          margin: 0;
          font-size: 1.1em;
          color: ${themeConsts.secondaryBlue};
        }
      }

      .project-hours {
        position: absolute;
        top: 10px;
        right: 10px;
        color: ${themeConsts.white};
        background-color: ${themeConsts.secondaryBlue};
        padding: 5px 8px;
        border-radius: 25px;
        display: flex;
        align-items: center;

        svg {
          stroke-width: 4px;
          margin-right: 5px;
          font-size: 1.1em;
        }

        h6 {
          font-size: 1.1em;
          font-weight: 500;
          margin: 0;
          line-height: 1.2em;
        }
      }

      .project-single-task {
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-top: 15px;

        svg {
          color: ${themeConsts.textLightGrey};
          font-size: 1.3em;
          margin-right: 5px;
        }
        h4 {
          color: ${themeConsts.textLightGrey};
          font-size: 1.2em;
          font-weight: 300;
          margin: 0;
          margin-right: 12px;
        }
        h5 {
          margin: 0;
          margin-right: 12px;
          font-size: 1em;
        }
        .single-task-hours {
          display: flex;
          align-items: center;

          svg {
            font-size: 1.2em;
            color: ${themeConsts.secondaryBlue};
            stroke-width: 3;
          }
          span {
            color: #7f9aff;
            font-weight: 500;
            letter-spacing: 0.03em;
            font-size: 1.1em;
          }
        }
        .single-task-check {
          color: ${themeConsts.green};
          stroke-width: 4;
          margin-left: 13px;
        }
      }
      .task-hour-records{
        display:flex;
        flex-direction:column;
        padding-left:40px;
        margin-top:10px;

        span{
          margin-bottom:5px;
          font-size:1.1em;
          letter-spacing:0.02em;
        }
      }
    }
  }
`;


export const AllTripsDiv = styled.div`
    width: 86%;
    //min-height: 100vh;
    background-color: #f7f7f7;
    overflow-y: scroll;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    margin-top: 45px;

    .trips-container{
      width:92%;
      margin: 40px auto 0 auto;
      padding: 0;
      min-height: 500px;

      .row-title{
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .trips-actions{
          svg{
            color: #7f9aff;
            font-size: 2em;
          }
        }
      }

      .trips-row{
        padding: 20px 22px 15px 22px;
        margin: 0;

        .single-trip{
          padding: 12px 20px 9px 20px;

          .trip-grid{
            display:grid;
            grid-template-columns: 8% 87% 5%;

            .trip-user{
              display:flex;
              align-items:center;
              justify-content: center;

              img{
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 2px solid #0036ff;
                margin-right: 10px;
              }
            }

            .trip-info{

              .trip-date-time{
                display: flex;
                align-items: center;

                h5{
                  margin:0;
                  color:${themeConsts.primaryBlue};
                  font-size: 1.3em;
                  font-weight: 500;
                  margin-right: 13px;
                }

                .trip-hours{
                  font-size: 1.1em;
                  color: ${themeConsts.white};
                  padding: 3px 6px;
                  background: ${themeConsts.secondaryBlue};
                  border-radius: 25px;
                }
              }

              p{
                color:${themeConsts.titlesDarkGrey};
                font-size: 1.5em;
                margin: 10px 0;
              }

              .trip-meta{

                .trip-kms{
                  font-size: 1.1em;
                  color:${themeConsts.secondaryBlue};
                  margin-right:10px;
                }

                .trip-vehicle{
                  font-size: 1.1em;
                  color:${themeConsts.textDarkGrey};
                }
              }
              
            }

            .trip-actions{
              display:flex;
              align-items:center;
              justify-content:center;
              flex-direction:column;

              .single-trip-action{
                position:relative;

                &:after{
                  content:'';
                  position:absolute;
                  width: 200%;
                  height: 100%;
                  background-color: #f5f7fd;
                  z-index: 0;
                  left: 50%;
                  top: 50%;
                  transform: translateX(-50%) translateY(-50%);
                  border-radius: 10px;
                  opacity:0;
                }
              }

              svg{
                font-size: 1.75em;
                color: #7f9aff;
                margin: 9px 0;
                cursor: pointer;
                z-index:1;
                position:relative;
              }
            }
          }
        }
      }
      
      .trips-container-grid{
        display:grid;
        grid-template-columns: 60% 40%;

        .trips-content{
          border-right: 1px solid #e6e6e6;
          height: 79vh;
          overflow-y: scroll;
        }

        .car-mileage{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .mileage-content{

            h2{
              font-size: 5em;
              font-weight: 300;
              color:${themeConsts.secondaryBlue};
              margin:0;
              text-align:center;
            }

            p{
              font-size: 1.8em;
              color:${themeConsts.textLightGrey};
              margin:0;
              text-align:center;
            }
          }

          .mileage-background{
            width:100%;
            height:350px;
            background-image:url('/img/truck.svg');
            background-size: 100%;
            background-repeat: no-repeat;
            margin-top: 25px;
          }
        }
      }

    }
`;


export const UserVacationsDiv = styled.div`

  .vacations-grid{
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 5px;
  }

  .vacations-grid-border{
    border-top:1px solid #e6e6e6;
    margin-top: 15px;
  }

  .awaiting-vacations, .approved-vacations{
    border-left:1px solid #e6e6e6;
    padding-left:15px;
  }

  .vacations-section{
    min-height:190px;
    margin-top: 15px;
    padding-bottom: 2px;

    h3{
      color:${themeConsts.titlesDarkGrey};
      font-size:1.3em;
      margin:0;
    }

    .vacations-days-counter{
      position:relative;
      max-width:130px;
      margin:0 auto;
    }
    .vacations-days-counter::before{
      content:'${props => props.days}';
      position: absolute;
      top: 42%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      text-align: center;
      color: ${themeConsts.primaryBlue};
      font-weight: 600;
      font-size:3.6em;
    }
    .vacations-days-counter::after{
      content:'${props => props.title}';
      position: absolute;
      top: 60%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      text-align: center;
      color: ${themeConsts.primaryBlue};
      font-weight: 100;
      font-size:1.3em;
    }

    .vacations-info-meta{
      p{
        margin:0;
        margin-top: 3px;
      }
    }

    .list-singles-vacation{
      margin-top:15px;

      .single-vacation{
        display:flex;
        align-items:center;
        margin-bottom: 8px;

        svg{
          font-size:1.5em;
          color:${themeConsts.secondaryBlue};
          margin-right:7px;
        }
        img{
          width:13px;
          margin-right:7px;
        }
        span{
          color:${themeConsts.textDarkGrey};
          font-size:1.1em;

          .vacation-type{
            color:${themeConsts.secondaryBlue};
          }
        }
      }
    }
  }

`;



export const ListEventsDiv = styled.div`
   margin-top: 20px;
   border-top: 1px solid #ebebeb;
  padding-top: 20px;

  .events-date{
    color:${themeConsts.primaryBlue};
    font-size: 1.5em;
    margin: 0;
    margin-top: 3px;
    font-weight: 500;
    padding-bottom: 7px;
  }

  .events-container{
    max-height: 315px;
    overflow-y: scroll;

    .single-event{
      border-bottom: 1px solid #e6e6e6;
      padding:10px 0;

      .type-client{
        display: flex;
        align-items: center;
        margin-bottom: 6px;

        span{
          color: ${themeConsts.white};
          background-color: ${themeConsts.red};
          border-radius: 25px;
          padding: 1px 6px;
        }
        .is-meeting{
          background-color: ${themeConsts.thirdBlue};
        }

        h5{
          margin:0;
          margin-left: 7px;
          letter-spacing: .02em;
          color:${themeConsts.secondaryBlue};
        }
        .place{
          font-weight: 500;
          text-transform: uppercase;
          color: ${themeConsts.titlesDarkGrey};
        }
      }

      h3{
        margin:0;
        color: #4B4B4B;
        font-weight: 500;
        margin-top: 2px;
      }
      img{
        width: 19px;
        border-radius: 50%;
        border: 1px solid ${themeConsts.primaryBlue};
        margin-top: 7px;
      }

      .meeting-users{

        img{
          margin-right:5px
        }
      }
    }
  }

`