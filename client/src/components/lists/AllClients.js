import React from 'react';
import { AllClientsDiv } from '../../styles/listings';
import ClientsListContainer from '../../containers/tables/ClientsListContainer';
import ClientDetailContainer from '../../containers/details/ClientDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import { FiUserPlus, FiSearch } from 'react-icons/fi';

export const AllClients = props => {
  return (
    <AllClientsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Clientes</h4>
          <FiSearch /> {props.userRole === 3 || props.userRole === 2 ? <div className="tooltip-container"><span className="tooltip">Adicionar Cliente</span><FiUserPlus /></div> : null}
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'clientsoptions'}
          activeClient={props.activeClient}
          clientContent={props.clientContent}
          isLoading={props.isLoading}
          deleteActiveTask={props.deleteActiveTask}
          duplicateActiveTask={props.duplicateActiveTask}
          editActiveTask={props.editActiveTask}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <ClientsListContainer
              type="allclients"
              changeActiveClient={props.changeActiveClient}
              activeClient={props.activeClient}
              copyAlert={props.copyAlert}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
          <ClientDetailContainer
            activeClient={props.activeClient}
            clientContent={props.clientContent}
            changeActiveTab={props.changeActiveTab}
            activeTab={props.activeTab}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </AllClientsDiv>
  );
};

export default AllClients;
