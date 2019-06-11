import React, {Component} from 'react';
import SingleVacation from '../singles/SingleVacation';
import moment from 'moment'

class VacationsOnActiveDay extends Component{
    render(){
        var activeDayVacations = this.props.vacations ? this.props.vacations.filter(vac => {
            if(Number(vac.type_vacation) === 1){
                return moment(vac.start_date).isSame(this.props.activeDay)
            }
            else{
                return moment(this.props.activeDay).isBetween(vac.start_date, vac.end_date, 'days', true)
            }
        }) : []
        return (
                <div className="active-day-meetings-container">
                    <div className="day">
                        <h5>{moment(this.props.activeDay).format('ll')}</h5>
                        <span>{moment(this.props.activeDay).format('dddd')}</span>
                    </div>
                    <div className="meetings">
                        {activeDayVacations.length > 0 ?
                            activeDayVacations.map(vac => {
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
                                        type="small"
                                        userRole={this.props.userRole}
                                    />
                                );
                            })
                        :
                            <div className="placeholder">Não existem férias marcadas neste dia.</div>
                        }
                    </div>
                </div>
        );
    }
}

export default VacationsOnActiveDay;