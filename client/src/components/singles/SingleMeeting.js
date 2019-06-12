import React, { Component } from 'react';
import {AllMeetingsDiv} from '../../styles/singles';
import { FiMapPin, FiUser, FiTrash2, FiEdit3, FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import moment from 'moment';
import { Link } from 'react-router-dom';

class SingleMeeting extends Component {
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
        var user = JSON.parse(localStorage.getItem('user'));
        if(this.props.type === 'large'){
            return (
                <AllMeetingsDiv className={`single-card`}>
                    <div className="meeting-card-grid">

                        <div className="meeting-card-info">
                            <div className={'meeting-info-date meeting-type-'+this.props.meetingType}>
                                <span className="hours">{this.props.startHour} - {this.props.endHour}</span>  <span className="date">{moment(this.props.date).format('ll')}</span>
                            </div>
                            <h3>{this.props.title}</h3>
                            <div className="meeting-info-users">
                                {this.props.intervenientes? this.props.intervenientes
                                    .split(';')
                                    .map(e => e.split(','))
                                    .map(avatar => {
                                        return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} title={avatar[1]} />;
                                }): null}
                            </div>
                            <div className="meeting-info-extra">
                                <div className="meeting-extra-client"><FiUser /><span>{this.props.client}</span></div>
                                <div className="meeting-extra-place"><FiMapPin /><span>{this.props.place}</span></div>
                            </div>
                        </div>
                        
                        {Number(user.ref_id_role) === 2 || Number(user.ref_id_role) === 3 ?
                            <div className="meeting-card-actions">
                                <Link to={`createmeeting/${this.props.id}`}><FiEdit3 /></Link>
                                <FiTrash2 onClick={() => this.props.deleteMeeting(this.props.id)}/>
                            </div>
                        :
                            null
                        }

                    </div>    
                </AllMeetingsDiv>
            );
        }
        else if(this.props.type === 'small'){
            return (
                <AllMeetingsDiv className="bts1">
                    <div className={this.state.extended ? 'small-height meeting-card-grid meeting-card-small' : 'full-height meeting-card-grid meeting-card-small'}>

                        <div className="meeting-card-info">
                            <div className={'meeting-info-date meeting-type-'+this.props.meetingType}>
                                <span className="hours">{this.props.startHour} - {this.props.endHour}</span>
                            </div>
                            <h3>{this.props.title}</h3>
                                <div className={this.state.extended ? 'showfade' : 'hidefade'}>
                                    <div className="meeting-info-users">
                                        {this.props.intervenientes? this.props.intervenientes
                                            .split(';')
                                            .map(e => e.split(','))
                                            .map(avatar => {
                                                return <img key={avatar[0]} src={avatar[2]} alt={avatar[1]} title={avatar[1]} />;
                                        }): null}
                                    </div>
                                    <div className="meeting-info-extra">
                                        <div className="meeting-extra-client"><FiUser /><span>{this.props.client}</span></div>
                                        <div className="meeting-extra-place"><FiMapPin /><span>{this.props.place}</span></div>
                                    </div>
                                </div>
                        </div>
                        
                        <div className="meeting-card-actions">
                            {this.state.extended ? <FiMinusSquare onClick={() => this.toggleCard(false)}/> : <FiPlusSquare onClick={() => this.toggleCard(true)}/>}
                        </div>
                        

                    </div>    
                </AllMeetingsDiv>
            );
        }
    }
}

export default SingleMeeting;
