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
    font-size:1.3em;
 
  }
  .title-click {
      cursor:pointer;
    }

  .task-watch {
    padding: 18px 0;
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    .active-clock{
    color:${themeConsts.red};
    }

    .inactive-clock{
    color: ${themeConsts.primaryBlue}
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
    cursor:pointer;
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
    cursor:pointer;
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
    cursor:pointer;
  }
`;