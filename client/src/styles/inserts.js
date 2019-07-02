import styled from 'styled-components';
import { themeConsts } from './themeConsts';

export const InsertFormDiv = styled.div`
  width: 86%;
  background-color: #f7f7f7;
  overflow-y: scroll;
  transition: all 0.5s ease;
  margin-top: 65px;

  .form-container {
    width: 94%;
    margin: 30px auto 0 auto;
    height: unset;
    box-shadow: none;

    .form-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding-left: 25px;
      padding-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid ${themeConsts.bordersGrey};
    }

    .form-grid:nth-child(1){
      margin-top: 50px;
    }

    .grid50-50 {
      display: grid;
      grid-template-columns: 48% 48%;
      grid-gap: 4%;
    }

    .grid33-33-33 {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1%;
    }

    .grid100 {
      display: grid;
      grid-template-columns: 100%;
    }

    .mt10 {
      margin-top: 10px;
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      margin-bottom: 25px;

      legend {
        color: ${themeConsts.titlesDarkGrey};
        font-weight: 500;
        font-size: 1.4em;
        padding: 0;
        margin-bottom: 8px;
      }

      input[type='text'],
      input[type='number'],
      input[type='email'],
      input[type='password'],
      select,
      textarea,
      .react-date-picker,
      .categories-card {
        width: 100%;
        border: none;
        box-shadow: ${themeConsts.mainShadow};
        border-radius: ${themeConsts.borderRadius};
        text-indent: 12px;
      }

      input[type='text'],
      input[type='number'],
      input[type='email'],
      input[type='password'],
      select,
      .react-date-picker {
        height: 50px;
      }

      .react-date-picker__wrapper {
        width: 100%;
        border: none;
        padding-left: 12px;

        .react-date-picker__clear-button {
          display: none;
        }

        input {
          font-size: 1.2em;
          text-indent: 0;
          width: 14px !important;
          text-align: center;
        }

        span {
          text-indent: 0;
        }

        .react-date-picker__inputGroup__year {
          width: 35px !important;
        }

        svg {
          color: ${themeConsts.secondaryBlue};
          font-size: 1.5em;
          stroke-width: 1.8;
          position: relative;
          right: 8px;
        }
      }

      textarea {
        height: 120px;
        padding: 18px;
        box-sizing: border-box;
        text-indent: 0;
        resize: none;
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(/img/seta-circulo.svg) 94% / 15% no-repeat #fff;
        background-size: 20px;
        cursor: pointer;
      }

      /* CAUTION: IE hackery ahead */
      select::-ms-expand {
        display: none; /* remove default arrow on ie10 and ie11 */
      }

      /* target Internet Explorer 9 to undo the custom arrow */
      @media screen and (min-width: 0\0) {
        select {
          background: none\9;
          padding: 5px\9;
        }
      }

      input::placeholder,
      textarea::placeholder,
      input,
      textarea,
      select {
        color: ${themeConsts.placeholderGrey};
      }

      .categories-card {
        padding: 0;

        .categories-grid {
          display: grid;
          grid-template-columns: 50% 50%;
          padding: 15px 10px 2px 15px;

          div {
            margin-bottom: 15px;

            .label-container {
              display: block;
              position: relative;
              padding-left: 15px;
              cursor: pointer;
              font-size: 1.3em;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;

              input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
              }

              .checkmark {
                position: absolute;
                top: 50%;
                bottom: 0;
                left: 0;
                height: 12px;
                width: 12px;
                border-radius: 50%;
                border: 2px solid ${themeConsts.secondaryBlue};
                background-color: transparent;
                transform: translateY(-50%);
              }
              .checkmark:after {
                content: '';
                position: absolute;
                display: none;
              }
            }

            .label-container:hover input ~ .checkmark {
              background-color: ${themeConsts.secondaryBlue};
            }

            .label-container input:checked ~ .checkmark {
              background-color: ${themeConsts.secondaryBlue};
            }
            .label-container input:checked ~ .checkmark:after {
              display: block;
            }

            .container .checkmark:after {
              left: 9px;
              top: 5px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }

        .users-grid {
          grid-template-columns: 25% 25% 25% 25%;
        }
      }

      .radio-label-container {
        position: relative;
        top: 17px;
        padding-left: 27px;
        padding-right: 40px;
        margin-bottom: 12px;
        font-size: 1.3em;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 1px;
          left: 0;
          height: 12px;
          width: 12px;
          background-color: #fff;
          border: 2px solid ${themeConsts.secondaryBlue};
          border-radius: 50%;
        }
        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }
      }

      .radio-label-container:hover input ~ .checkmark {
        background-color: ${themeConsts.secondaryBlue};
      }
      .radio-label-container input:checked ~ .checkmark:after {
        display: block;
      }
      .radio-label-container .checkmark:after {
        top: 3px;
        left: 3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${themeConsts.secondaryBlue};
      }
    }

    .form-buttons {
      margin-top: 50px;
    }

    .form-error{
      text-align: center;
      color: ${themeConsts.red};
      font-weight: 500;
    }
  }

  .insert-in-grid {
    margin: 0 auto;
    border-top: none;

    .form-title {
      position: unset;
      padding-left: 0;
    }
    .form-grid {
      margin-top: 25px;
    }
  }

  .input-radio-container{
    width: 100%;
    border: none;
    box-shadow: 0px 1px 6px rgba(0,0,0,.16);
    border-radius: 10px;
    text-indent: 6px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;

    .label-container{
      display: block;
      position: relative;
      padding-left: 15px;
      cursor: pointer;
      font-size: 1.3em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin-right: 20px;

      span{
        cursor: pointer;
        font-size: 1.1em;
      }

      input{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkradio{
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 0;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: 2px solid ${themeConsts.secondaryBlue};
        background-color: transparent;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .label-span{
        padding-left:6px;
      }
    }

    .label-container:hover .checkradio{
      background-color:${themeConsts.secondaryBlue};
    }

    .checkradio.checked {
    background-color: ${themeConsts.secondaryBlue};
    }

  }
`;
