import React, { Component } from 'react';
import {
  BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment'
const axios = require('axios')

class ClientDataTab extends Component {
  constructor(props){
    super(props)
    this.state = {
      annualData:[]
    }
  }

  getAnnualData = () => {
    var token = JSON.parse(localStorage.getItem('token'))
    var AuthStr = 'Bearer ' + token
    axios.get(`/api/clients/annual/${this.props.clientContent.details[0].id_client}`, { headers: { Authorization: AuthStr } }).then(res => {
      this.setState({ annualData: res.data});
    });
  }
  componentDidMount(){
    this.getAnnualData()
  }

  render() {
    return (

      <div>
        <BarChart
          width={500}
          height={300}
          data={this.state.annualData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="mes" />
          <YAxis type="number" domain={[0,Number(this.props.clientContent.details[0].monthly_hours_client)]}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="horas" fill={"red"}>
          <LabelList dataKey="horas" position="top" />
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default ClientDataTab;
