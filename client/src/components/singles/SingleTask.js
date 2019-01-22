import React, { Component } from 'react';
import {SingleTaskDiv} from '../../styles/singles';
import {FaStopwatch} from 'react-icons/fa';

class SingleTask extends Component {
  render() {
    return (
      <SingleTaskDiv>
        <p>{this.props.title}</p>
        <FaStopwatch />
        <div className="task-state">{this.props.state}</div>
      </SingleTaskDiv>
    );
  }
}

export default SingleTask;
