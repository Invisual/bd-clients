import styled from 'styled-components';
import { themeConsts } from './themeConsts';
 
export const SingleTaskDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 5% 5% 10%;
  padding-left: 20px;
  margin-top: 15px;
  color: ${themeConsts.textDarkGrey};
 
  .task-title {
    margin: 0;
    padding: 18px 0;
    position: relative;
    top: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${themeConsts.textDarkGrey};
    font-size: 1.3em;
  }
  .title-click {
    cursor: pointer;
  }
 
  .task-watch {
    padding: 18px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
 
    .active-clock {
      color: ${themeConsts.red};
    }
 
    .inactive-clock {
      color: ${themeConsts.primaryBlue};
    }
  }
 
  .task-state {
    color: #fff;
    border-radius: ${themeConsts.borderRadius};
    font-size: 1.5em;
    font-weight: 600;
    padding: 18px 0;
    text-align: center;
    background-color: ${props => props.taskColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    font-size: 2em;
  }
`;
 
export const AllSingleTaskDiv = styled.div`
  display: grid;
  grid-template-columns: 75% 5% 5% 5% 10%;
  padding-left: 20px;
  margin-top: 15px;
  color: ${themeConsts.textDarkGrey};
 
  .task-title {
    margin: 0;
    padding: 18px 0;
    position: relative;
    top: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.3em;
  }
  .task-title-client{
    display:block;

    .client-task{
      font-size: .8em;
      margin-top: 2px;
      font-weight: 600;
      color: #7f9aff;

      span{
        margin-left: 10px;
        color: ${themeConsts.textDarkGrey};
      }
    }
  }
  .title-click {
    cursor: pointer;
  }
 
  .task-link {
    padding: 18px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${themeConsts.secondaryBlue};
  }
  .task-link:hover {
    color: ${themeConsts.primaryBlue};
  }
  .billed-status {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2em;
      color: ${themeConsts.green}
    }
  }
 
  .task-watch {
    padding: 18px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
 
    .active-clock {
      color: ${themeConsts.red};
    }
 
    .inactive-clock {
      color: ${themeConsts.primaryBlue};
    }
  }
 
  .task-state {
    color: #fff;
    border-radius: ${themeConsts.borderRadius};
    font-size: 1.3em;
    font-weight: 600;
    padding: 18px 0;
    text-align: center;
    background-color: ${props => props.taskColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    font-size: 2em;
  }
`;
 
export const SingleProjectDiv = styled.div`
  display: grid;
  grid-template-columns: 4% 60% 8% 8% 20%;
  color: ${themeConsts.textDarkGrey};
 
  .project-title {
    /*margin: 0;
    padding: 18px 0;
    position: relative;
    top: 6px;*/
    display: flex;
    align-items: center;
 
    .title-divider {
      padding-right: 5px;
      border-right: 1px solid #afacd1;
      font-size: 1.3em;
    }
    .project-client {
      padding-left: 7px;
      color: ${themeConsts.secondaryBlue};
      font-weight: 700;
    }
  }
 
  .project-status,
  .project-total-tasks,
  .project-concluded-tasks {
    /*padding: 18px 0;
    position: relative;
    top: 8px;
    margin: 0;*/
    display: flex;
    align-items: center;
    font-size: 1.3em;
  }
  .project-status {
    /*margin: auto 0;
    position: relative;
    top: 4px;*/
    display:flex;
    align-items: center;
  }
  .task-progress {
    padding: 18px 0;
    position: relative;
    top: 4px;
  }
 
  svg {
    font-size: 1.7em;
  }
`;
 
export const ClientProjectDiv = styled.div`
  display: grid;
  grid-template-columns: 4% 60% 8% 8% 20%;
  color: ${themeConsts.textDarkGrey};
 
  .project-status {
    display:flex;
    align-items:center;
    position: relative;
  }
 
  .project-status.billed::after{
    content: '';
    position: absolute;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    background: url('/img/euro.svg');
    background-position: 22% 50%;
    background-repeat: no-repeat;
    background-size: 10px;
  }
  .project-title {
    display:flex;
    align-items:center;
 
    .title-divider {
      padding-right: 5px;
      border-right: 1px solid #afacd1;
      font-size: 1.3em;
    }
    .project-participants {
      padding-left: 7px;
      img {
        margin-right:3px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${themeConsts.bordersGrey};
      }
    }
  }
 
  .project-total-tasks,
  .project-concluded-tasks {
    display: flex;
    font-size: 1.3em;
    align-items: center;
    font-size: 1.3em;
  }
 
  .task-progress {
    padding: 18px 0;
    position: relative;
    top: 0px;
  }
 
  svg {
    font-size: 1.7em;
  }
`;
 
export const AllSingleProjectDiv = styled.div`
  color: ${themeConsts.textDarkGrey};
  padding: 10px !important;
  cursor: pointer;
 
  .project-header {
    padding-bottom: 3px;
    border-bottom: 1px solid #e6e6e6;
    .project-title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      margin-bottom: 25px;
      font-size: 1.4em;
      font-weight: 500;
 
    .billed{
      position: relative;
    }
    .billed::after{
      content: '';
      position: absolute;
      width:100%;
      height:100%;
      top: 0;
      left: 0;
      background: url('/img/euro.svg');
      background-position: 22% 38%;
      background-repeat: no-repeat;
      background-size: 11px;
    }
      .title-click {
        padding-left: 5px;
      }
    }
 
   
 
    .project-client-date {
      display: flex;
      justify-content: space-between;
      .project-icon-client {
        display: flex;
        align-items: center;
        .project-client {
          color: ${themeConsts.secondaryBlue};
          font-size: 1.2em;
          font-weight: 700;
        }
      }
      .project-date {
        display: flex;
        align-items: center;
      }
    }
    svg {
      padding-right: 5px;
      font-size: 1.4em;
    }
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
  .project-progress {
  }
  svg {
    font-size: 1.7em;
  }
`;
 
export const SingleToDoDiv = styled.div`
  display: grid;
  grid-template-columns: 7% 88% 5%;
  color: ${themeConsts.textDarkGrey};
  padding: 10px 0;
 
  .todo-text {
    margin: 0;
    font-size: 1em;
    font-size: 1.2em;
    line-height: 1.4em;
  }
 
  .todo-status {
    margin: auto 0;
    position: relative;
    cursor: pointer;
  }

  .todo-delete{
    cursor: pointer;

    span{
      color:${themeConsts.textLighterGrey};
      transform: rotate(45deg);
      font-weight: 100;
      font-size: 1.4em;
    }
  }

  .todo-text, .todo-status, .todo-delete{
    display: flex;
    align-items: center;
  }
 
  svg {
    font-size: 1.4em;
  }
`;
 
export const SingleTaskCommentDiv = styled.div`
  display: grid;
  grid-template-columns: 6% 94%;
  color: ${themeConsts.textDarkGrey};
  margin-bottom: 10px;
 
  .todo-text {
    margin: 0;
    padding: 18px 0;
    position: relative;
  }
 
  .todo-status {
    margin: auto 0;
    position: relative;
    cursor: pointer;
  }
`;
 
export const SingleClientDiv = styled.div`
  display: grid;
  grid-template-columns: 45% 35% 20%;
  color: ${themeConsts.textDarkGrey};
  min-height: 50px;
  cursor: pointer;
 
  .client-title {
    display: flex;
    align-items: center;
    font-size: 1.4em;
    font-weight: 500;
  }
 
  .hours-progress {
    padding: 18px 0;
    svg {
      display: flex;
      align-items: center;
    }
  }
 
  .client-hours {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${themeConsts.secondaryBlue};
    font-size: 1em;
  }
 
  svg {
    font-size: 1.7em;
  }
`;
 
 
 
 
export const SingleMemberDiv = styled.div`
  display: flex;
  color: ${themeConsts.textDarkGrey};
  min-height: 50px;
  cursor: pointer;
 
  .member-avatar{
    display: flex;
    align-items: center;
 
    img{
      width:27px;
      border: 2px solid #0036ff;
      border-radius: 50%;
    }
  }
  .member-name{
    display: flex;
    align-items: center;
    font-size: 1.4em;
    font-weight: 500;
    margin-left: 20px;
  }
  .member-role{
    display: flex;
    align-items: center;
    font-size: 1.1em;
    font-weight: 300;
    margin-left: 20px;
    color:${themeConsts.secondaryBlue}
  }
`;
 
 
 
 
export const AllMeetingsDiv = styled.div`
 
  .meeting-card-grid{
    display: grid;
    grid-template-columns: 93% 7%;
 
    .meeting-type-1{background-color:${themeConsts.orange}}
    .meeting-type-2{background-color:${themeConsts.thirdBlue}}
    .meeting-info-date{
      display:inline-block;
      color:${themeConsts.white};
      border-radius:${themeConsts.borderRadius};
      padding:4px 8px;
      margin-top:15px;
 
      .date{
        margin-left: 5px;
      }
    }
 
    h3{
      font-weight: 500;
      font-size: 1.4em;
      color:${themeConsts.titlesDarkGrey};
      margin: 10px 0 10px 3px;
    }
 
    .meeting-info-users{
      margin-left: 3px;
 
      img{
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${themeConsts.primaryBlue};
        margin-right: 5px;
      }
    }
 
    .meeting-info-extra{
      display:flex;
      margin-top: 12px;
      margin-bottom: 7px;
 
 
      .meeting-extra-place{
        margin-left:25px;
      }
      svg{
        padding-right: 5px;
        font-size: 1.5em;
        color:${themeConsts.primaryBlue};
      }
      span{
        font-weight:500;
        color:${themeConsts.textDarkGrey};
        position: relative;
        bottom: 3px;
      }
    }
 
    .meeting-card-actions{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .single-meeting-action{
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
        font-size:1.75em;
        color:${themeConsts.secondaryBlue};
        margin:9px 0;
        cursor:pointer;
        position:relative;
        z-index:1;
      }
    }
  }
 
  .meeting-card-small{
 
    .meeting-info-date{
      padding: 2px 6px;
 
      .hours{
        font-size:.85em;
      }
    }
 
    h3{
      font-size:1.1em;
    }
 
    .meeting-info-users img{
      width: 17px;
      height: 17px;
    }
 
    .meeting-info-extra{
      svg{
        font-size:1.3em;
      }
 
      span{
        font-size: .85em;
      }
    }
  }
 
 
.small-height{
    animation: incHeight .3s ease;
    animation-fill-mode: forwards;
}
.full-height{
    animation: redHeight .3s ease;
    animation-fill-mode: forwards;
}
 
@keyframes incHeight{
    0%{padding-bottom: 0;}
    100%{padding-bottom: 60px;}
}
 
 
@keyframes redHeight{
    0%{padding-bottom: 60px;}
    100%{padding-bottom: 0;}
}
`
export const AllSingleBillingDiv = styled.div`
    display: grid;
  grid-template-columns: 10% 80% 10%;
  padding-left: 20px;
  margin-top: 15px;
  color: ${themeConsts.textDarkGrey};
 
  .billing-type-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2em;
      color: ${themeConsts.secondaryBlue}
    }
  }
  .billing-title {
    margin: 0;
    padding: 18px 0;
    position: relative;
    top: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.3em;
    .billing-client-name {
      margin-left: 10px;
      border-left: 1px solid ${themeConsts.bordersGrey};
      padding-left: 10px;
      color: ${themeConsts.secondaryBlue}
    }
  }
  .title-click {
    cursor: pointer;
  }
  .billed-status {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2em;
      color: ${themeConsts.green}
    }
  }
 
 
