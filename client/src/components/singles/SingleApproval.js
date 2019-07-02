import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SingleApprovalDiv } from '../../styles/singles';
import { FiFolder, FiFileText, FiClipboard } from 'react-icons/fi';
 
class SingleApproval extends Component {
 
  render() {
    var approvalIcon = '';
    var itemLink = '';
    switch (this.props.itemType) {
      case "task":
        itemLink = '/approvals/task/'
        approvalIcon = <FiFileText />;
        break;
      case "project":
        itemLink = '/approvals/project/'
        approvalIcon = <FiFolder />;
        break;
      case "budget":
        itemLink = '/approvals/budget/'
        approvalIcon = <FiClipboard />;
        break;
      default:
        approvalIcon = <FiFolder color="#7F9AFF" />;
    }
 
    var singleContent = '';
      if (this.props.type === 'allapprovals'){
        let active = this.props.id === this.props.activeItem ? ' active' : '';
      singleContent = (
        <SingleApprovalDiv className={`single-card-task${active}`} onClick={() => this.props.changeActiveItem(this.props.id, this.props.itemType)}>
 
          <div className="approval-type-icon">{approvalIcon}</div>
          <div className="approval-title"><span className="approval-divider">{this.props.title}</span><span className="approval-client">{this.props.name_client}</span></div>
 
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