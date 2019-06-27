import React from 'react'
import moment from 'moment'
import { Circle } from 'rc-progress'
import { FiCheckCircle, FiMinusCircle } from 'react-icons/fi';
import { UserVacationsDiv } from '../../styles/listings'

export const TeamMemberVacationsTab = props => {
  var approved = props.memberContent.vacations.filter(vac => Number(vac.management_approval) === 2)
  var awaiting = props.memberContent.vacations.filter(vac => Number(vac.management_approval) === 1)
  var refused = props.memberContent.vacations.filter(vac => Number(vac.management_approval) === 0)
  var getSingleDayType = function(type){
    var string = ''
    switch (Number(type)){
      case 1:
        string = 'o dia todo'
      break;
      case 2:
        string = 'de manhã'
      break;
      case 3:
        string = 'de tarde'
      break;
      default:
        string = 'o dia todo'
    }
    return string
  }
  console.log(props.memberContent.details)
  return (
    <UserVacationsDiv 
      title={'dias'} 
      days={props.memberContent.details[0].free_days_user} 
      className="user-vacations-content"
    >
      
      <div className="vacations-grid">

        <div className="vacations-info vacations-section">
          <h3>Dias Disponíveis</h3>
          <div className="vacations-days-counter">
            <Circle 
              percent={props.memberContent.details[0].free_days_user * 100 / props.memberContent.details[0].total_free_days} 
              strokeWidth="8" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="8" 
            />
          </div>
          <div className="vacations-info-meta">
            <p>Férias: {props.memberContent.details[0].total_free_days} dias</p>
            <p>Gozados: {props.memberContent.details[0].total_free_days - props.memberContent.details[0].free_days_user} dias</p>
            <p>Disponíveis: {props.memberContent.details[0].free_days_user} dias</p>
          </div>
        </div>

        <div className="approved-vacations vacations-section">
          <h3>Marcadas</h3>
          {approved.length > 0 ? 
            <div className="list-singles-vacation">
              {approved.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation approved-vac">
                      <FiCheckCircle/>
                      {Number(vac.type_vacation) === 1 ? 
                        <span>{moment(vac.start_date).format('D MMM YYYY')} <span className="vacation-type">{getSingleDayType(vac.type_single_day)}</span></span>
                      :
                        <span>{moment(vac.start_date).format('D MMM YYYY')} a {moment(vac.end_date).format('D MMM YYYY')}</span>
                      }
                  </div>
                )
              })}
            </div>
          :
            <p>Este utilizador não tem férias marcadas.</p>
          }
        </div>

      </div>


      <div className="vacations-grid vacations-grid-border">
      
        <div className="refused-vacations vacations-section">
          <h3>Pedidos Rejeitados</h3>
          {refused.length > 0 ? 
            <div className="list-singles-vacation">
              {refused.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation approved-vac">
                      <FiMinusCircle/>
                      {Number(vac.type_vacation) === 1 ? 
                        <span>{moment(vac.start_date).format('D MMM YYYY')} <span className="vacation-type">{getSingleDayType(vac.type_single_day)}</span></span>
                      :
                        <span>{moment(vac.start_date).format('D MMM YYYY')} a {moment(vac.end_date).format('D MMM YYYY')}</span>
                      }
                  </div>
                )
              })}
            </div>
          :
            <p>Este utilizador não tem pedidos rejeitados.</p>
          }
        </div>

        <div className="awaiting-vacations vacations-section">
          <h3>Em Aprovação</h3>
          {awaiting.length > 0 ? 
            <div className="list-singles-vacation">
              {awaiting.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation approved-vac">
                      <img src="/img/hourglass.svg" alt="Em aprovação" />
                      {Number(vac.type_vacation) === 1 ? 
                        <span>{moment(vac.start_date).format('D MMM YYYY')} <span className="vacation-type">{getSingleDayType(vac.type_single_day)}</span></span>
                      :
                        <span>{moment(vac.start_date).format('D MMM YYYY')} a {moment(vac.end_date).format('D MMM YYYY')}</span>
                      }
                  </div>
                )
              })}
            </div>
          :
            <p>Este utilizador não tem pedidos a aguardar aprovação.</p>
          }
        </div>

      </div>

    </UserVacationsDiv>
  )
}