`;
 
 
 
 
export const SingleVacationDiv = styled.div`
  padding: 0 !important;
 
  .vacation-card-grid{
    display:grid;
    grid-template-columns:50% 45% 5%;
    padding: 20px 5px 20px 14px !important;
 
    .user-info{
      display: flex;
      align-items: center;
 
      img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 2px solid ${themeConsts.primaryBlue};
        margin-right: 10px;
      }
      .user-name{
        margin-right: 14px;
        color: ${themeConsts.textDarkGrey};
        font-size: 1.3em;
      }
      .user-position{
        font-weight: 600;
        text-transform: uppercase;
        color: ${themeConsts.secondaryBlue};
        letter-spacing: .02em;
      }
    }
   
    .vacation-info{
      display: flex;
      align-items: center;
 
      span{
        font-size: 1.3em;
        color:${themeConsts.white};
        padding:5px 10px;
        background:${themeConsts.secondaryBlue};
        border-radius:25px;
      }
      span.vacation-type{
        background:${themeConsts.thirdBlue};
        margin-left:10px;
      }
    }
 
    .vacation-actions{
      display:flex;
      align-items:center;
      justify-content:flex-start;

      .single-vacation-action{
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
        color: ${themeConsts.secondaryBlue};
        margin: 9px 0;
        cursor: pointer;
        z-index:1;
        position:relative;
      }
    }
  }
 
  .small-vacations-card{
    grid-template-columns: 35% 75%;
    padding: 10px 5px 10px 10px !important;
 
    .user-info img{
      width:30px;
      height:30px;
    }
 
    .vacation-info span{
        font-size: 1.2em;
    }
  }
 
