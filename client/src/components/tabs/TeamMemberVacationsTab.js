import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

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
  return (
    <div className="user-vacations-content">
      <h1>Férias</h1>

      <div className="vacations-section available-vacation-days">
        <h2>Dias disponíveis</h2>
        <p>{props.memberContent.details[0].free_days_user}</p>
      </div>

      {props.memberContent.vacations.length > 0 ?
        <div>
          <div className="approved-vacations vacations-section">
            <h2>Férias Marcadas</h2>
            {approved.length > 0 ? 
              approved.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation approved-vac">
                      <div className="vac-ball approved-vac-ball"></div>
                      {Number(vac.type_vacation) === 1 ? 
                        <p>Dia {moment(vac.start_date).format('ll')} - {getSingleDayType(vac.type_single_day)}.</p>
                      :
                        <p>Do dia {moment(vac.start_date).format('ll')} ao dia {moment(vac.end_date).format('ll')}.</p>
                      }
                  </div>
                )
              })
            :
              <p>Não tem férias marcadas. Faça o pedido <Link to="/createvacations">aqui</Link></p>
            }
          </div>

          <div className="awaiting-vacations vacations-section">
            <h2>Pedidos a Aguardar Aprovação</h2>
            {awaiting.length > 0 ? 
              awaiting.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation awaiting-vac">
                      <div className="vac-ball awaiting-vac-ball"></div>
                      {Number(vac.type_vacation) === 1 ? 
                        <p>Dia {moment(vac.start_date).format('ll')} - {getSingleDayType(vac.type_single_day)}.</p>
                      :
                        <p>Do dia {moment(vac.start_date).format('ll')} ao dia {moment(vac.end_date).format('ll')}.</p>
                      }
                  </div>
                )
              })
            :
              <p>Não tem nenhum pedido pendente.</p>
            }
          </div>

          <div className="refused-vacations vacations-section">
            <h2>Pedidos Rejeitados</h2>
            {refused.length > 0 ? 
              refused.map(vac => {
                return (
                  <div key={vac.id_vacation} className="single-vacation refused-vac">
                      <div className="vac-ball refused-vac-ball"></div>
                      {Number(vac.type_vacation) === 1 ? 
                        <p>Dia {moment(vac.start_date).format('ll')} - {getSingleDayType(vac.type_single_day)}.</p>
                      :
                        <p>Do dia {moment(vac.start_date).format('ll')} ao dia {moment(vac.end_date).format('ll')}.</p>
                      }
                  </div>
                )
              })
            :
              <p>Não tem nenhum pedido rejeitado.</p>
            }
          </div>
        </div>
      :
          <p>Não tem nenhum dia de Férias registado nem nenhum pedido feito. Faça-o <Link to="/createvacations">aqui</Link></p>
      }

    </div>
  )
}