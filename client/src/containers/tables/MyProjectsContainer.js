import React, { Component } from 'react';
import { MyProjects } from '../../components/tables/MyProjects';

class MyProjectsContainer extends Component {
  state = {
    fakeProjects: [
      {
        id: 1,
        title: 'Primeiro Projeto da INvisual',
        state: 'A Fazer',
        members: '1,2',
        client: 'INvisual',
        stateval: 2
      },
      {
        id: 2,
        title: 'Segundo Projeto da INvisual',
        state: 'A Fazer',
        members: '3,4,5',
        client: 'Adriano Carreira',
        stateval: 2
      },
      {
        id: 3,
        title: 'Terceiro Projeto da INvisual',
        state: 'Para Fazer',
        members: '6,7,8,9',
        client: 'JADE',
        stateval: 1
      }
    ]
  };

  render() {
    return <MyProjects projects={this.state.fakeProjects} title={this.props.title} />;
  }
}

export default MyProjectsContainer;
