import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import ResetPasswordContainer from './containers/auth/ResetPasswordContainer';
import AllTasksContainer from './containers/lists/AllTasksContainer';
import AllBudgetsContainer from './containers/lists/AllBudgetsContainer';
import AllProjectsContainer from './containers/lists/AllProjectsContainer';
import AllMeetingsContainer from './containers/lists/AllMeetingsContainer';
import AllClientsContainer from './containers/lists/AllClientsContainer';
import AllTeamContainer from './containers/lists/AllTeamContainer';
import AllBillingContainer from './containers/lists/AllBillingContainer';
import AllVacationsContainer from './containers/lists/AllVacationsContainer';
import AllTripsContainer from './containers/lists/AllTripsContainer';
import AllApprovalsContainer from './containers/lists/AllApprovalsContainer';
import GantTasksContainer from './containers/lists/GantTasksContainer';
import MyToDoContainer from './containers/tables/MyToDoContainer';
import CreateProjectContainer from './containers/inserts/CreateProjectContainer';
import CreateTaskContainer from './containers/inserts/CreateTaskContainer';
import CreateBudgetContainer from './containers/inserts/CreateBudgetContainer';
import CreateMeetingContainer from './containers/inserts/CreateMeetingContainer';
import CreateClientContainer from './containers/inserts/CreateClientContainer';
import CreateUserContainer from './containers/inserts/CreateUserContainer';
import CreateClientInfoContainer from './containers/inserts/CreateClientInfoContainer';
import CreateVacationContainer from './containers/inserts/CreateVacationContainer';
import CreateTripContainer from './containers/inserts/CreateTripContainer';
import CreateTaskHourContainer from './containers/inserts/CreateTaskHourContainer';
import ChatTaskContainer from './containers/chat/ChatTaskContainer';
import VacationsApprovalContainer from './containers/approvals/VacationsApprovalContainer';
import VacationsRejectContainer from './containers/approvals/VacationsRejectContainer';
import './styles/main.css';
import './styles/queries.css';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/ru';

moment.locale('pt')

