import React from 'react'
import { TopBarDiv } from '../../styles/navigation'
import { FiSearch, FiMessageCircle, FiBell, FiChevronLeft, FiFolder, FiFileText, FiCalendar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const TopBar = props => {
  var notSeenNotifications = props.notifications.filter(not => not.seen === 0)
  return (
    <TopBarDiv>
      
      <ul className="main-nav">
      {props.canGoBack ? <li className="topbar-goback"> <FiChevronLeft onClick={props.goBackHistory}/></li> : null}
        <li className="topbar-search">
          <input type="text" placeholder="Pesquisa" className={props.displaySearchInput+' searchinput'} />
          <FiSearch onClick={props.toggleSearchInput}/>
        </li>

        <li className="topbar-notifications" id="notificationsli" onClick={() => {props.showDropdownMenu(); props.setNotificationsSeen()}}>
          {notSeenNotifications.length > 0 ? 
            <div className="notification-number"><span id="notificationsnumber">{notSeenNotifications.length}</span></div>
          : null }
          <span>
            <FiBell id="notificationsicon" />
          </span>
          {props.displayDropdownNotifications ? (
            <ul className="notifications-dropdown">
              <li className="notification-header">Notificações</li>
              {props.notifications.map(notification => {
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
              })}
            </ul>
          ) : null}
        </li>

        <li className="topbar-messages" onClick={() => {props.showDropdownMenu('displayDropdownMessages')}}>
          <div className="notification-number"><span>2</span></div>
          <span>
            <FiMessageCircle />
          </span>
          {props.displayDropdownMessages ? (
            <ul>
              <li>Nada</li>
            </ul>
          ) : null}
        </li>

        <li className="topbar-avatar" onClick={() => props.showDropdownMenu('displayDropdownUser')}>
          <span>{props.userInfo.name_user}</span>
          <img
            src={props.userInfo.avatar_user}
            alt="Avatar"
            style={{ borderRadius: '50%' }}
            width="35px"
            height="35px"
          />
          {props.displayDropdownUser ? (
            <ul>
              {props.messages.map(message => {
                return (
                  <li key={message.id} id={message.id}>
                    {message.title}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </li>
      </ul>
    </TopBarDiv>
  );
};
