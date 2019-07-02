import React, { Component } from 'react'
import { MyVacationsCalendar } from '../../components/tables/MyVacationsCalendar'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

class MyVacationsCalendarContainer extends Component {

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
    for(var i=0, count=this.props.vacations.length; i<count; i++){
      if(this.props.vacations[i].start_date === data){
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
            let hasVacationsOnThisDay =
              this.props.vacations.find(vac => {
                  if(vac.type_vacation === 1){
                    return moment(date).isSame(moment(vac.start_date))
                  }
                  else{
                    return moment(date).isBetween(
                      moment(vac.start_date),
                      moment(vac.end_date),
                      null,
                      "[]"
                    )
                  }
                }
              ) !== undefined;

            /*let vacationsOnThisDay = this.props.vacations.filter(vac => {
              return moment(date).isBetween(
                moment(vac.start_date),
                moment(vac.end_date),
                null,
                "[]"
              )
            })*/

            /*let mapVacationsOnThisDay = vacationsOnThisDay.map(vac => { 
              return `
                <div class="modal-single-vacation">
                  <h4>${vac.start_date}</h4>
                </div>
              `
            }).join('')*/

            var dayClass = '';
            dayClass += hasVacationsOnThisDay ? 'has-vacation' : '';
            if(this.props.type === 'allvacations'){
              return (
                <div className={dayClass} onClick={() => this.props.changeActiveDay(moment(date).format('Y-MM-DD'))}>
                <p>{label}</p>
                </div>
              );
            }
          }
        }
    }

    return <MyVacationsCalendar title={this.props.title} vacations={this.props.vacations} formats={formats} customDayPropGetter={this.customDayPropGetter} components={components}/>;
  }
}

export default MyVacationsCalendarContainer;
