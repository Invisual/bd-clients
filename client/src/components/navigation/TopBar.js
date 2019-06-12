import React from 'react'
import { TopBarDiv } from '../../styles/navigation'
import { FiBell, FiChevronLeft, FiFolder, FiFileText, FiCalendar, FiEdit, FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const TopBar = props => {
  var notSeenNotifications = props.notifications.filter(not => not.seen === 0)
  return (
    <TopBarDiv>
      
      <ul className="main-nav">
      {props.canGoBack ? <li className="topbar-goback"> <FiChevronLeft onClick={props.goBackHistory}/></li> : null}

        <li className="topbar-todo" onClick={() => {document.body.classList.add('todo-open', 'modal-open')}}>
          <span><FiEdit/></span>
        </li>

        <li className="topbar-notifications" id="notificationsli" onClick={() => {props.showDropdownMenu(); props.setNotificationsSeen()}}>
          {notSeenNotifications.length > 0 ? 
            <div className="notification-number"><span id="notificationsnumber">{notSeenNotifications.length}</span></div>
          : null }
          <span>
            <FiBell id="notificationsicon" />
          </span>
          {props.displayDropdownNotifications ? (
            <ul className="notifications-dropdown show-notifications">
              <li className="notification-header">Notificações</li>
              {props.notifications.length > 0 ?
                props.notifications.map(notification => {
                    if(notification.type_notification === 1){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/tasks/${notification.ref_id_task}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                              <FiFileText />
                              <div className="notification-info">
                                <p>Tem uma nova Tarefa - {notification.title_task}</p>
                                <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                              </div>
                          </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 2){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/meetings/${notification.date_meeting}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                        <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                          <FiCalendar />
                          <div className="notification-info">
                            <p>Tem uma nova Reunião - {notification.title_meeting}</p>
                            <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                          </div>
                        </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 3){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/projects/${notification.ref_id_project}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                            <FiFolder />
                            <div className="notification-info">
                              <p>Um Projeto está concluído - {notification.title_project}</p>
                              <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                            </div>
                          </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 4){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/approvals/task/${notification.ref_id_task}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                            <FiFileText />
                            <div className="notification-info">
                              <p>Uma Tarefa precisa de Aprovação - {notification.title_task}</p>
                              <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                            </div>
                          </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 5){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/approvals/project/${notification.ref_id_project}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                            <FiFolder />
                            <div className="notification-info">
                              <p>Um Projeto precisa de Aprovação - {notification.title_project}</p>
                              <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                            </div>
                          </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 6){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/billing/task/${notification.ref_id_task}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                            <FiFileText />
                            <div className="notification-info">
                              <p>Uma Tarefa está pronta para Faturar - {notification.title_task}</p>
                              <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                            </div>
                          </li>
                        </Link>
                      )
                    }
                    if(notification.type_notification === 7){
                      return (
                        <Link key={notification.id_notification} className="notificationlink" to={`/billing/project/${notification.ref_id_project}`} onClick={notification.opened === 1 ? null : () => props.setNotificationOpened(notification.id_notification)}>
                          <li className={notification.opened === 1 ? 'notification opened' : 'notification'}>
                            <FiFolder />
                            <div className="notification-info">
                              <p>Um Projeto está pronta para Faturar - {notification.title_project}</p>
                              <span>{moment(notification.creation_date_notification).format('DD')} de {moment(notification.creation_date_notification).format('MMMM')}</span>
                            </div>
                          </li>
                        </Link>
                      )
                    }
                })
                :
                <li className="notification">
                  <img src="/img/frown.svg" alt="frown" className="frown-icon" />
                  <div className="notification-info">
                    <p>Ainda não tem nenhuma notificação.</p>
                  </div>
                </li>
              }
            </ul>
          ) : null}
        </li>

        <li className="topbar-avatar" onClick={() => props.showDropdownUser()}>
          <span id="topbar-user-name">{props.userInfo.name_user}</span>
          <img
            src={props.userInfo.avatar_user}
            alt="Avatar"
            style={{ borderRadius: '50%' }}
            width="35px"
            height="35px"
            id="topbar-user-img"
          />
          {props.displayDropdownUser ? (
            <ul className="notifications-dropdown show-notifications user-dropdown">
              <Link to={`/team/${props.userInfo.id_user}`}><li id="topbar-user-link1">Ver Utilizador</li></Link>
              <Link to="/createvacations"><li id="topbar-user-link2">Pedir Férias</li></Link>
              <Link to="/createtrip"><li id="topbar-user-link3">Inserir Deslocação</li></Link>
              <li id="topbar-user-link4" onClick={props.logout}>Terminar Sessão</li>
            </ul>
          ) : null}
        </li>
      </ul>
    </TopBarDiv>
  );
};
