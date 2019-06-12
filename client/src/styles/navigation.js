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
      max-width: 100%;
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
      white-space: nowrap;
      overflow-x: hidden;
      color: #fff;
      padding-inline-start: 0;
      list-style-type: none;
      padding-bottom: 15px;
      display:table;
      margin:0 auto;

      .is-active{
        background-color: ${themeConsts.activeBlue};
          box-shadow: ${themeConsts.activeShadow};
        li{
          background-color: ${themeConsts.activeBlue};
          box-shadow: ${themeConsts.activeShadow};
        }
      }

      li {
        margin-bottom: 12px;
        font-size:1.6em;
        font-weight: 600;
        width: 175%;
        padding: 12px 8px 8px 11px;
        background-color: transparent;
        border-top-left-radius: ${themeConsts.borderRadius};
        border-bottom-left-radius: ${themeConsts.borderRadius};
        transition: all .4s ease;
        overflow: hidden;
        cursor:pointer;

          .submenu{
            margin: 0 0 0 40px;
            overflow:hidden;
            transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

            .submenu-item{
              font-size: .9em;
              padding: 0;
              margin: 15px 0px;
              font-weight: 300;
              letter-spacing: .02em;
            }
          }
          .closed-submenu{ height:0; }
          .opened-submenu{ height:100px; }
          .opened-submenu.company-submenu{ height:170px; }

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
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
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
    position:relative;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 5px;
    
    .topbar-goback {
      position:absolute;
      left:15.5%;
      top:50%;
      transform:translateY(-50%);
    }

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
          font-size: .76em;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          right: 0;
          text-align: center;
        }
      }
    }
    li:hover {
      color: #5093e1;
    }

    .topbar-notifications{
      margin-right: 10px;
    }

    .topbar-todo svg{
      font-size: 2.6em;
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
        top: 53px;
        left:50%;
        transform:translateX(-50%);
        width: 350px;
        background-color: white;
        font-weight: bold;
        position: absolute;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 11;
        border-radius: 6px;

        .notification-header{
          height: 20px;
          min-height: unset;
          font-size: 1.17em;
          font-weight: 600;
          letter-spacing: .03em;
          background-color: ${themeConsts.secondaryBlue};
          color:${themeConsts.white};
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        .notification-header:hover{
          background-color: ${themeConsts.secondaryBlue};
        }

        li{
          margin-left:0;
          text-align:left;
          border-bottom: 1px solid #f7f7f7f7 !important;
          min-height: 50px;
          display: flex;
          align-items: center;
          background-color:${themeConsts.notificationsBg};

          svg{
            font-size: 2.2em;
            margin-right: 15px;
          }
          .frown-icon{
            width: 20px;
            margin-right: 15px;
          }
          .notification-info{
            p{
              font-size: 1.15em;
              letter-spacing: .01em;
              font-weight: 300;
              margin: 4px 0;
            }
            span{
              color: ${themeConsts.textLighterGrey};
              font-weight: 300;
              letter-spacing: .03em;
            }
          }
        }
      }
      .notification.opened{
        background-color:${themeConsts.white};
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
    }
  }
  .notifications-dropdown:after{
        content:'';
        position:absolute;
        left:0;
        right:0;
        margin:0 auto;
        background-color: ${themeConsts.secondaryBlue};
        top: -8px;
        height: 15px;
        width: 15px;
        border-radius: 6px 0px 0px 0px;
        transform: rotate(45deg);
  }
  .notification:hover{
    background-color: #f7f7f7 !important;
  }
  .notificationlink:last-child li{
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
`;
