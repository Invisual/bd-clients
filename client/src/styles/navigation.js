import styled from 'styled-components';
import {themeConsts} from './themeConsts'

export const SidebarDiv = styled.div`
  width:14%;
  height: 100vh;
  background-color: ${themeConsts.primaryBlue};
  position: relative;
  overflow-x:hidden;
  transition:all .5s ease;

  .logo {
    text-align: center;
    margin-top: 50px;
    height:90px;
  }

  .logo-big{
    img {
      max-width: 80%;
    }
  }

  .logo-small{
    img {
      max-width: 60%;
    }
  }

  .navigation {
    margin-top: 60px;

    ul {
      /*width:200px;
      padding-inline-start: 26px;
      */
     white-space: nowrap;
      overflow-x: hidden;
      color: #fff;
      padding-inline-start: 0;
      list-style-type: none;
      padding-bottom: 15px;
      display:table;
      margin:0 auto;

      li {
        padding-bottom: 25px;
        font-size:1.6em;

        svg{
          /*padding-right: 23px;*/
          font-size: 1.3em;
        }

        span{
          position: relative;
          bottom: 4px;
          padding-left:15px;
        }
      }
    }
  }

  .sidebar-toggle {
    text-align: center;

      .switch {
        position: relative;
        display: inline-block;
        width: 45px;
        height: 21px;
        
        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 15px;
          width: 15px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .rounded-slider {
          border-radius: 34px;
        }

        .rounded-slider:before {
          border-radius: 50%;
        }
      }
  }
`;

export const TopBarDiv = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  position: absolute;
  right: 0;
  width: 100%;
  background-color: ${themeConsts.white};
  box-shadow: ${themeConsts.mainShadow};

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;

    .topbar-avatar {
      span {
        font-weight: 600;
        margin-right: 18px;
        color: ${themeConsts.secondaryBlue};
        font-size: 1.25em;
      }

      img {
        vertical-align: middle;
        border: 2px solid ${themeConsts.primaryBlue};
      }
    }

    input[type='text'] {
      border: none;
      outline: none;
      background: none;
      z-index: 3;
      width: 150px;
      border-bottom: 1px solid ${themeConsts.primaryBlue};
      cursor: text;
      transform: scaleX(.0);
      transform-origin: right;
      color:${themeConsts.secondaryBlue};
      font-weight:600;
      position: relative;
      bottom: 5px;
      right: 4px;
    }

    input[type='text']::-webkit-input-placeholder {
      color:${themeConsts.secondaryBlue};
      font-weight:600;
      font-size: .9em;
      font-family: 'Montserrat', sans-serif;
      position:relative;
      bottom:4px;
    }

    input[type='text']::-moz-placeholder {
      color:${themeConsts.secondaryBlue};
      font-weight:600;
      font-size: .9em;
      font-family: 'Montserrat', sans-serif;
      position:relative;
      bottom:4px;
    }

    input[type='text']:-ms-input-placeholder {
      color:${themeConsts.secondaryBlue};
      font-weight:600;
      font-size: .9em;
      font-family: 'Montserrat', sans-serif;
      position:relative;
      bottom:4px;
    }

    input[type='text']:-moz-placeholder {
      color:${themeConsts.secondaryBlue};
      font-weight:600;
      font-size: .9em;
      font-family: 'Montserrat', sans-serif;
      position:relative;
      bottom:4px;
    }

    input[type='text'].showsearch{
      animation: showInput .3s ease-in-out;
      animation-fill-mode: forwards;  
    }
    @keyframes showInput{
      0%{
        transform: scaleX(.0);
        opacity:0;
      }
      100%{
        transform: scaleX(1);
        opacity:1;
      }
    }
    
    input[type='text'].hidesearch{
      animation: hideInput .3s ease-in-out;
      animation-fill-mode: forwards;  
    }
    @keyframes hideInput{
      0%{
        transform: scaleX(1);
        opacity:1;
      }
      100%{
        transform: scaleX(.0);
        opacity:0;
      }
    }

    li {
      padding: 10px 15px;
      text-align: center;
      display: block;
      color: #666;
      font-size: 0.99em;
      position: relative;
      cursor: pointer;
      margin-left: 10px;

      svg{
        font-size:2.8em;
        stroke-width: 1.3;
        color: ${themeConsts.primaryBlue};
      }

      .notification-number {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 5px;
        right: 12px;
        background-color: ${themeConsts.red};
        border-radius: 50%;
        text-align: center;

        span{
          color: ${themeConsts.white};
          font-size: .75em;
          position: relative;
          bottom: 1px;
        }
      }
    }
    li:hover {
      color: #5093e1;
    }

    .topbar-search {
      padding: 10px 15px;
      text-align: center;
      display: block;
      color: #666;
      font-size: 0.99em;
    }
    .topbar-messages{
      margin-right: 30px;
    }
    .topbar-notifications,
    .topbar-messages,
    .topbar-avatar {
      ul {
        display: block;
        list-style-type: none;
        margin: 0;
        padding: 0;
        top: 45px;
        right: 0px;
        width: 200px;
        background-color: white;
        font-weight: bold;
        position: absolute;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }
      li {
        color: #666;
        text-decoration: none;
      }
      li {
        padding: 8px 16px;
        border-bottom: 1px solid #e5e5e5;
      }
      li:last-child {
        border-bottom: none;
      }
      li:hover {
        background-color: #e5e5e5;
        color: white;
      }
    }
  }
`;