`;
 
export const SingleApprovalDiv = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  padding-left: 20px;
  margin-right:5px;
  margin-left:5px;
  margin-top: 15px;
  color: ${themeConsts.textDarkGrey};
  &:first-of-type{
    margin-top: 5px;
  }
  &:last-of-type{
    margin-bottom: 5px;
  }
 
  .approval-type-icon {
    font-size:1.8em;
    color:${themeConsts.secondaryBlue};
    display: flex;
    align-items: center;
  }
  .approval-title {
    padding: 18px 0;
    display: flex;
    align-items: center;
    .approval-divider {
      padding-right: 5px;
      border-right: 1px solid #afacd1;
      font-size: 1.3em;
    }
    .approval-client {
      padding-left: 7px;
      color: ${themeConsts.secondaryBlue};
      font-weight: 700;
    }
  }
 
`;




export const SingleUserDiv = styled.div`
    padding:0 !important;
    box-shadow:none !important;
    border-top: 1px solid #e6e6e6;
    border-radius: 0 !important;
    margin-top: 0 !important;

    &:first-child{
      border-top: none;
    }

    .limit-width{
      padding:0 20px;
      background-color:#fff;
      transition:all .4s ease;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .limit-width.active{
      background-color:${themeConsts.lightGrey};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .single-card-grid{
      display: grid;
      grid-template-columns: 10% 60% 10% 10% 10%;
      min-height:51px;

      .flex{
        display:flex;
        align-items: center;
      }

      .user-avatar{
        img{
          width: 27px;
          border: 2px solid ${themeConsts.primaryBlue};
          border-radius: 50%;
        }
      }

      .user-name-position{
        h3{
          color:${themeConsts.textDarkGrey};
          font-size: 1.4em;
          letter-spacing: .02em;
          margin:0;
        }
        h4{
          color:${themeConsts.secondaryBlue};
          margin:0;
          margin-left:15px;
          font-size: 1.1em;
          font-weight: 500;
        }
      }

      .user-tasks, .user-completed-tasks{
        justify-content:center;

        span{
          font-size: 1.3em;
          font-weight:600;
          color:${themeConsts.textDarkGrey};
        }
      }

      .card-arrow{
        justify-content:flex-end;

        svg{
          color:${themeConsts.primaryBlue};
          font-size: 1.7em;
          stroke-width: 2.5;
        }
      }

    }

    .user-tasks-info{
      overflow:hidden;
      width:97%;
      margin:0 auto;
      transition:all .5s ease;

      h2{
        color:${themeConsts.primaryBlue};
      }
      hr{
        border-color:${themeConsts.secondaryBlue};
      }
    }
    .tasks-info-closed{
      max-height:0;
    }
    .tasks-info-opened{
      max-height:500px;
    }

    .see-tasks-arrow{
      transition:all .4s ease;
    }
    .see-tasks-arrow.up{
      transform: rotate(180deg);
    }
    

    .user-tasks{

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
            font-weight: 500;
          }
          h5{
            margin:0;
            margin-left:10px;
            color:${themeConsts.secondaryBlue};
            font-weight: 500;
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
    }
    .see-all-tasks{
        margin: 12px 0 15px 0;
        font-weight: 500;
        color: #7f9aff;
        cursor: pointer;
        font-size: 1.3em;
      }
`;




export const SingleAreaDiv = styled.div`
    padding: 13px 20px !important;

    .single-area-title{
      display:flex;
      align-items:center;
      justify-content: space-between;

      h5{
        margin: 0;
        color:${themeConsts.titlesDarkGrey};
        font-size: 1.3em;
        font-weight: 500;
      }

      .toggle-area-card{
        font-size: 1.8em;
        color: #7f9aff;
        font-weight: 500;
        cursor: pointer;
      }
    }
    
    .area-users{
      overflow: hidden;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
    .area-users-closed{
      max-height:0;
    }
    .area-users-opened{
      max-height:500px;
      margin-top: 6px;
    }

`;