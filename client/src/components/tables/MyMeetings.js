import React from 'react';
import SingleMeeting from '../singles/SingleMeeting';
import { FiArrowRight } from 'react-icons/fi';

export const MyMeetings = props => {
  var content = '';
  switch (props.type) {
    case 'allmeetings':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? 
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          : 
            props.meetings ? (
              props.meetings.map(meeting => {
                return (
                  <SingleMeeting
                    key={meeting.id_meeting}
                    id={meeting.id_meeting}
                    title={meeting.title_meeting}
                    client={meeting.name_client}
                    place={meeting.place_meeting}
                    meetingType={meeting.type_meeting}
                    date={meeting.date_meeting}
                    startHour={meeting.start_hour_meeting}
                    endHour={meeting.end_hour_meeting}
                    intervenientes={meeting.intervenientes}
                    type="large"
                  />
                );
              })
          ) : (
            <div>
              <h4 className="widget-title">{props.title}</h4>
              <div className="empty-placeholder">Não tem reuniões marcadas.</div>
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
