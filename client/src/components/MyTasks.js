import React, { Component } from 'react';
import SingleTask from './singles/SingleTask';

class MyTasks extends Component {
  render() {
      var fakeTasks = [
          {
              id:1,
              title: 'Desenhar Website',
              state: 'Para Fazer'
          },
          {
            id:2,
            title: 'Implementar Website',
            state: 'Para Fazer'
        },
        {
            id:3,
            title: 'Arranjar Imagens',
            state: 'Para Fazer'
        },
        {
            id:4,
            title: 'Resolver problemas Mobile',
            state: 'Para Fazer'
        },
        {
            id:5,
            title: 'Corrigir erros formulários',
            state: 'Para Fazer'
        },
        {
            id:6,
            title: 'Melhorar SEO website',
            state: 'Para Fazer'
        },
        {
            id:7,
            title: 'Fazer Mockup do website',
            state: 'A Fazer'
        },
      ]

    return (
      <div className="mytasks-container widget">
        <h4 className="widget-title">{this.props.title}</h4>
        {fakeTasks.map(task => {
            return <SingleTask key={task.id} id={task.id} title={task.title} state={task.state}/>
        })}
      </div>
    );
  }
}

export default MyTasks;
