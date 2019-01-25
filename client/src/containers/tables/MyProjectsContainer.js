import React, { Component } from 'react';
import { MyProjects } from '../../components/tables/MyProjects';

class MyProjectsContainer extends Component {
  state = {
    fakeProjects: [
      {
        id: 1,
        title: 'Primeiro Projeto da INvisual',
        state: 'A Fazer',
        client: 'INvisual',
        stateval: 2
      },
      {
        id: 2,
        title: 'Segundo Projeto da INvisual',
        state: 'A Fazer',
        client: 'Adriano Carreira',
        stateval: 2
      },
      {
        id: 3,
        title: 'Terceiro Projeto da INvisual',
        state: 'Para Fazer',
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
