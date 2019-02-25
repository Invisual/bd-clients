import React, { Component } from 'react';
import { MyMeetings } from '../../components/tables/MyMeetings';

const axios = require('axios');

class MyMeetingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <MyMeetings
        meetings={this.props.meetings}
        title={this.props.title}
        isLoading={this.props.isLoading}
        type={this.props.type}
      />
    );
  }
}

export default MyMeetingsContainer;
