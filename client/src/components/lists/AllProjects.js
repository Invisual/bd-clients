import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AllProjectsDiv } from '../../styles/listings';
import MyProjectsContainer from '../../containers/tables/MyProjectsContainer';
import ProjectDetailContainer from '../../containers/details/ProjectDetailContainer';
import OptionsContainer from '../../containers/options/OptionsContainer';
import CostsModalContainer from '../../containers/inserts/CostsModalContainer'
import ConcludeModalContainer from '../../containers/inserts/ConcludeModalContainer'
import ProjectFilters from '../options/ProjectFilters';
import { FiFolderPlus, FiFilter, FiUserCheck, FiSearch } from 'react-icons/fi';

export const AllProjects = props => {
  if (props.reloadProjects) {
    return <Redirect to='/projects' />;
  }
  
  return (
    <AllProjectsDiv className="dashboard-container">
      {props.isCostsModalOpen ? 
        <CostsModalContainer 
          closeCostsModal={props.closeCostsModal} 
          projId={props.activeProject} 
          type={props.costsModalType} 
          costs={props.projectContent.costs}
          getProjectDetails={props.getProjectDetails}
        />
      : 
        props.isConcludeModalOpen ? 
          <ConcludeModalContainer 
            closeConcludeModal={props.closeConcludeModal} 
            projId={props.activeProject}
            projectContent={props.projectContent}
            type={props.concludeModalType} 
            getProjectDetails={props.getProjectDetails}
          /> 
        : 
          null
      }
      <div className="widgets-grid widget cards-container nofixed-height no-shadow">
        <div className="grid-widget tasks-title">
          <h4 className="widget-title">Projetos</h4>
          <div className="tooltip-container projects-search">
            <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+ ' searchinput'} onChange={props.changeSearchQuery}/>
            <FiSearch onClick={props.toggleSearchInput}/>
            <span className="tooltip">Pesquisar Projetos</span>
          </div>
          {props.userRole === 3 || props.userRole === 2 ?
            <>
            <div className="tooltip-container">
              <Link to="/createproject"><FiFolderPlus /><span className="tooltip">Adicionar Projeto</span></Link>
            </div>
            <div className="tooltip-container">
                <FiUserCheck className={props.currentProjectList === 'all' ? 'task-view-icon' : 'task-view-icon icon-selected'} onClick={props.changeCurrentProjectList}/>
                <span className="tooltip">{props.currentProjectList === 'all' ? 'Ver os meus Projetos' : 'Ver todos os Projetos'}</span>
            </div>
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Projetos</span>
            </div>
            </>
          : 
            <div className="tooltip-container filter-with-notification">
              {props.getNumberOfActiveFilters() > 0 ? <div className="notification"><span>{props.getNumberOfActiveFilters()}</span></div> : null}
              <FiFilter className={props.filtersAreActive ? 'task-filters-icon icon-selected' : 'task-filters-icon'} onClick={props.changeFiltersAreActive}/>
              <span className="tooltip">Filtrar Projetos</span>
            </div>
          }
        </div>
        <OptionsContainer
          userRole={props.userRole}
          type={'projectoptions'}
          openConcludeModal={props.openConcludeModal}
          closeConcludeModal={props.closeConcludeModal}
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
              currentProjectList={props.currentProjectList}
              activeProject={props.activeProject}
              copyAlert={props.copyAlert}
              reloadProjects={props.reloadProjects}
              searchQuery={props.searchQuery}
            />
          </div>
        </div>
        <div className="grid-widget tasks-detail">
        {props.filtersAreActive ?
          <ProjectFilters
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
            openCostsModal={props.openCostsModal}
          />
        }
        </div>
      </div>
    </AllProjectsDiv>
  );
};

export default AllProjects;
