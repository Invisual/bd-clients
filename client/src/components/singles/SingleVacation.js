import React, { Component } from 'react';
import {SingleVacationDiv} from '../../styles/singles';
import { FiTrash2 } from 'react-icons/fi';
import moment from 'moment';

class SingleVacation extends Component {
    constructor(props){
        super(props);
        this.state = {
            extended: false
        }
    }

    toggleCard = (boolean) => {
        this.setState({extended: boolean})
    }
    
    render() {
        var typeDayString
        switch(Number(this.props.typeDay)){
            case 1:
                typeDayString = 'Dia todo'
            break
            case 2:
                typeDayString = 'Manhã'
            break
            case 3:
                typeDayString = 'Tarde'
            break
            default:
                typeDayString = 'Dia todo'
        }

        if(this.props.type === 'large'){
            return (
                <SingleVacationDiv className={`single-card`}>
                    <div className="vacation-card-grid">
                        <div className="user-info">
                            <img src={this.props.userAvatar} alt={this.props.userName} title={this.props.userName}/>
                            <span className="user-name">{this.props.userName}</span>
                            <span className="user-position">{this.props.userPosition}</span>
                        </div>
                        {Number(this.props.typeVac) === 1 ? 
                            <div className="vacation-info">
                                <span>{moment(this.props.startDate).format('D MMM YYYY')}</span>
                                <span className="vacation-type">{typeDayString}</span>
                            </div>
                        :
                            <div className="vacation-info">
                                 <span>{moment(this.props.startDate).format('D MMM')} - {moment(this.props.endDate).format('D MMM YYYY')}</span>
                                 <span className="vacation-type">{moment(this.props.endDate).diff(moment(this.props.startDate), 'days')} dias</span>
                            </div>
                        }
                        <div className="vacation-actions">
                            {Number(this.props.userRole) === 2 || Number(this.props.userRole) === 3 ?
                                <FiTrash2 onClick={() => this.props.deleteVacation(this.props.id)}/>
                            : null }
                        </div>
                    </div>    
                </SingleVacationDiv>
            );
        }
        else if(this.props.type === 'small'){
            return (
                <SingleVacationDiv className={`single-card`}>
                    <div className="vacation-card-grid small-vacations-card">
                        <div className="user-info">
                            <img src={this.props.userAvatar} alt={this.props.userName} title={this.props.userName}/>
                            <span className="user-position">{this.props.userPosition}</span>
                        </div>
                        {Number(this.props.typeVac) === 1 ? 
                            <div className="vacation-info">
                                <span>{moment(this.props.startDate).format('D MMM YYYY')}</span>
                                <span className="vacation-type">{typeDayString}</span>
                            </div>
                        :
                            <div className="vacation-info">
                                 <span>{moment(this.props.startDate).format('D MMM')} - {moment(this.props.endDate).format('D MMM YYYY')}</span>
                                 <span className="vacation-type">{moment(this.props.endDate).diff(moment(this.props.startDate), 'days')} dias</span>
                            </div>
                        }
                    </div>    
                </SingleVacationDiv>
            );
        }
    }
}

export default SingleVacation;
