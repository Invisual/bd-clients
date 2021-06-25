import React, { Component } from 'react';
import { SingleProjectDiv, AllSingleProjectDiv, ClientProjectDiv} from '../../styles/singles';
import { Line } from 'rc-progress';
import { FiCircle, FiClock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/pt';

class SingleProject extends Component {
  render() {
    var content = '';

    switch (this.props.type) {
      case 'allprojects':
        let active = this.props.id === this.props.activeProject ? ' active' : '';
        content = (
          <AllSingleProjectDiv className={`single-card${active}`} onClick={() => this.props.changeActiveProject(this.props.id)}>
            <div className="project-header">
              <div className="project-title">
                <span className={Number(this.props.billedProject)=== 2? 'billed' : ''}>{Number(this.props.stateVal) === 2 ? <FiCircle fill="#006cff" color="#006cff" /> : this.props.percentage_tasks === 0 ? <FiCircle color="#5e78dd" /> : <FiCircle fill="#1de9b6" color="#1de9b6" />}</span>
                <span className="title-click">{this.props.title}</span>
              </div>
              <div className="project-client-date">
                <div className="project-icon-client">
                  <FiUser />
                  <span className="project-client"><Link to={`/clients/`+this.props.clientId}>{this.props.client}</Link></span>
                </div>
                <span className="project-date">
                  <FiClock /> {moment(this.props.projectDeadline).format('D/MM/YYYY')}
                </span>
              </div>
            </div>

            <div className="project-tasks-progress">
              <div className="project-tasks">
                <span className="label">Totais</span>
                <span className="label-value">{this.props.total_tasks}</span>
              </div>
              <div className="project-tasks">
                <span className="label">Curso</span>
                <span className="label-value">{this.props.doing}</span>
              </div>
              <div className="project-tasks">
                <span className="label">Concluídas</span>
                <span className="label-value">{this.props.concluded_tasks}</span>
              </div>
            </div>
            <div className="project-progress">
            {Number(this.props.stateVal) === 2 ? 
                <Line
                percent={100}
                strokeWidth="5"
                strokeColor="#1de9b6"
                trailColor="#1de9b6"
                trailWidth="5"
                />
              :
              <Line
              percent={this.props.percentage_tasks}
              strokeWidth="5"
              strokeColor={this.props.percentage_tasks === 0 ? this.props.doing >0 ? "#1de9b6":"#f5f7fd"  : "#1de9b6"}
              trailColor={this.props.percentage_tasks === 0 ? this.props.doing >0 ? "#d2fbf0":"#f5f7fd"  : "#d2fbf0"}
              trailWidth="5"
              />
            }
              
            </div>
          </AllSingleProjectDiv>
        );
        break;
      case 'clients':
        content = (
          <ClientProjectDiv className="single-card" >
            <div className={Number(this.props.billedProject)=== 2? 'project-status billed' : 'project-status'}>{Number(this.props.stateVal) === 2 ? <FiCircle fill="#006cff" color="#006cff" /> : this.props.percentage_tasks === 0 ? <FiCircle color="#5e78dd" /> : <FiCircle fill="#1de9b6" color="#1de9b6" />}</div>
            <div className="project-title">
              <span className="title-divider"><Link to={this.props.stateVal===2? `/concludedprojects/`+this.props.id:`/projects/`+this.props.id}>{this.props.title}</Link></span>{' '}
              <span className="project-participants">{this.props.intervenientes
                  ? this.props.intervenientes
                      .split(';')
                      .map(e => e.split(','))
                      .map(avatar => {
                        return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} title={avatar[1]} />;
                      })
                  : <div>Projeto ainda sem intervenientes</div>}</span>
            </div>
            <div className="project-total-tasks">{this.props.total_tasks}</div>
            <div className="project-concluded-tasks">{this.props.concluded_tasks}</div>
            <div className="task-progress">
              {Number(this.props.stateVal) === 2 ? 
                <Line
                percent={100}
                strokeWidth="10"
                strokeColor="#006cff"
                trailColor="#006cff"
                trailWidth="10"
                />
              :
                <Line
                  percent={this.props.percentage_tasks}
                  strokeWidth="10"
                  strokeColor={this.props.percentage_tasks === 0 ? "#f5f7fd" : "#1de9b6"}
                  trailColor={this.props.percentage_tasks === 0 ? "#f5f7fd" : "#d2fbf0"}
                  trailWidth="10"
                />
              }
              
            </div>
          </ClientProjectDiv>
        );
        break;
      default:
        content = (
          <SingleProjectDiv className="single-card">
            <div className="project-status">{this.props.percentage_tasks === 0 ? <FiCircle color="#5e78dd" /> : <FiCircle fill="#1de9b6" color="#1de9b6" />}</div>
            <div className="project-title">
              <span className="title-divider"><Link to={`/projects/`+this.props.id}>{this.props.title}</Link> </span>{' '}
              <span className="project-client"><Link to={`/clients/`+this.props.clientId}>{this.props.client}</Link></span>
            </div>
            <div className="project-total-tasks">{this.props.total_tasks}</div>
            <div className="project-concluded-tasks">{this.props.concluded_tasks}</div>
            <div className="task-progress">
              <Line
                percent={this.props.percentage_tasks}
                strokeWidth="10"
                strokeColor="#1de9b6"
                trailColor="#d2fbf0"
                trailWidth="10"
              />
            </div>
          </SingleProjectDiv>
        );
    }

    return content;
  }
}

export default SingleProject;
