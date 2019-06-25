import React from 'react';
import SingleMember from '../singles/SingleMember';

export const TeamList = props => {
  var content = '';
  switch (props.type) {
    case 'allmembers':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? (
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          ) : props.members ? 
              props.placeholder? 
              <div>
              <div className="empty-placeholder">Sem Membros que correspodam à pesquisa.</div>
              </div>
              :(
            <div>
              <h4 className="widget-title">{props.title}</h4>
              {props.members.map(member => {
                return (
                  <SingleMember
                    key={member.id_user}
                    id={member.id_user}
                    type={props.type}
                    name={member.name_user}
                    role={member.name_position}
                    avatar={member.avatar_user}
                    activeMember={props.activeMember}
                    changeActiveMember={props.changeActiveMember}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <div className="empty-placeholder">Ainda não há Membros.</div>
            </div>
          )}
        </div>
      );
      break;
    default:
      content = '';
  }
  return content;
};
