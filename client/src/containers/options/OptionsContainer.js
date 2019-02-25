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
        projectContent={this.props.projectContent}
        deleteActiveTask={this.props.deleteActiveTask}
        duplicateActiveTask={this.props.duplicateActiveTask}
        editActiveTask={this.props.editActiveTask}
      />
    );
  }
}

export default OptionsContainer;
