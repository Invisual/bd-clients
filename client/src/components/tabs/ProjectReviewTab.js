import React from 'react';
import { Line } from 'rc-progress';
import { FiAlertTriangle, FiPlus, FiArrowRight } from 'react-icons/fi';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment-duration-format';

class ProjectReviewTab extends React.Component {
  render() {
    return (
      <>
        <div className="project-descr">
          <h4 className="project-descr-title">Descrição</h4>
          <div className="project-descr-text">{this.props.projectContent.details[0].briefing_project}</div>
          <div className="project-descr-cat">
            {this.props.projectContent.details[0].categories
              ? this.props.projectContent.details[0].categories.split(',').map(cat => {
                  return (
                    <div className="project-category" key={cat}>
                      {cat}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="project-extras">
          <div className="project-members-infos">
              <div className="project-account-deadline">
                 {/*<div className="project-account">
                   <div className="project-account-title">Account</div>
                   <img src={this.props.projectContent.details[0].avatar_user} alt="Avatar" />
                 </div>*/}
                 <div className="project-account">
                   <div className="project-account-title">Horas</div>
                   <span>{this.props.projectContent.details[0].total_project_hours ?
                            moment.duration(this.props.projectContent.details[0].total_project_hours, 'hours').format('*HH[h]mm[m]', {
                            forceLength: true})
                          : '00h00m'}</span>
                 </div>
                 <div className="project-deadline">
                   {' '}
                   <div className="project-deadline-title">Deadline</div>
                   <span>{moment(this.props.projectContent.details[0].deadline_project).format('D/MM/YYYY')}</span>
                 </div>
               </div>
               <div className="project-members">
                 <div className="project-members-title">Membros</div>
                 
                   {this.props.projectContent.details[0].intervenientes
                     ? <div className="project-members-avatar">
                       {this.props.projectContent.details[0].intervenientes
                         .split(';')
                         .map(e => e.split(','))
                         .map(avatar => {
                           return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} />;
                         })}
                        </div>
                     : <div>Sem intervenientes</div>}
                 </div>
          </div>
          <div className="project-status">
            <div className="project-status-title">Estado</div>
            <div className="project-tasks-progress">
              <div className="project-tasks">
                <span className="label">Totais</span>
                <span className="label-value">{this.props.projectContent.details[0].total_tasks}</span>
              </div>
              <div className="project-tasks">
                <span className="label">Curso</span>
                <span className="label-value">{this.props.projectContent.details[0].doing}</span>
              </div>
              <div className="project-tasks">
                <span className="label">Concluídas</span>
                <span className="label-value">{this.props.projectContent.details[0].concluded_tasks}</span>
              </div>
            </div>
            <div className="project-progress">
            {Number(this.props.projectContent.details[0].concluded_project) === 2 ? 
                <Line
                percent={100}
                strokeWidth="5"
                strokeColor="#1de9b6"
                trailColor="#1de9b6"
                trailWidth="5"
                />
              :
              <Line
              percent={this.props.projectContent.details[0].percentage_tasks}
              strokeWidth="5"
              strokeColor={this.props.projectContent.details[0].percentage_tasks === 0 ? this.props.projectContent.details[0].doing >0 ? "#1de9b6":"#f5f7fd"  : "#1de9b6"}
              trailColor={this.props.projectContent.details[0].percentage_tasks === 0 ? this.props.projectContent.details[0].doing >0 ? "#d2fbf0":"#f5f7fd"  : "#d2fbf0"}
              trailWidth="5"
              />
            }
            </div>
          </div>
        </div>
        {this.props.concluded && this.props.projectContent.details[0].user_approved_project ?
          <div className="project-stateinfo-section">
            <h4 className="project-stateinfo-title">Actualizações de Estado</h4>
            <div className="project-approval-user">
              <img src={this.props.projectContent.details[0].avatar_approved_user} alt={this.props.projectContent.details[0].name_approved_user} title={this.props.projectContent.details[0].name_approved_user} />
              <span className="approval-user">{this.props.projectContent.details[0].name_approved_user}</span>
              <span className="approval-date">{moment(this.props.projectContent.details[0].date_approved_project).format('D MMM YYYY')}</span>
              <span className="approval-status">Aprovado</span>
            </div>
          </div>
        :
          null
        }
        <div className="project-billing-section">
          <div className="billing-icon">
            <FiAlertTriangle color="#5e78dd" />
          </div>
          <div className="billing-title">
            <h4>Custos para Faturação</h4>
            {
            this.props.type === 'approvals'? 
              this.props.projectContent.costs ? 
              <div className="see-all-costs" onClick={() => { this.props.openCostsModal('projectlist'); this.props.openModal('costs') }}>Consulte aqui os Custos associados a este Projecto <FiArrowRight /></div>
              : <div>Sem Custos Associados.</div>
            : this.props.projectContent.costs ? 
              <div className="see-all-costs" onClick={() => { this.props.openCostsModal('projectlist'); this.props.openModal('costs') }}>Consulte aqui os Custos associados a este Projecto <FiArrowRight /></div>
              :
              <>
                <div className="billing-descr">Este Projecto ainda não tem um Registo de Custos associado.</div>
                <FiPlus className="billing-add-icon" onClick={() => {this.props.openCostsModal('project'); this.props.openModal('costs')}}/>
              </>
            }
          </div>
        </div>
      </>
    );
  }
}

export default ProjectReviewTab;
