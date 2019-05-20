import React from 'react';
import { FiMail, FiPhone, FiLock, FiAlertCircle } from 'react-icons/fi';

export const TeamMemberInfoTab = props => {
  var noInfo = 'Informação indisponível';
  return (
    <div className="user-info-content">
      <div className="user-info-basic">
        <div className="user-info-email">
          <FiMail />
          <span>
            <a href={'mailto:' + props.memberContent.details[0].email_user}>
              {' '}
              {props.memberContent.details[0].email_user ? props.memberContent.details[0].email_user : noInfo}
            </a>
          </span>
        </div>
        <div className="user-info-phone">
          <FiPhone />
          <span> {props.memberContent.details[0].phone_user ? props.memberContent.details[0].phone_user : noInfo}</span>
        </div>
      </div>
      {props.memberContent.infos.length > 0 ? (
        <div className="user-other-infos">
          {props.memberContent.infos.map(info => (
            <div className="user-other-container" key={info.id_user_info}>
              <h3 className="user-other-infos-title">{info.user_info_title}</h3>
              <div className="user-other-padding">
                <div className="user-other-infos-email">
                  <FiMail /> {info.user_info_email}
                </div>
                <div className="user-other-infos-password">
                  <FiLock /> {info.user_info_password}
                </div>
                {info.user_info_obs ? (
                  <div className="user-other-infos-obs">
                    <FiAlertCircle /> {info.user_info_obs}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
