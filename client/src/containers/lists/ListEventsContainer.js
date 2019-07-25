import React, { Component } from 'react';
import { ListEvents } from '../../components/lists/ListEvents';

const axios = require('axios');

class ListEventsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      tasks: [],
      isLoading: false
    };
  }

  changeActiveDay = day => {
    this.setState({ activeDay: day });
  };

  getMeetings = () => {
    this.setState({isLoading: true})
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


  getTasks = () => {
    this.setState({isLoading: true})
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/tasks/accounts/${this.props.userInfo.id_user}`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ tasks: null, isLoading: false });
      } else {
        this.setState({ tasks: res.data, isLoading: false });
      }
    });
  };


  componentDidMount() {
    this.getMeetings()
    this.getTasks()
  }

  render() {
      var tasks = this.state.tasks.filter(task => task.deadline_date_task === this.props.activeDay)
      var meetings = this.state.meetings.filter(meeting => meeting.start === this.props.activeDay)
      console.log(tasks)
      console.log(meetings)
    return (
      <ListEvents
        meetings={meetings}
        tasks={tasks}
        isLoading={this.state.isLoading}
        title={this.props.title}
        activeDay={this.props.activeDay}
      />
    );
  }
}

export default ListEventsContainer;
