import React, { Component } from 'react'
import { Records } from '../../components/lists/Records'
import moment from 'moment'
import 'moment/locale/pt'

const axios = require('axios')

class RecordsContainer extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      activeMonth: '',
      recordsList: [],
      monthRecords: [],
      monthsList: [],
      isLoading: true,
      redirect: false
    }
  }

  getRecords = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios
      .get(`/api/misc/records`, { headers: { Authorization: AuthStr } })
      .then(res => {
        if (this._isMounted && res.data.length > 0) {
          const months = []
          res.data.forEach(record => {
            const month = {
              id: moment(record.date_record).format('M-YYYY'),
              name: moment(record.date_record).format('MMMM YYYY')
            }
            if (months.filter(m => m.id === month.id).length === 0) {
              months.push(month)
            }
          })

          this.setState({
            recordsList: res.data,
            monthsList: months,
            activeMonth: months[0].id,
            isLoading: false
          })
        }
      })
  }

  changeActiveMonth = month => {
    if (month === this.state.activeMonth || !month) return null
    this.setState({ activeMonth: month })
  }

  componentDidMount() {
    this._isMounted = true

    if (this.props.userInfo.ref_id_role !== 0) this.setState({ redirect: true })

    this.getRecords()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeMonth !== this.state.activeMonth) {
      const records = this.state.recordsList.filter(record => {
        return (
          record.date_record &&
          moment(record.date_record).format('M-YYYY') === this.state.activeMonth
        )
      })
      this.setState({ monthRecords: records })
    }
  }

  render() {
    return (
      <Records
        records={this.state.monthRecords}
        monthsList={this.state.monthsList}
        isLoading={this.state.isLoading}
        userInfo={this.props.userInfo}
        activeMonth={this.state.activeMonth}
        changeActiveMonth={this.changeActiveMonth}
        redirect={this.state.redirect}
      />
    )
  }
}

export default RecordsContainer
