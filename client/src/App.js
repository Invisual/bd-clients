import React, { Component } from 'react';
import SideBar from './components/navigation/SideBar';
import TopBarContainer from './containers/navigation/TopBarContainer';
import UserDashboardContainer from './containers/dashboard/UserDashboardContainer';
import AdminDashboardContainer from './containers/dashboard/AdminDashboardContainer';
import LoginContainer from './containers/auth/LoginContainer';
import ResetPasswordContainer from './containers/auth/ResetPasswordContainer';
import AllTasksContainer from './containers/lists/AllTasksContainer';
import AllProjectsContainer from './containers/lists/AllProjectsContainer';
import MyToDoContainer from './containers/tables/MyToDoContainer';
import CreateProjectContainer from './containers/inserts/CreateProjectContainer';
import CreateTaskContainer from './containers/inserts/CreateTaskContainer';
import './styles/main.css';
import { BrowserRouter, Route } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/ru';
moment.locale('pt')


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.loggedIn ? (
          <div className="app-container">
            <TopBarContainer userInfo={this.props.userInfo} />
            <SideBar logout={this.props.logout} />
            <Route exact path="/" render={props => <UserDashboardContainer activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours} {...props} />} />
            <Route exact path="/" render={props => <MyToDoContainer {...props} title="To-do List" type="complete"/>} />
            <Route exact path="/tasks" render={props => <AllTasksContainer isShare={false} userInfo={this.props.userInfo} {...props} activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours}/>} />
            <Route exact path="/tasks/:id" to="tasks" render={props => <AllTasksContainer isShare={true} userInfo={this.props.userInfo} {...props}  activeHours={this.props.activeHours} getActiveHours={this.props.getActiveHours}/>} />
            <Route exact path="/projects" render={props => <AllProjectsContainer isShare={false} userInfo={this.props.userInfo} {...props} />} />
            <Route path="/admin" render={props => <AdminDashboardContainer {...props} />} />
            <Route exact path="/createproject" render={props => <CreateProjectContainer {...props} type="add" title="Novo Projeto"/>} />
            <Route path="/createproject/:id" render={props => <CreateProjectContainer {...props} type="edit" title="Editar Projeto"/>} />
            <Route exact path="/createtask" render={props => <CreateTaskContainer {...props} type="add" title="Nova Tarefa"/>} />
            <Route path="/createtask/:id" render={props => <CreateTaskContainer {...props} type="edit" title="Editar Tarefa"/>} />
          </div>
        ) : (
          <div className="app-container">
            <Route exact path="/" render={props => <LoginContainer {...props} login={this.props.login} />} />
            <Route exact path="/respasstar/:user/:randomstring" render={props => <ResetPasswordContainer {...props} />} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
