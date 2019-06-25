import React, { Component } from 'react';
import { TeamList } from '../../components/tables/TeamList';
const axios = require('axios');

class TeamListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      filteredMembers: [],
      placeholder: false,
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
        this.setState({ members: res.data, filteredMembers: res.data, isLoading: false })
      }
    });
  };

  filterMembers = () => {
    this.setState({filteredMembers :this.state.members.filter(member => {
      return this.props.searchQuery === '' ? true : member.name_user.toLowerCase().includes(this.props.searchQuery.toLowerCase())
      })
    },()=>{
      if(this.state.filteredMembers.length > 0){
        this.setState({placeholder: false})
      } else {this.setState({placeholder: true})}
    })
  }

  componentDidMount() {
    this.getMembers();
  }

  componentDidUpdate(prevProps){
    if (prevProps.reloadMembers !== this.props.reloadMembers) {
      this.getMembers()
    }
    if(prevProps.searchQuery !== this.props.searchQuery){
      this.filterMembers()
    }
  }

  render() {
    return (
      <TeamList
        members={this.state.filteredMembers}
        type={this.props.type}
        isLoading={this.state.isLoading}
        changeActiveMember={this.props.changeActiveMember}
        activeMember={this.props.activeMember}
        placeholder={this.state.placeholder}
      />
    );
  }
}

export default TeamListContainer;
