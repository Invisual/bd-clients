import React, { Component } from 'react';
import { Options } from '../../components/options/Options';

class OptionsContainer extends Component {
  render() {
    return (
      <Options
        userRole={this.props.userRole}
        type={this.props.type}
        isLoading={this.props.isLoading}
        taskContent={this.props.taskContent}
        clientContent={this.props.clientContent}
        projectContent={this.props.projectContent}
        deleteActiveTask={this.props.deleteActiveTask}
        deleteActiveProject={this.props.deleteActiveProject}
        duplicateActiveTask={this.props.duplicateActiveTask}
      />
    );
  }
}

export default OptionsContainer;
