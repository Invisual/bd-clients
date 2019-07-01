import React from 'react'
import { AllTripsDiv } from '../../styles/listings';
import { FiPlusCircle, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const AllTrips = props => {
    return (
        <AllTripsDiv className="dashboard-container">
            <div className="cards-container no-shadow nofixed-height trips-container">
                <div className="trips-row row-title">
                    <h4 className="widget-title">Deslocações</h4>
                    <div className="trips-actions">
                    <div className="tooltip-container">
                        <Link to="/createtrip">
                            <FiPlusCircle />
                            <span className="tooltip">Adicionar Deslocação</span>
                        </Link>
                    </div>
                    </div>
                </div>
                {props.isLoading ?
                    <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
                :
                    props.trips.length > 0 ?
                        <div className="trips-container-grid">
                            <div className="trips-row trips-content">
                                {props.trips.map(trip => {
                                    return (
                                        <div className="single-trip single-card" key={trip.id_trip}>
                                            <div className="trip-grid">
                                                
                                                <div className="trip-user">
                                                    <img src={trip.avatar_user} alt={trip.name_user} title={trip.name_user} />
                                                </div>

                                                <div className="trip-info">
                                                    <div className="trip-date-time">
                                                        <h5>{moment(trip.date_trip).format('DD MMM YYYY')}</h5>
                                                        <span className="trip-hours">{trip.start_hour} - {trip.end_hour}</span>
                                                    </div>
                                                    <p>{trip.description_trip}</p>
                                                    <div className="trip-meta">
                                                        <span className="trip-kms">{trip.kms_trip} kms</span>
                                                        <span className="trip-vehicle">{trip.name_vehicle}</span>
                                                    </div>
                                                </div>

                                                {Number(props.userInfo.ref_id_role) === 2 || Number(props.userInfo.ref_id_role) === 3 ?
                                                    <div className="trip-actions">
                                                        <Link to={`createtrip/${trip.id_trip}`}><FiEdit3 /></Link>
                                                        <FiTrash2 onClick={() => props.deleteTrip(trip.id_trip)}/>
                                                    </div>
                                                :
                                                    null
                                                }

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="trips-row car-mileage">
                                <div className="mileage-content">
                                    <h2>{props.trips[props.trips.length-1].end_kms} km</h2>
                                    <p> Quilometragem atual</p>
                                </div>
                                <div className="mileage-background"></div>
                            </div>
                        </div>
                    :
                        <div className="no-trips no-content"><div className="empty-placeholder">Ainda não existem registos de Deslocações.</div></div>
                    }
            </div>
        </AllTripsDiv>
    )
}