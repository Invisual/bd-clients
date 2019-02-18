import React, { Component } from 'react';
import { ProjectDetail } from '../../components/details/ProjectDetail';

class ProjectDetailContainer extends Component {


  render() {
    return (
      <ProjectDetail
        projectContent={this.props.projectContent}
        activeProject={this.props.activeProject}
        isLoading={this.props.isLoading}
        changeActiveTab={this.props.changeActiveTab}
        activeTab={this.props.activeTab}
      />
    );
  }
}

export default ProjectDetailContainer;
