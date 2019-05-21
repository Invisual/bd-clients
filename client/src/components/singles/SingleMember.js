import React, { Component } from 'react';
import { SingleMemberDiv } from '../../styles/singles';

class SingleMember extends Component {
  render() {
    var content = '';
    switch (this.props.type) {
      case 'allmembers':
        let active = Number(this.props.id) === Number(this.props.activeMember) ? ' active' : '';
        content = (
          <SingleMemberDiv className={`single-card${active}`} onClick={() => this.props.changeActiveMember(this.props.id)}>
            <div className="member-avatar"><img src={this.props.avatar} alt={this.props.name} title={this.props.name}/></div>
            <div className="member-name">{this.props.name}</div>
            <div className="member-role">{this.props.role}</div>
          </SingleMemberDiv>
        );
        break;
      default:
        content = null;
    }

    return content;
  }
}

export default SingleMember;
