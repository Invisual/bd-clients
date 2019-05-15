import React, { Component } from 'react';
import { TeamList } from '../../components/tables/TeamList';
const axios = require('axios');

class TeamListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      counter: 0,
      isLoading: true
    };
  }


  getMembers = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;

    axios.get(`/api/users`, { headers: { Authorization: AuthStr } }).then(res => {
      if (res.data === 'nodata') {
        this.setState({ members: null, isLoading: false })
      } else {
        this.setState({ members: res.data, isLoading: false })
      }
    });
  };

  componentDidMount() {
    this.getMembers();
  }

  render() {
    var filteredMembers = this.state.members.filter(member => {
      return this.props.searchQuery === '' ? true : member.name_user.toLowerCase().includes(this.props.searchQuery.toLowerCase())
    })
    return (
      <TeamList
        members={filteredMembers}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveMember={this.props.changeActiveMember}
        activeMember={this.props.activeMember}
      />
    );
  }
}

export default TeamListContainer;
