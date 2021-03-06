import React, { Component } from 'react'
import SideBar from './components/navigation/SideBar'
import TopBarContainer from './containers/navigation/TopBarContainer'
import LoginContainer from './containers/auth/LoginContainer'
import ResetPasswordContainer from './containers/auth/ResetPasswordContainer'
import AllClientsContainer from './containers/lists/AllClientsContainer'
import AllTeamContainer from './containers/lists/AllTeamContainer'
import RecordsContainer from './containers/lists/RecordsContainer'
import CreateClientContainer from './containers/inserts/CreateClientContainer'
import CreateUserContainer from './containers/inserts/CreateUserContainer'
import CreateClientInfoContainer from './containers/inserts/CreateClientInfoContainer'
import './styles/main.css'
import './styles/queries.css'
import { Switch, Route } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('pt')

class App extends Component {
  render() {
    return (
      <>
        {this.props.loggedIn ? (
          <div className="app-container">
            <TopBarContainer
              canGoBack={this.props.canGoBack}
              userInfo={this.props.userInfo}
              openModal={this.props.openModal}
              logout={this.props.logout}
              isAccountDashboard={this.props.isAccountDashboard}
              changeIsAccountDashboard={this.props.changeIsAccountDashboard}
            />
            <SideBar
              userInfo={this.props.userInfo}
              logout={this.props.logout}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <AllClientsContainer
                    isShare={false}
                    userInfo={this.props.userInfo}
                    logout={this.props.logout}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/clients"
                render={props => (
                  <AllClientsContainer
                    isShare={false}
                    userInfo={this.props.userInfo}
                    logout={this.props.logout}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/clients/:id"
                render={props => (
                  <AllClientsContainer
                    isShare={true}
                    userInfo={this.props.userInfo}
                    {...props}
                  />
                )}
              />
              <Route
                key="all-team"
                exact
                path="/team"
                render={props => (
                  <AllTeamContainer
                    userInfo={this.props.userInfo}
                    isShare={false}
                    {...props}
                    openModal={this.props.openModal}
                  />
                )}
              />
              <Route
                key="all-team-id"
                exact
                path="/team/:id"
                render={props => (
                  <AllTeamContainer
                    userInfo={this.props.userInfo}
                    isShare={true}
                    {...props}
                    openModal={this.props.openModal}
                  />
                )}
              />
              <Route
                key="records"
                exact
                path="/records"
                render={props => (
                  <RecordsContainer userInfo={this.props.userInfo} {...props} />
                )}
              />
              <Route
                exact
                path="/createclient"
                render={props => (
                  <CreateClientContainer
                    {...props}
                    type="add"
                    title="Novo Cliente"
                  />
                )}
              />
              <Route
                path="/createclient/:id"
                render={props => (
                  <CreateClientContainer
                    {...props}
                    type="edit"
                    title="Editar Cliente"
                  />
                )}
              />
              <Route
                path="/createclientinfo/:id"
                render={props => (
                  <CreateClientInfoContainer
                    {...props}
                    type="edit"
                    title="Editar Infos do Cliente "
                  />
                )}
              />
              <Route
                exact
                path="/createuser"
                render={props => (
                  <CreateUserContainer
                    {...props}
                    type="add"
                    title="Novo Utilizador"
                  />
                )}
              />
              <Route
                path="/createuser/:id"
                render={props => (
                  <CreateUserContainer
                    {...props}
                    type="edit"
                    title="Editar Utilizador"
                  />
                )}
              />
            </Switch>
          </div>
        ) : (
          <div className="app-container">
            <Switch>
              <Route
                exact
                path="/respasstar/:user/:randomstring"
                render={props => <ResetPasswordContainer {...props} />}
              />
              <Route
                path="/"
                render={props => (
                  <LoginContainer {...props} login={this.props.login} />
                )}
              />
            </Switch>
          </div>
        )}
      </>
    )
  }
}

export default App
