import React, { Component } from 'react'
import { Options } from '../../components/options/Options'

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
        openConcludeModal={this.props.openConcludeModal}
        openModal={this.props.openModal}
        activeItem={this.props.activeTask}
        activeType={this.props.activeType}
        itemContent={this.props.itemContent}
        billActiveItem={this.props.billActiveItem}
        unBillActiveItem={this.props.unBillActiveItem}
        concludeActiveBudget={this.props.concludeActiveBudget}
        concluded={this.props.concluded}
        undoActiveTask={this.props.undoActiveTask}
        undoActiveProject={this.props.undoActiveProject}
        approveActiveItem={this.props.approveActiveItem}
        rejectActiveItem={this.props.rejectActiveItem}
        placeholder={this.props.placeholder}
        duplicateActiveProject={this.props.duplicateActiveProject}
      />
    )
  }
}

export default OptionsContainer
