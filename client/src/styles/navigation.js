import styled from 'styled-components';

export const SidebarDiv = styled.div`
  width: 14%;
  height: 100vh;
  background-color: #666;
  position: relative;

  .logo {
    text-align: center;
    margin-top: 50px;

    img {
      max-width: 80%;
    }
  }

  .navigation {
    margin-top: 100px;

    ul {
      color: #fff;
      padding-inline-start: 25px;
      list-style-type: none;
      padding-bottom: 15px;

      li {
        padding-bottom: 15px;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;

    p {
      font-size: 0.7rem;
      text-align: center;
    }
  }
`;

export const TopBarDiv = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  position: absolute;
  right: 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;

    .topbar-avatar {
      position: relative;
      bottom: 5px;
      font-weight: 500;

      img {
        vertical-align: middle;
      }
    }
    input[type='text'] {
      border: none;
      outline: none;
      color: #555;
      padding: 3px;
      background: none;
      z-index: 3;
      width: 150px;
      border-bottom: 1px solid #bbb;
      cursor: text;
      transform: scaleX(.0);
      transform-origin: right;
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

      p {
        position: absolute;
        top: -15px;
        right: -2px;
        font-size: 13px;
        background-color: #5093e1;
        border-radius: 50%;
        width: 18px;
        text-align: center;
        height: 18px;
        color: #000;
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
