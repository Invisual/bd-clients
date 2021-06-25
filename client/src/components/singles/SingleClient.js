import React, { Component } from 'react';
import { SingleClientDiv } from '../../styles/singles';
import { Line } from 'rc-progress';
import moment from 'moment';
import 'moment/locale/pt';

class  SingleClient extends Component {
render() {
    var content = '';
    if (this.props.monthly_hours !== '0') {
      if (this.props.total_hours === null) {
        var hour_total = '00:00:00';
        var a = hour_total.split(':');
        var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        var hour_percentage = Math.round((seconds / (this.props.monthly_hours * 60 * 60)) * 10000) / 100;
      } else {
        hour_total = this.props.total_hours;
         a = hour_total.split(':');
         seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
         hour_percentage = Math.round((seconds / (this.props.monthly_hours * 60 * 60)) * 10000) / 100;
      }
    }

    switch (this.props.type) {
      case 'allclients':
        let active = this.props.id === this.props.activeClient ? ' active' : '';
        content = (
          <SingleClientDiv className={`single-card${active}`} onClick={() => this.props.changeActiveClient(this.props.id)}>
            <div className="client-title">{this.props.client}</div>
          </SingleClientDiv>
        );
        break;
      default:
        content = null;
    }

    return content;
  }
}

export default SingleClient;