class App extends Component {
  render() {
    return (
      <>
        {this.props.loggedIn ? (
          <div className="app-container">
            <TopBarContainer canGoBack={this.props.canGoBack} userInfo={this.props.userInfo} notifications={this.props.notifications} setNotificationsSeen={this.props.setNotificationsSeen} setNotificationOpened={this.props.setNotificationOpened} openModal={this.props.openModal} logout={this.props.logout} changeEditHourId={this.props.changeEditHourId}/>
            <SideBar userInfo={this.props.userInfo} logout={this.props.logout}/>
            <MyToDoContainer title="To-do List" type="complete" closeModal={this.props.closeModal} shouldTodosUpdate={this.props.shouldTodosUpdate} changeShouldTodosUpdate={this.props.changeShouldTodosUpdate}/>
            <CreateTaskHourContainer closeModal={this.props.closeModal} editHourId={this.props.editHourId} changeEditHourId={this.props.changeEditHourId}/>
            <Switch>
              <Route exact path="/" render={props => <UserDashboardContainer userInfo={this.props.userInfo} userRole={this.props.userInfo.ref_id_role} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} openModal={this.props.openModal} shouldTodosUpdate={this.props.shouldTodosUpdate} changeShouldTodosUpdate={this.props.changeShouldTodosUpdate} {...props} />} />
              <Route key="all-approvals" exact path="/approvals" render={ props => <AllApprovalsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={false} userInfo={this.props.userInfo} {...props} /> } />
              <Route key="all-approvals-id" exact path="/approvals/:type/:id" render={ props => <AllApprovalsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={true} userInfo={this.props.userInfo} {...props} /> } />
              <Route key="all-tasks" exact path="/tasks" render={ props => <AllTasksContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={false} userInfo={this.props.userInfo} {...props} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/> } />
              <Route key="concluded-tasks" exact path="/concludedtasks" render={ props => <AllTasksContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={false} concluded={true} userInfo={this.props.userInfo} {...props} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/> } />
              <Route key="concluded-tasks" exact path="/concludedtasks/:id" render={ props =><AllTasksContainer openModal={this.props.openModal} closeModal={this.props.closeModal}  isShare={true} concluded={true} userInfo={this.props.userInfo} {...props} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/> } />
              <Route exact path="/tasks/:id" render={props => <AllTasksContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={true} userInfo={this.props.userInfo} {...props}  activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/>} />
              <Route exact path="/budgets" render={props => <AllBudgetsContainer isShare={false} userInfo={this.props.userInfo} {...props}  activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/>} />
              <Route exact path="/budgets/:id" render={props => <AllBudgetsContainer isShare={true} userInfo={this.props.userInfo} {...props} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} activeBudgetHours={this.props.activeBudgetHours} getActiveBudgetHours={this.props.getActiveBudgetHours}/>} />
              <Route key="all-projects" exact path="/projects" render={ props => <AllProjectsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={false} userInfo={this.props.userInfo} {...props}/> } />
              <Route key="concluded-projects" exact path="/concludedprojects" render={ props=> <AllProjectsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={false} concluded={true} userInfo={this.props.userInfo} {...props}/> } />
              <Route key="concluded-projects-id" exact path="/concludedprojects/:id" render={ props => <AllProjectsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={true} concluded={true} userInfo={this.props.userInfo} {...props}/> } />
              <Route exact path="/projects/:id" render={props => <AllProjectsContainer openModal={this.props.openModal} closeModal={this.props.closeModal} isShare={true} userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/meetings" render={props => <AllMeetingsContainer userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/meetings/:date" render={props => <AllMeetingsContainer userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/clients" render={props => <AllClientsContainer isShare={false} userInfo={this.props.userInfo} logout={this.props.logout} {...props} />} />
              <Route exact path="/clients/:id" render={props => <AllClientsContainer isShare={true} userInfo={this.props.userInfo} {...props} />} />
              <Route path="/admin" render={props => <GantTasksContainer {...props} />} />
              <Route exact path="/billing" render={props => <AllBillingContainer userInfo={this.props.userInfo} isShare={false} {...props} />} />
              <Route exact path="/billing/:type/:id" render={props => <AllBillingContainer userInfo={this.props.userInfo} isShare={true} {...props} />} />
              <Route key="all-team" exact path="/team" render={props => <AllTeamContainer userInfo={this.props.userInfo} isShare={false} {...props} openModal={this.props.openModal} changeEditHourId={this.props.changeEditHourId} />} />
              <Route key="all-team-id" exact path="/team/:id" render={props => <AllTeamContainer userInfo={this.props.userInfo} isShare={true} {...props} openModal={this.props.openModal} changeEditHourId={this.props.changeEditHourId}/>} />
              <Route key="user-hours-tab" exact path="/team/hours/:id" render={props => <AllTeamContainer userInfo={this.props.userInfo} setActiveTab={'hours'} {...props} openModal={this.props.openModal} changeEditHourId={this.props.changeEditHourId}/>} />
              <Route exact path="/vacations" render={props => <AllVacationsContainer type="all" userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/vacations/:date" render={props => <AllVacationsContainer type="date" userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/trips" render={props => <AllTripsContainer userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/gant" render={props => <GantTasksContainer userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/chat" render={props => <ChatTaskContainer userInfo={this.props.userInfo} {...props} />} />
              <Route exact path="/createproject" render={props => <CreateProjectContainer {...props} type="add" title="Novo Projeto"/>} />
              <Route path="/createproject/:id" render={props => <CreateProjectContainer {...props} type="edit" title="Editar Projeto"/>} />
              <Route exact path="/createtask" render={props => <CreateTaskContainer {...props} type="add" title="Nova Tarefa"/>} />
              <Route path="/createtask/:id" render={props => <CreateTaskContainer {...props} type="edit" title="Editar Tarefa"/>} />
              <Route exact path="/createbudget" render={props => <CreateBudgetContainer {...props} type="add" title="Novo Orçamento"/>} />
              <Route path="/createbudget/:id" render={props => <CreateBudgetContainer {...props} type="edit" title="Editar Orçamento"/>} />
              <Route exact path="/createmeeting" render={props => <CreateMeetingContainer {...props} type="add" title="Nova Reunião"/>} />
              <Route path="/createmeeting/:id" render={props => <CreateMeetingContainer {...props} type="edit" title="Editar Reunião"/>} />
              <Route exact path="/createclient" render={props => <CreateClientContainer {...props} type="add" title="Novo Cliente"/>} />
              <Route path="/createclient/:id" render={props => <CreateClientContainer {...props} type="edit" title="Editar Cliente"/>} />
              <Route path="/createclientinfo/:id" render={props => <CreateClientInfoContainer {...props} type="edit" title="Editar Infos do Cliente "/>} />
              <Route exact path="/createuser" render={props => <CreateUserContainer {...props} type="add" title="Novo Utilizador"/>} />
              <Route path="/createuser/:id" render={props => <CreateUserContainer {...props} type="edit" title="Editar Utilizador"/>} />
              <Route exact path="/createvacations" render={props => <CreateVacationContainer {...props} type="add" title="Pedir Férias"/>} />
              <Route exact path="/createtrip" render={props => <CreateTripContainer {...props} type="add" title="Adicionar Deslocação"/>} />
              <Route exact path="/createtrip/:id" render={props => <CreateTripContainer {...props} type="edit" title="Editar Deslocação"/>} />
              <Route exact path="/approvevacations/:type/:id" render={props => <VacationsApprovalContainer {...props} />} />
              <Route exact path="/rejectvacations/:type/:id" render={props => <VacationsRejectContainer {...props} />} />
            </Switch>
          </div>
        ) : (
          <div className="app-container">
          <Switch>
            
            <Route exact path="/respasstar/:user/:randomstring" render={props => <ResetPasswordContainer {...props} />} />
            <Route path="/" render={props => <LoginContainer {...props} login={this.props.login} />} />
          </Switch>
          </div>
        )}
        </>
    );
  }
}

export default App;
