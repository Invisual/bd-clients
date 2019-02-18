import React, { Component } from 'react';
import { ProjectOptions } from '../../components/options/ProjectOptions';

class ProjectOptionsContainer extends Component {
  render() {
    return (
      <ProjectOptions
        userRole={this.props.userRole}
        isLoading={this.props.isLoading}
        projectContent={this.props.projectContent}
        deleteActiveTask={this.props.deleteActiveTask}
        duplicateActiveTask={this.props.duplicateActiveTask}
        editActiveTask={this.props.editActiveTask}
      />
    );
  }
}

export default ProjectOptionsContainer;
