import React, {Component} from 'react'
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import moment from 'moment'
import DatePicker from 'react-date-picker'
import { FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const axios = require('axios')


class TeamMemberHoursTab extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            taskHours: [],
            budgetHours: [],
            meetingHours: [],
            date: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
            isLoading: true
        }
    }

    changeDate = val => this.setState({date: moment(val).format('YYYY-MM-DD')})

    getTaskHours = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token
        axios.get(`/api/hours/${this.props.activeMember}/${this.state.date}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if (this._isMounted) {
                if (res.data === 'nodata') {
                    this.setState({ taskHours: [], isLoading: false });
                } else {
                    this.setState({ taskHours: res.data, isLoading: false });
                }
            }
        })
    }


    getBudgetHours = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token
        axios.get(`/api/hours/budgets/${this.props.activeMember}/${this.state.date}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if (this._isMounted) {
                if (res.data === 'nodata') {
                    this.setState({ budgetHours: [], isLoading: false });
                } else {
                    this.setState({ budgetHours: res.data, isLoading: false });
                }
            }
        })
    }


    getMeetingHours = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token
        axios.get(`/api/hours/meetings/${this.props.activeMember}/${this.state.date}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if (this._isMounted) {
                if (res.data === 'nodata') {
                    this.setState({ meetingHours: [], isLoading: false });
                } else {
                    this.setState({ meetingHours: res.data, isLoading: false });
                }
            }
        })
    }


    deleteTaskHour = hourId => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
          title: 'Tem a certeza que quer eliminar este registo de Horas?',
          text: 'Esta ação é irreversível',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.value) {
            Swal.fire('Registo de Horas Eliminado', '', 'success').then(result => {
              if (result.value) {
                axios.delete(`/api/hours/${hourId}`, { headers: { Authorization: AuthStr } })
                .then(res => this.getTaskHours())
              }
            });
          }
        });
    }


    deleteBudgetHour = hourId => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
          title: 'Tem a certeza que quer eliminar este registo de Horas?',
          text: 'Esta ação é irreversível',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.value) {
            Swal.fire('Registo de Horas Eliminado', '', 'success').then(result => {
              if (result.value) {
                axios.delete(`/api/hours/budgets/${hourId}`, { headers: { Authorization: AuthStr } })
                .then(res => this.getBudgetHours())
              }
            });
          }
        });
    }


    deleteMeetingHour = hourId => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
          title: 'Tem a certeza que quer eliminar este registo de Horas?',
          text: 'Esta ação é irreversível',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.value) {
            Swal.fire('Registo de Horas Eliminado', '', 'success').then(result => {
              if (result.value) {
                axios.delete(`/api/hours/meetings/${hourId}`, { headers: { Authorization: AuthStr } })
                .then(res => this.getMeetingHours())
              }
            });
          }
        });
    }


    componentDidMount(){
        this._isMounted = true;
        this.getTaskHours()
        this.getMeetingHours()
        if(moment().isoWeekday() === 1){
            this.setState({date: moment(new Date()).subtract(3, 'days').format('YYYY-MM-DD')})
        }
        if(Number(this.state.user.id_position) === 2 || Number(this.state.user.id_position) === 3){
            this.getBudgetHours()
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.date !== this.state.date){
            this.getTaskHours()
            this.getBudgetHours()
            this.getMeetingHours()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    render(){
        return (
            <div className="user-hours-content">
                <div className="user-hours-date-title">
                    <div className="current-date">
                        <h2>{moment(this.state.date).format('DD MMM YYYY')}</h2>
                        <h4>{moment(this.state.date).format('dddd')}</h4>
                    </div>
                    <DatePicker onChange={this.changeDate} format="y-MM-dd" locale="pt-PT" value={new Date(this.state.date)} calendarIcon={<FiCalendar/>}/>
                </div>
                {this.state.isLoading ? 
                    <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
                :
                    <>
                        {this.state.taskHours.length>0 || this.state.budgetHours.length>0 || this.state.meetingHours.length>0 ?
                            <>
                                {this.state.taskHours.length>0 ?
                                    <div className="user-tasks-hours hours-block">
                                        <h4>Tarefas</h4>
                                        <div className="user-hours-list">
                                            {this.state.taskHours.map(hour => {
                                                return (
                                                    <div className="single-user-hour" key={hour.id_task_hour}>
                                                        <p className="hour-task-title">{hour.title_task}<span>{hour.name_client.charAt(0).toUpperCase()+hour.name_client.slice(1).toLowerCase()}</span></p>
                                                        <p className="hour-task-time-difference">{moment(hour.difference, 'HHmm').format('HH:mm')}</p>
                                                        <p className="hour-task-time">{moment(hour.beginning_hour, 'HHmm').format('HH:mm')}h - {moment(hour.ending_hour, 'HHmm').format('HH:mm')}h</p>
                                                        {Number(this.state.user.ref_id_role) === 2 || Number(this.state.user.ref_id_role) === 3 ?
                                                            <div className="hour-actions">
                                                                <FiEdit2 onClick={() => {this.props.changeEditHourId(hour.id_task_hour); this.props.openModal('hours')}}/>
                                                                <FiTrash2 onClick={() => this.deleteTaskHour(hour.id_task_hour)}/>
                                                            </div>
                                                        :
                                                            null
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                :
                                    null
                                }


                                {this.state.budgetHours.length>0?
                                    <div className="user-budget-hours hours-block">
                                        <h4>Orçamentos</h4>
                                        <div className="user-hours-list">
                                            {this.state.budgetHours.map(hour => {
                                                return (
                                                    <div className="single-user-hour" key={hour.id_budget_hour}>
                                                        <p className="hour-task-title">{hour.title_budget}<span>{hour.name_client.charAt(0).toUpperCase()+hour.name_client.slice(1).toLowerCase()}</span></p>
                                                        <p className="hour-task-time-difference">{moment(hour.difference, 'HHmm').format('HH:mm')}</p>
                                                        <p className="hour-task-time">{moment(hour.beginning_hour, 'HHmm').format('HH:mm')}h - {moment(hour.ending_hour, 'HHmm').format('HH:mm')}h</p>
                                                        {Number(this.state.user.ref_id_role) === 2 || Number(this.state.user.ref_id_role) === 3 ?
                                                            <div className="hour-actions">
                                                                <FiEdit2 onClick={() => {this.props.changeEditHourId(hour.id_budget_hour); this.props.openModal('hours')}}/>
                                                                <FiTrash2 onClick={() => this.deleteBudgetHour(hour.id_budget_hour)}/>
                                                            </div>
                                                        :
                                                            null
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                :
                                    null  
                                }



                                {this.state.meetingHours.length>0?
                                    <div className="user-meeting-hours hours-block">
                                        <h4>Reuniões</h4>
                                        <div className="user-hours-list">
                                            {this.state.meetingHours.map(meeting => {
                                                return (
                                                    <div className="single-user-hour" key={meeting.id_meeting_hour}>
                                                        <p className="hour-task-title">{meeting.title_meeting}<span>{meeting.name_client.charAt(0).toUpperCase()+meeting.name_client.slice(1).toLowerCase()}</span></p>
                                                        <p className="hour-task-time-difference">{moment(meeting.difference, 'HHmm').format('HH:mm')}</p>
                                                        <p className="hour-task-time">{moment(meeting.beginning_hour, 'HHmm').format('HH:mm')}h - {moment(meeting.ending_hour, 'HHmm').format('HH:mm')}h</p>
                                                        {Number(this.state.user.ref_id_role) === 2 || Number(this.state.user.ref_id_role) === 3 ?
                                                            <div className="hour-actions">
                                                                <FiEdit2 onClick={() => {this.props.changeEditHourId(meeting.id_meeting_hour); this.props.openModal('hours')}}/>
                                                                <FiTrash2 onClick={() => this.deleteMeetingHour(meeting.id_meeting_hour)}/>
                                                            </div>
                                                        :
                                                            null
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                :
                                    null  
                                }
                            </>
                        :
                            <div className="no-hours no-content">
                                <div className="empty-placeholder">Este utilizador não tem registo de Horas neste dia.</div>
                            </div>
                        }
                    </>
                    

                }
            </div>
        )
    }
}

export default TeamMemberHoursTab