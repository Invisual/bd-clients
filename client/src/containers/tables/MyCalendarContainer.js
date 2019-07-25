import React, { Component } from 'react'
import { MyCalendar } from '../../components/tables/MyCalendar'
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
              ) && meeting.type_meeting === 2
            ) !== undefined;

            let hasTaskDeadlineOnThisDay = this.props.meetings.find(meeting =>
              moment(meeting.deadline_date_task).isSame(date)
            ) !== undefined;

            let eventsOnThisDay = this.props.meetings.filter(event => {
              return moment(date).isBetween( moment(event.start), moment(event.end), null,"[]") || moment(event.deadline_date_task).isSame(date)
            })



            let mapEventsOnThisDay = eventsOnThisDay.map(event => {

              var meetingType = 'Reunião interna'
              var meetingTypeClass = 'interna'
              if(event.type_meeting === 2){ 
                  meetingType = 'Reunião externa' 
                  meetingTypeClass = 'externa'
              }
              
              var eventUsers = event.intervenientes ? event.intervenientes
              .split(';')
              .map(e => e.split(','))
              .map(avatar => {
                  return `<img key=${avatar[0]} src=${avatar[2]} alt=${avatar[1]} title=${avatar[1]} />`
              }).join('') : `<img src='${event.avatar_user}' alt='${event.name_user}' title='${event.name_user}' />`

              if(event.id_task){
                  return `
                    <a href="/tasks/${event.id_task}"><div class="modal-single-task calendar-modal-content">
                    <div class="modal-event-meta">
                      <span class="red">Deadline</span>
                      <h6 class="red">Último dia para terminar tarefa</h6>
                    </div>
                      <div class="modal-event-title">
                        <h5>${event.title_task}</h5>
                      </div>
                      <div class="modal-event-users">${eventUsers}</div>
                      <div class="modal-event-info">
                        <div class="modal-event-client">
                          <img src="/img/user.svg" alt="client" />
                          <span>${event.name_client.charAt(0).toUpperCase()+event.name_client.slice(1).toLowerCase()}</span>
                        </div>
                      </div>
                    </div></a>
                  `
              }
              else{
                  return `
                    <div class="modal-single-meeting calendar-modal-content">
                      <div class="modal-event-meta ${meetingTypeClass}">
                        <span>${event.start_hour_meeting} - ${event.end_hour_meeting}</span>
                        <h6>${meetingType}</h6>
                      </div>
                      <div class="modal-event-title">
                        <h5>${event.title}</h5>
                      </div>
                      <div class="modal-event-users">${eventUsers}</div>
                      <div class="modal-event-info">
                        <div class="modal-event-client">
                          <img src="/img/user.svg" alt="client" />
                          <span>${event.name_client.charAt(0).toUpperCase()+event.name_client.slice(1).toLowerCase()}</span>
                        </div>
                        <div class="modal-event-place">
                          <img src="/img/map-pin.svg" alt="marker" />
                          <span>${event.place_meeting}</span>
                        </div>
                      </div>
                    </div>
                  `
              }
            }).join('')

            var dayClass = '';
            dayClass += hasMeetingsOnThisDay ? 'has-meeting' : '';
            dayClass += hasOutMeetingsOnThisDay  ? ' has-out-meeting' : '';
            dayClass += hasTaskDeadlineOnThisDay  ? ' has-task-deadline' : '';
            if(this.props.type === 'allmeetings'){
              return (
                <div className={dayClass} onClick={() => this.props.changeActiveDay(moment(date).format('Y-MM-DD'))}>
                <p>{label}</p>
                </div>
              );
            }
            else if(this.props.type === 'dashboard'){
                if(this.props.isAccountDashboard){
                  return (
                    <div className={dayClass} onClick={()=> this.props.changeActiveDay(moment(date).format('Y-MM-DD'))}>
                    <p>{label}</p>
                    </div>
                  )
                }
                else{
                  return (
                    <div className={dayClass} onClick={()=>eventsOnThisDay.length > 0 ? Swal.fire({
                      title: `Eventos`,
                      html: `
                            <div class="calendar-modal-day">
                                <h3>${moment(date).format('D MMM YYYY')}</h3>
                                <h6>${moment(date).format('dddd')}</h6>
                            </div>
                            ${mapEventsOnThisDay}
                          `,
                      customClass: 'calendar-modal',
                      showCloseButton: true
                    }) : null}>
                    <p>{label}</p>
                    </div>
                  )
                }
            }
          }
        }
    }

    return <MyCalendar 
            title={this.props.title} 
            meetings={this.props.meetings} 
            type={this.props.type} 
            formats={formats} 
            customDayPropGetter={this.customDayPropGetter} 
            components={components}
            isAccountDashboard={this.props.isAccountDashboard}
            activeDay={this.props.activeDay}
            userInfo={this.props.userInfo}
          />;
  }
}

export default MyCalendarContainer;
