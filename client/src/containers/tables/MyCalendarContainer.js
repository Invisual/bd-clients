import React, { Component } from 'react';
import { MyCalendar } from '../../components/tables/MyCalendar';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

class MyCalendarContainer extends Component {

  changeMonthPlacement = () => {
    var monthLabel = document.querySelector('.rbc-toolbar-label');
    var container = document.querySelector('.rbc-btn-group');
    monthLabel.parentNode.removeChild(monthLabel);
    container.insertBefore(monthLabel, container.getElementsByTagName('button')[2])
  }

  replaceButtonTextWithArrows = () => {
    var container = document.querySelector('.rbc-btn-group');
    container.getElementsByTagName('button')[1].innerHTML = '<img alt="Mês Anterior" src="/img/seta-esq.svg"/>';
    container.getElementsByTagName('button')[2].innerHTML = '<img alt="Próximo Mês" src="/img/seta-dir.svg"/>';
  }

  replaceDaysWithCapitalLetter = () => {
    var divs = document.getElementsByClassName('rbc-header');
    for(var i=0, count=divs.length; i<count; i++){
      var content = divs[i].querySelector('span').innerHTML;
      divs[i].querySelector('span').innerHTML = this.getDayCapitalLetter(content);
    }
  }

  getDayCapitalLetter = (day) => {
    var dayCapitalLetter = '';
    switch(day){
      case 'Dom':
      dayCapitalLetter = 'D';
      break;
      case 'Seg':
      dayCapitalLetter = 'S';
      break;
      case 'Ter':
      dayCapitalLetter = 'T';
      break;
      case 'Qua':
      dayCapitalLetter = 'Q';
      break;
      case 'Qui':
      dayCapitalLetter = 'Q';
      break;
      case 'Sex':
      dayCapitalLetter = 'S';
      break;
      case 'Sáb':
      dayCapitalLetter = 'S';
      break;
      default:
      dayCapitalLetter = 'S'
    }
    return dayCapitalLetter;
  }

  customDayPropGetter = date => {
    const data = moment(date).format('YYYY-MM-DD');
    for(var i=0, count=this.props.meetings.length; i<count; i++){
      if(this.props.meetings[i].start === data){
        return{
          className: 'day-with-event'
        }
      }
    }
  }
  
  componentDidMount(){
    this.changeMonthPlacement();
    this.replaceButtonTextWithArrows();
    this.replaceDaysWithCapitalLetter();
  }

  render() {

    var meetings = this.props.meetings.length > 0 ? this.props.meetings : [{title: 'placeholder', start:'2019-02-02', end:'2019-02-02', allDay: true, type: 1, resource: 2, client:'Invisual', hour:'13:00', description: 'placeholder'}];

    let formats = {
      monthHeaderFormat: 'MMMM'
    }

    let components = {
        month: {
          dateHeader: ({ date, label }) => {
            let hasMeetingsOnThisDay =
              this.props.meetings.find(meeting =>
                moment(date).isBetween(
                  moment(meeting.start),
                  moment(meeting.end),
                  null,
                  "[]"
                )
              ) !== undefined;

            let hasOutMeetingsOnThisDay = this.props.meetings.find(meeting =>
              moment(date).isBetween(
                moment(meeting.start),
                moment(meeting.end),
                null,
                "[]"
              ) && meeting.type === 2
            ) !== undefined;

            let meetingsOnThisDay = this.props.meetings.filter(meeting => {
              return moment(date).isBetween(
                moment(meeting.start),
                moment(meeting.end),
                null,
                "[]"
              )
            })

            let mapMeetingsOnThisDay = meetingsOnThisDay.map(meeting => { 
              return `
                <div class="modal-single-meeting">
                  <h4>${meeting.title}</h4>
                  <p>${meeting.hour}h</p>
                </div>
              `
            }).join('')

            var dayClass = '';
            dayClass += hasMeetingsOnThisDay ? 'has-meeting' : '';
            dayClass += hasOutMeetingsOnThisDay  ? ' has-out-meeting' : '';
            if(this.props.type === 'allmeetings'){
              return (
                <div className={dayClass} onClick={() => this.props.changeActiveDay(moment(date).format('Y-MM-DD'))}>
                <p>{label}</p>
                </div>
              );
            }
            else{
              return (
                <div className={dayClass} onClick={()=>meetingsOnThisDay.length > 0 ? Swal.fire({
                  title: `Reuniões no dia ${moment(date).format('D')} de ${moment(date).format('MMMM')}`,
                  html: `${mapMeetingsOnThisDay}`
                }) : null}>
                <p>{label}</p>
                </div>
              );
            }
          }
        }
    }

    return <MyCalendar title={this.props.title} meetings={this.props.meetings} formats={formats} customDayPropGetter={this.customDayPropGetter} components={components}/>;
  }
}

export default MyCalendarContainer;
