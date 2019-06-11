import React, { Component } from 'react';
import { MyVacations } from '../../components/tables/MyVacations';

class MyVacationsContainer extends Component {
  render() {
    return (
      <MyVacations
        vacations={this.props.vacations}
        title={this.props.title}
        isLoading={this.props.isLoading}
        type={this.props.type}
        deleteVacation={this.props.deleteVacation}
        userRole={this.props.userRole}
      />
    );
  }
}

export default MyVacationsContainer;
