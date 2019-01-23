import React, { Component } from 'react';
import {MyTasks} from '../../components/tables/MyTasks';

class MyTasksContainer extends Component {
    state = {
        fakeTasks : [
            {
                id:1,
                title: 'Desenhar Website',
                state: 'A Fazer',
                stateval: 2
            },
            {
              id:2,
              title: 'Implementar Website',
              state: 'Para Fazer',
              stateval: 1
          },
          {
              id:3,
              title: 'Arranjar Imagens',
              state: 'Para Fazer',
              stateval: 1
          },
          {
              id:4,
              title: 'Resolver problemas Mobile',
              state: 'Feito',
              stateval: 3
          },
          {
              id:5,
              title: 'Corrigir erros formulários',
              state: 'Para Fazer',
              stateval: 1
          },
          {
              id:6,
              title: 'Melhorar SEO website',
              state: 'Feito',
              stateval: 3
          },
          {
              id:7,
              title: 'Fazer Mockup do website',
              state: 'A Fazer',
              stateval: 2
          },
        ]
    }

  render() {

    return <MyTasks tasks={this.state.fakeTasks} title={this.props.title}/>;
  }
}

export default MyTasksContainer;
