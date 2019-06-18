import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SingleApprovalDiv } from '../../styles/singles';
import { FiFolder, FiFileText, FiClipboard } from 'react-icons/fi';
 
class SingleApproval extends Component {
 
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
 
    var approvalIcon = '';
    var itemLink = '';
    switch (this.props.itemType) {
      case "task":
        itemLink = '/concludedtasks/'
        approvalIcon = <FiFileText />;
        break;
      case "project":
        itemLink = '/concludedprojects/'
        approvalIcon = <FiFolder />;
        break;
      case "budget":
        itemLink = '/budgets/'
        approvalIcon = <FiClipboard />;
        break;
      default:
        approvalIcon = <FiFolder color="#7F9AFF" />;
    }
    var projectFolder = <FiFolder />
 
    var singleContent = '';
      if (this.props.type === 'allapprovals'){
        let active = this.props.id === this.props.activeTask ? ' active' : '';
      singleContent = (
        <SingleApprovalDiv className="single-card-task">
 
          <div className="approval-type-icon">{approvalIcon}</div>
          <div className="approval-title"><span className="approval-divider"><Link to={itemLink+this.props.id}>{this.props.title}</Link></span><span className="approval-client">{this.props.name_client}</span></div>
 
        </SingleApprovalDiv>
      );
     
    } else {
      //dashboard
      singleContent = (
        <SingleApprovalDiv className="single-card-task">
 
          <div className="approval-type-icon">{approvalIcon}</div>
          <div className="approval-title"><span className="approval-divider"><Link to={itemLink+this.props.id}>{this.props.title}</Link></span><span className="approval-client">{this.props.name_client}</span></div>
 
        </SingleApprovalDiv>
      );
    }
    return singleContent;
  }
}
 
export default SingleApproval;