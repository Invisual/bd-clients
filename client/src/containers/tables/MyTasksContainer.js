import React, { Component } from 'react';
import {MyTasks} from '../../components/tables/MyTasks';

class MyTasksContainer extends Component {
    state = {
        fakeTasks : [
            {
                id:1,
                title: 'Desenhar Website',
                state: 'Curso',
                projectState: 1,
                hourState: 1,
                stateval: 2
            },
            {
              id:2,
              title: 'Implementar Website',
              state: 'Iniciar',
              projectState: 0,
              hourState: 0,
              stateval: 1
          },
          {
              id:3,
              title: 'Arranjar Imagens',
              state: 'Iniciar',
              projectState: 1,
              hourState: 0,
              stateval: 1
          },
          {
              id:4,
              title: 'Resolver problemas Mobile',
              state: 'Pausa',
              projectState: 0,
              hourState: 0,
              stateval: 3
          },
          {
              id:5,
              title: 'Corrigir erros formulários',
              state: 'Iniciar',
              hourState: 0,
              stateval: 1
          },
        ]
    }

  render() {

    return <MyTasks tasks={this.state.fakeTasks} title={this.props.title}/>;
  }
}

export default MyTasksContainer;
