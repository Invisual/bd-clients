import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AllProjectsDiv } from '../../styles/listings';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import ProjectDetailContainer from '../../containers/details/ProjectDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import Filters from '../options/Filters';
import { FiFolderPlus, FiSliders } from 'react-icons/fi';

export const AllProjects = props => {
  if (props.reloadProjects) {
    return <Redirect to='/projects' />;
  }
  
  return (
    <AllProjectsDiv className="dashboard-container">
      <div className="widgets-grid widget cards-container nofixed-height no-shadow">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Projetos</h4>
          {props.userRole === 3 || props.userRole === 2 ?
          <div className="project-icons">
            <div className="tooltip-container">
              <Link to="/createproject"><FiFolderPlus /><span className="tooltip">Adicionar Projeto</span></Link>
            </div>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiSliders className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Projetos</span>
            </div>
          </div>
          : 
            null
          }
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'projectoptions'}
          activeProject={props.activeProject}
          projectContent={props.projectContent}
          isLoading={props.isLoading}
          changeFiltersAreActive={props.changeFiltersAreActive}
          filtersAreActive={props.filtersAreActive}
          deleteActiveProject={props.deleteActiveProject}
        />
        <div className="grid-widget tasks-list">
          <div className="tasks-list-container">
            <MyProjectsContainer
              title="Tarefas"
              type="allprojects"
              changeActiveProject={props.changeActiveProject}
              filters={props.filters}
              activeProject={props.activeProject}
              copyAlert={props.copyAlert}
              reloadProjects={props.reloadProjects}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
        {props.filtersAreActive ?
          <Filters 
            type="projetos"
            changeFilters={props.changeFilters}
            changeFiltersAreActive={props.changeFiltersAreActive}
            clientsList={props.clientsList}
            billingList={props.billingList}
            accountsList={props.accountsList}
            usersList={props.usersList}
            categoriesList={props.categoriesList}
            filters={props.filters}
          />
        :
          <ProjectDetailContainer
            activeProject={props.activeProject}
            projectContent={props.projectContent}
            changeActiveTab={props.changeActiveTab}
            activeTab={props.activeTab}
            isLoading={props.isLoading}
            changeCommentVal={props.changeCommentVal}
            submitComment={props.submitComment}
          />
        }
        </div>
      </div>
    </AllProjectsDiv>
  );
};

export default AllProjects;
