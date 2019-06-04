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
    margin: 0;
    padding: 18px 0;
    position: relative;
    top: 6px;

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
    padding: 18px 0;
    position: relative;
    top: 8px;
    margin: 0;
    font-size: 1.3em;
  }
  .project-status {
    margin: auto 0;
    position: relative;
    top: 4px;
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
      align-items: flex-end;
      margin-bottom: 5px;
      margin-bottom: 25px;
      font-size: 1.4em;
      font-weight: 500;
      span {
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
  grid-template-columns: 10% 90%;
  color: ${themeConsts.textDarkGrey};

  .todo-text {
    margin: 0;
    padding: 14px 0;
    font-size: 1em;
    font-size: 1.2em;
    line-height: 1.4em;
  }

  .todo-status {
    margin: auto 0;
    position: relative;
    cursor: pointer;
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

      svg{
        font-size:1.75em;
        color:${themeConsts.secondaryBlue};
        margin:9px 0;
        cursor:pointer;
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