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
        changeCommentVal={this.props.changeCommentVal}
        submitComment={this.props.submitComment}
        openCostsModal={this.props.openCostsModal}
        openModal={this.props.openModal}
        type={this.props.type}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default ProjectDetailContainer;
