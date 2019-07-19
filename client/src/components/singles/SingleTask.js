import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AllSingleTaskDiv, SingleTaskDiv, AllSingleBillingDiv } from '../../styles/singles';
import { FiFolder, FiClock, FiLink2, FiFileText, FiCheck } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { throws } from 'assert';

class SingleTask extends Component {
  
  render() {
    var taskColor = '';
    switch (this.props.stateVal) {
      case 1:
        taskColor = '#F50057';
        break;
      case 2:
        taskColor = '#1DE9B6';
        break;
      case 3:
        taskColor = '#651FFF';
        break;
      case 4:
        taskColor = '#0036ff';
        break;
      default:
        taskColor = '#F50057';
    }

    var projectFolder = '';
    switch (this.props.projectState) {
      case !null:
        projectFolder = <FiFolder color="#7F9AFF" />;
        break;
      case null:
        projectFolder = '';
        break;
      default:
        projectFolder = <FiFolder color="#7F9AFF" />;
    }

    var singleContent = '';
    //Verifica se está a ser renderizada na rota de todas as Tarefas
    if (this.props.type) {
      if (this.props.type === 'alltasks'){
        let active = this.props.id === this.props.activeTask ? ' active' : '';
      singleContent = (
        <AllSingleTaskDiv className={`single-card-task${active}`} taskColor={taskColor}>
          <div className="task-title task-title-client title-click" onClick={() => this.props.changeActiveTask(this.props.id)}>
            <div className="title-task">{this.props.title}</div>
            <div className="client-task">{this.props.clientName}<span>{this.props.userName}</span></div>
          </div>
          <div className="task-watch"><div className="tooltip-container"><Link to={this.props.concluded ? `/concludedprojects/`+this.props.projectState : `/projects/`+this.props.projectState}>{projectFolder}</Link><span className="tooltip">Ir para o Projeto</span></div></div>
          <div className="task-link">
          <div className="tooltip-container">
            <CopyToClipboard text={window.location.href + '/' +this.props.id} onCopy={() => this.props.copyAlert()}>
              <FiLink2 />
            </CopyToClipboard><span className="tooltip">Copiar Link</span></div>
          </div>
          {this.props.concluded ? 
          <>
          {Number(this.props.billed) === 2 ?
          <>
            <div></div>
            <div className="billed-status">
              <div className="tooltip-container"><FiCheck/><span className="tooltip">Já Faturado</span></div>
            </div>
          </>
          :
          <div className="task-watch"></div>}
          </>
          :
          <>
            <div className="task-watch">
            {this.props.userId === this.props.userInfo.id_user ? 
              <div className="tooltip-container">
                 <FiClock onClick={this.props.hourState === 1 ? () => this.props.stopCountingHours(this.props.hourId, this.props.title, this.props.id, this.props.projectState, this.props.account) : () => this.props.startCountingHours(this.props.id, this.props.title, this.props.projectState, this.props.account)} className={this.props.hourState === 1 ? 'active-clock' : 'inactive-clock'} />
              <span className="tooltip">{this.props.hourState === 1 ? "Parar contagem de horas" : "Iniciar contagem de horas"}</span>
              </div>
              : null}
            </div>
            <div className="task-state" onClick={() => this.props.changeTaskStatus(this.props.id, this.props.stateVal, this.props.projectState, this.props.account)}>
              <span>{this.props.stateTitle}</span>
            </div>
          </> }
          
        </AllSingleTaskDiv>
      );
      } else if (this.props.type === 'allbilling') {
        let active = this.props.id === this.props.activeItem ? ' active' : '';
        singleContent = (
          <AllSingleBillingDiv className={`single-card-billing${active} card-billed-border`}>
            <div className="billing-type-icon">{this.props.itemType==='task'? <FiFileText/> : <FiFolder />}</div>
            <div className="billing-title title-click" onClick={() => this.props.changeActiveItem(this.props.id, this.props.itemType)}>
              <span>{this.props.title}</span> <span className="billing-client-name">{this.props.clientName}</span>
            </div>
            <div className="billed-status">{this.props.status === 2 ?<div className="tooltip-container"><FiCheck/><span className="tooltip">Já Faturado</span></div>
              : null }</div>
          </AllSingleBillingDiv>)
      } else { // All Budgets
        let active = this.props.id === this.props.activeBudget ? ' active' : '';
      singleContent = (
        <AllSingleTaskDiv className={`single-card-task${active}`} taskColor={taskColor}>
          <div className="task-title title-click" onClick={() => this.props.changeActiveBudget(this.props.id)}>
            {this.props.title}
          </div>
          <div className="task-watch"></div>
          <div className="task-link">
          <div className="tooltip-container">
            <CopyToClipboard text={window.location.href + '/' +this.props.id} onCopy={() => this.props.copyAlert()}>
              <FiLink2 />
            </CopyToClipboard><span className="tooltip">Copiar Link</span></div>
          </div>
          <div className="task-watch">
          <div className="tooltip-container"><FiClock onClick={this.props.hourState === 1 ? () => this.props.stopCountingHours(this.props.hourId, this.props.title) : () => this.props.startCountingHours(this.props.id, this.props.title)} className={this.props.hourState === 1 ? 'active-clock' : 'inactive-clock'} />
          <span className="tooltip">{this.props.hourState === 1 ? "Parar contagem de horas" : "Iniciar contagem de horas"}</span></div></div>
          <div className="task-state" onClick={() => this.props.changeBudgetStatus(this.props.id, this.props.stateVal)}>
          <span>{this.props.stateTitle}</span>
          </div>
        </AllSingleTaskDiv>
      );
      }
      
    } else {
      //dashboard
      singleContent = (
        <SingleTaskDiv className="single-card-task" taskColor={taskColor}>
          <Link to={`/tasks/`+this.props.id}><div className="task-title">{this.props.title}</div></Link>
          <div className="task-watch"><div className="tooltip-container"><Link to={`/projects/`+this.props.projectState}>{projectFolder}</Link><span className="tooltip">Ir para o Projeto</span></div></div>
          <div className="task-watch">
          <div className="tooltip-container"><FiClock onClick={this.props.hourState === 1 ? () => this.props.stopCountingHours(this.props.hourId, this.props.title, this.props.id, this.props.projectState, this.props.account) : () => this.props.startCountingHours(this.props.id, this.props.title, this.props.projectState, this.props.account)} className={this.props.hourState === 1 ? 'active-clock' : 'inactive-clock'} />
          <span className="tooltip">{this.props.hourState === 1 ? "Parar contagem de horas" : "Iniciar contagem de horas"}</span></div></div>   
          <div className="task-state" onClick={() => this.props.changeTaskStatus(this.props.id, this.props.stateVal, this.props.projectState, this.props.account)}>
            <span>{this.props.stateTitle}</span>
          </div>
        </SingleTaskDiv>
      );
    }
    return singleContent;
  }
}

export default SingleTask;
