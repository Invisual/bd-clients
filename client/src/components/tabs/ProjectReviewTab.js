import React from 'react';
import { Line } from 'rc-progress';
import { FiAlertTriangle } from 'react-icons/fi';
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
                 <div className="project-account">
                   <div className="project-account-title">Account</div>
                   <img src={this.props.projectContent.details[0].avatar_user} alt="Avatar" />
                 </div>
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
                 <div className="project-members-avatar">
                   {this.props.projectContent.details[0].intervenientes
                     ? this.props.projectContent.details[0].intervenientes
                         .split(';')
                         .map(e => e.split(','))
                         .map(avatar => {
                           return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} />;
                         })
                     : null}
                 </div>
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
              <Line
                percent={this.props.projectContent.details[0].percentage_tasks}
                strokeWidth="5"
                strokeColor="#1de9b6"
                trailColor="#d2fbf0"
                trailWidth="5"
              />
            </div>
          </div>
        </div>
        <div className="project-billing-section">
          <div className="billing-icon">
            <FiAlertTriangle color="#5e78dd" />
          </div>
          <div className="billing-title">
            <h4>Custos para Faturação</h4>
            <div className="billing-descr">Esta Tarefa ainda não tem um Registo de Custos associado.</div>
          </div>
          <div className="billing-icon">
            <FiAlertTriangle color="#5e78dd" />
          </div>
          <div className="billing-title">
            <h4>Observações para Faturação</h4>
            <div className="billing-descr">Esta Tarefa não tem qualquer Observação para Faturação.</div>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectReviewTab;
