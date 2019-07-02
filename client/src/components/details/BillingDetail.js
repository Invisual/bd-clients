import React from 'react'
import { TaskDetailsDiv } from '../../styles/listings'
import moment from 'moment'
import 'moment/locale/pt'
import 'moment-duration-format'
import { Circle } from 'rc-progress'
import { FiClock, FiUser, FiUsers, FiFileText, FiFolder } from 'react-icons/fi'

export const BillingDetail = props => {
  return (
    <>
      {props.isLoading ? (
        <TaskDetailsDiv>
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
        </TaskDetailsDiv>
      ) : props.itemContent ? 
        props.placeholder?
          <div>
            <div className="no-content" />
          </div>
        :(
        <TaskDetailsDiv
          hours={
            props.itemContent.details[0].total_hours
              ? moment.duration(props.itemContent.details[0].total_hours, 'hours').format('*HH[h]mm[m]', {
                  forceLength: true
                })
              : '00h00m'
          }
        >
          <div className="task-details-grid">
            <div className="grid-item">
              <div className="task-icon">
                {props.itemContent.details[0].type=== 'task'? <FiFileText /> : <FiFolder/>}
              </div>
            </div>

            <div className="grid-item">
              <div className="task-header">
                <h4 className="task-title">{props.itemContent.details[0].title}</h4>
                <div className="task-date">
                  <FiClock /> <span>{moment(props.itemContent.details[0].conclusion_date).format('D/MM/YYYY')}</span>
                </div>
                <div className="task-infos">
                  <span>
                    <FiUser className="task-info-icon" /> {props.itemContent.details[0].name_client}
                  </span>
                  {props.itemContent.details[0].billing_name_client ?
                    <span>
                      <FiUsers className="task-info-icon" /> {props.itemContent.details[0].billing_name_client}
                    </span>
                    : null}
                </div>
              </div>
              <div className="task-descr">
                <h4 className="task-descr-title">Descrição</h4>
                <div className="task-descr-text">{props.itemContent.details[0].descr ? props.itemContent.details[0].descr : 'Sem descrição.'}</div>
              </div>
              <div className="task-descr">
                <h4 className="task-descr-title">Observações</h4>
                <div className="task-descr-text">{props.itemContent.details[0].obs ? props.itemContent.details[0].obs : 'Sem observações.'}</div>
              </div>
              <div className="task-extras">
                <div className="task-hour-container no-border">
                  <div className="task-hour-counter">
                    <Circle percent="100" strokeWidth="8" strokeColor="#1de9b6" trailColor="#d2fbf0" trailWidth="8" />
                  </div>
                </div>
              </div>
            
              <div className="billing-costs-section">
                  <h2>Registo de Custos</h2>

                {props.itemContent.costs ?  
               
                    <div className="modal-costs-listing">
                        <div className="costs-list-header">
                            <h5>Serviço</h5>
                            <h5>Fornecedor</h5>
                            <h5>Custo Fornecedor</h5>
                            <h5>Preço Venda</h5>
                            <h5>Diferença</h5>
                        </div>
                        {props.itemContent.costs.map(cost => {
                           
                            return (
                                <div className="costs-list-row" key={cost.id_cost}>
                                    <p>{cost.service}</p>
                                    <p>{cost.provider}</p>
                                    <p>{cost.cost_provider}</p>
                                    <p>{cost.price_sale}</p>
                                    <p>{cost.price_difference}</p>
                                </div>
                            )
                        })}
                    </div>
                :
                    <div>Sem custos registados</div>
                }
              </div>
            </div>
          </div>
        </TaskDetailsDiv>
      ) : (
        <div>
          <div className="no-content">
          </div>
        </div>
      )}
    </>
  );
};

export default BillingDetail;
