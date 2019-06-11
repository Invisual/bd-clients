import React from 'react';
import SingleVacation from '../singles/SingleVacation';
import moment from 'moment'

export const MyVacations = props => {
  var content = '';
  var now = moment(new Date()).subtract(1, "days").format('Y-MM-DD');
  var nextVacations = props.vacations ? props.vacations.filter(vac => {
    if(Number(vac.type_vacation) === 1){
        return vac.start_date > now
    }
    else{
        return vac.end_date > now
    }
  }) : []
  switch (props.type) {
    case 'allvacations':
      content = (
        <div className="mytasks-container widget">
          {props.isLoading ? 
            <img src="img/loading.svg" alt="loading" className="loading-spinner" />
          : 
            nextVacations.length > 0 ? (
                nextVacations.map(vac => {
                return (
                  <SingleVacation
                    key={vac.id_vacation}
                    id={vac.id_vacation}
                    startDate={vac.start_date}
                    endDate={vac.end_date}
                    typeVac={vac.type_vacation}
                    typeDay={vac.type_single_day}
                    user={vac.ref_id_user}
                    userAvatar={vac.avatar_user}
                    userName={vac.name_user}
                    userPosition={vac.name_position}
                    type="large"
                    deleteVacation={props.deleteVacation}
                    userRole={props.userRole}
                  />
                );
              })
          ) : (
            <div>
              <div className="no-vacations"><div className="empty-placeholder">Não existem férias marcadas para este ano.</div></div>
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
