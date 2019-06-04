import React from 'react';
import SingleMeeting from '../singles/SingleMeeting';
import moment from 'moment'

export const MyMeetings = props => {
  var content = '';
  var now = moment(new Date()).subtract(1, "days").format('Y-MM-DD');
  var nextMeetings = props.meetings ? props.meetings.filter(meeting => {
    return meeting.start > now
  }) : props.meetings
  
  switch (props.type) {
    case 'allmeetings':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? 
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          : 
            props.nextMeetings ? (
              nextMeetings.map(meeting => {
                return (
                  <SingleMeeting
                    key={meeting.id_meeting}
                    id={meeting.id_meeting}
                    title={meeting.title}
                    client={meeting.name_client}
                    place={meeting.place_meeting}
                    meetingType={meeting.type_meeting}
                    date={meeting.start}
                    startHour={meeting.start_hour_meeting}
                    endHour={meeting.end_hour_meeting}
                    intervenientes={meeting.intervenientes}
                    type="large"
                    deleteMeeting={props.deleteMeeting}
                  />
                );
              })
          ) : (
            <div>
              <div className="no-meeting"><div className="empty-placeholder">Não tem reuniões marcadas.</div></div>
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
