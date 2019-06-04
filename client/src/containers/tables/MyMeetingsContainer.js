import React, { Component } from 'react';
import { MyMeetings } from '../../components/tables/MyMeetings';

class MyMeetingsContainer extends Component {
  render() {
    return (
      <MyMeetings
        meetings={this.props.meetings}
        title={this.props.title}
        isLoading={this.props.isLoading}
        type={this.props.type}
        deleteMeeting={this.props.deleteMeeting}
      />
    );
  }
}

export default MyMeetingsContainer;
