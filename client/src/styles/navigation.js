import styled from 'styled-components'

export const SidebarDiv = styled.div`
    width:14%;
    height:100vh;
    background-color:#666;
    position:relative;

    .logo{
        text-align: center;
        margin-top: 50px;

        img{
            max-width: 80%;
        }
    }

    .navigation{
        margin-top:100px;

        ul{
            color:#fff;
            padding-inline-start: 25px;
            list-style-type: none;
            padding-bottom: 15px;

            li{
                padding-bottom:15px;
            }
        }
    }

    .footer{
        position:absolute;
        bottom:0;
        width:100%;

        p{
            font-size: .7rem;
            text-align:center;
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

    .avatar-section {
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
      width: 100px;
    }

    input[type='text']:hover {
      z-index: 1;
      border-bottom: 1px solid #bbb;
      cursor: text;
    }

    input[type='text']:focus {
      z-index: 1;
      border-bottom: 1px solid #bbb;
      cursor: text;
    }
    li {
      padding: 10px 15px;
      text-align: center;
      display: block;
      color: #666;
      font-size: 0.99em;
    }
    li:hover {
      color: #718daa;
    }

    .search-field {
      padding: 10px 15px;
      text-align: center;
      display: block;
      color: #666;
      font-size: 0.99em;
    }
  }
`;
