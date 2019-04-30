import React, { Component } from 'react';
import { AllMeetings } from '../../components/lists/AllMeetings';
import moment from 'moment';

const axios = require('axios');

class AllMeetingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDay: moment(new Date()).format('Y-MM-DD'),
      meetings: [],
      isLoading: true
    };
  }

  changeActiveDay = day => {
    this.setState({ activeDay: day });
  };

  getMeetings = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/meetings/`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nomeeting') {
        this.setState({ meetings: null, isLoading: false });
      } else {
        this.setState({ meetings: res.data, isLoading: false });
      }
    });
  };

  componentDidMount() {
    this.getMeetings();
  }

  render() {
    return (
      <AllMeetings
        userRole={this.props.userInfo.ref_id_role}
        meetings={this.state.meetings}
        isLoading={this.state.isLoading}
        activeDay={this.state.activeDay}
        changeActiveDay={this.changeActiveDay}
      />
    );
  }
}

export default AllMeetingsContainer;
