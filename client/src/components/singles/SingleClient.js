import React, { Component } from 'react';
import { SingleClientDiv } from '../../styles/singles';
import 'moment/locale/pt';

class  SingleClient extends Component {
render() {
    var content = '';

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
