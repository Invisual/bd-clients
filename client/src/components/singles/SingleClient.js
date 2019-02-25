import React, { Component } from 'react';
import { SingleClientDiv } from '../../styles/singles';
import { Line } from 'rc-progress';
import moment from 'moment';
import 'moment/locale/pt';

class SingleClient extends Component {
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
            {this.props.monthly_hours !== '0' ? (
              <>
                <div className="hours-progress">
                  <Line percent={hour_percentage} strokeWidth="10" strokeColor={hour_percentage >=100 ? "#F50057" : hour_percentage === 0 ? "#d2fbf0" : "#1de9b6"} trailColor="#d2fbf0" trailWidth="10" />
                </div>
                <div className="client-hours">
                  <span>
                    {moment.duration(this.props.total_hours, 'hours').format('*HH:mm', {
                      forceLength: true
                    })}
                    /
                  </span>
                  <span>
                    {this.props.monthly_hours}h
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="hours-progress" />
                <div className="client-hours" />
              </>
            )}
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
