import React, { Component } from 'react';
import { TaskDetail } from '../../components/details/TaskDetail';

class TaskDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      comments: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet.',
          author: 'Tiago Ribeiro',
          date: '29/01/2019'
        },
        { id: 2, 
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ', 
          author: 'Eduardo Araújo', 
          date: '31/01/2019' },
        { id: 3, 
          text: 'Comment out', 
          author: 'Tiago Ribeiro', 
          date: '15/02/2019' }
      ]

    };
  }
  render() {
    return <TaskDetail comments={this.state.comments}/>;
  }
}

export default TaskDetailContainer;
