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
        memberContent={this.props.memberContent}
        projectContent={this.props.projectContent}
        deleteActiveTask={this.props.deleteActiveTask}
        deleteActiveProject={this.props.deleteActiveProject}
        duplicateActiveTask={this.props.duplicateActiveTask}
        deleteActiveMember={this.props.deleteActiveMember}
        filtersAreActive={this.props.filtersAreActive}
        changeFiltersAreActive={this.props.changeFiltersAreActive}
        changeInfosAreActive={this.props.changeInfosAreActive}
        filters={this.props.filters}
        getNumberOfActiveFilters={this.props.getNumberOfActiveFilters}
        activeBudget={this.props.activeBudget}
        budgetContent={this.props.budgetContent}
        deleteActiveBudget={this.props.deleteActiveBudget}
        activeTab={this.props.activeTab}
      />
    );
  }
}

export default OptionsContainer;
