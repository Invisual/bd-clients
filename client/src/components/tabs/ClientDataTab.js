import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, LabelList, XAxis, Cell, Tooltip } from 'recharts';
const axios = require('axios');

class ClientDataTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualData: [],
      annualDataAll: [],
      yearSelect: new Date().getFullYear(),
      isLoading: true,
      hasNoHours: true,
      showAvencadoGraph: true,
    };
  }

  getAnnualData = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios
      .get(`/api/clients/annual/avencados/${this.props.clientContent.details[0].id_client}/${this.state.yearSelect}`, {
        headers: { Authorization: AuthStr }
      })
      .then(res => {
        this.setState({ annualData: res.data, isLoading:false })
        var hasNoHours = true
        res.data.forEach(hora => {
          if(hora.horas !== 0){
            hasNoHours = false
          }
        })
        if(hasNoHours === false){ this.setState({hasNoHours: false}) }
      });
    axios
      .get(`/api/clients/annual/${this.props.clientContent.details[0].id_client}/${this.state.yearSelect}`, {
        headers: { Authorization: AuthStr }
      })
      .then(res => {
        this.setState({ annualDataAll: res.data, isLoading:false })
        var hasNoHours = true
        res.data.forEach(hora => {
          if(hora.horas !== 0){
            hasNoHours = false
          }
        })
        if(hasNoHours === false){ this.setState({hasNoHours: false}) }
      });
  };

  changeYear = e => {
    this.setState({ yearSelect: e.target.value, hasNoHours: true, isLoading: true, annualData: [], annualDataAll: [] }, () => this.getAnnualData());
  };

  changeGraph = () => {
    this.setState({ showAvencadoGraph: !this.state.showAvencadoGraph, hasNoHours: true, isLoading: true, yearSelect: new Date().getFullYear(),  annualData: [], annualDataAll: [] }, () => this.getAnnualData());
  };
  
  componentDidMount() {
    this.getAnnualData();
  }

  render() {
    const data = this.state.annualData;
    const dataAll = this.state.annualDataAll;
    var startYear = 2018;
    var currentYear = new Date().getFullYear();
    var years = [];
    for (var i = startYear; i <= currentYear; i++) {
      years.push(i);
    }
    const CustomTooltip = tooltipProps => {
      if (tooltipProps.active) {
        if (tooltipProps.payload) {
          var hourDiference = tooltipProps.payload[0].value - Number(this.props.clientContent.details[0].monthly_hours_client);

          return (
            <div className="custom-tooltip">
              <span className="label">{tooltipProps.payload[0].payload.mes}</span>
              <span>{tooltipProps.payload[0].payload.horasExatas} horas</span>
              {Number(this.props.clientContent.details[0].monthly_hours_client) !== 0 ? (
                tooltipProps.payload[0].value > Number(this.props.clientContent.details[0].monthly_hours_client) ? (
                  <p className="desc">Este Cliente ultrapassou a sua bolsa por {hourDiference} horas.</p>
                ) : null
              ) : null}
            </div>
          );
        }
        return null;
      }
      return null;
    };

    const renderCustomizedLabel = (props) => {
      const {
        x, y, width, value,
      } = props;
      const radius = 10;
      return (
          <g>
            <circle cx={x + width / 2} cy={(y - radius)-5} r={radius} fill="transparent" stroke="#7F9AFF" />
            <text x={x + width / 2} y={(y - radius)-5} textAnchor="middle" dominantBaseline="middle">
              {value}
            </text>
          </g>
      );
    };

    return (
      <div
        style={{
          paddingBottom: '56.25%' /* 16:9 */,
          position: 'relative',
          height: 0,
          margin: '0 30px 0 0'
        }}
      >
        <div className="client-data">
        <div className="client-data-header">
            <div className="client-monthly-hours">
              {Number(this.props.clientContent.details[0].monthly_hours_client) !== 0 ? 
                <>
                <h1 className="client-hours">{this.props.clientContent.details[0].monthly_hours_client} horas</h1>
                <span className="monthly-text">Bolsa de horas em {this.state.yearSelect}</span>
                </>
                 : (
                <h3>Este cliente não tem uma bolsa de horas mensal.</h3>
              )}
            </div>
            <div className="client-data-options">
            {Number(this.props.clientContent.details[0].monthly_hours_client) !== 0 ? 
              <button onClick={this.changeGraph}>{this.state.showAvencadoGraph? 'Avença' : 'Total'}</button>
              : null}
              <div className="client-data-year">
                <select onChange={this.changeYear} defaultValue={currentYear}>
                  {years.map(year => {
                    return (
                      <option key={year} value={year} selected={year === this.state.yearSelect}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            
          </div>
          {this.state.isLoading?
          <img src="/img/loading.svg" alt="loading" className="loading-spinner" />
          
          : this.state.hasNoHours ?
          <h3>Este cliente não tem horas registadas em {this.state.yearSelect}.</h3>
          :<>
          
          {Number(this.props.clientContent.details[0].monthly_hours_client) !== 0 ? (
            <ResponsiveContainer>
              <BarChart
                data={this.state.showAvencadoGraph ? data : dataAll}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
                
              >
                
                <XAxis dataKey="mesAbrev" axisLine={false} tickLine={false} />
                <Tooltip content={CustomTooltip} cursor={{ fill: '#F5F7FD', radius:[10,10,0,0] }} />
                
                <Bar dataKey="horas" radius={[10, 10, 0, 0]} fill="#1de9b6">
                  {this.state.showAvencadoGraph? 
                  data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.horas === 0
                          ? 'black'
                          : entry.horas > Number(this.props.clientContent.details[0].monthly_hours_client)
                            ? '#f50057'
                            : '#1de9b6'
                      }
                    />
                  ))
                  : null}
                  <LabelList dataKey="horas" content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )
          : (
            <ResponsiveContainer>
              <BarChart
                data={dataAll}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                <XAxis dataKey="mesAbrev" axisLine={false} tickLine={false} />
                <Tooltip content={CustomTooltip} cursor={{ fill: '#F5F7FD', radius:[10,10,0,0] }}/>
                <Bar dataKey="horas" radius={[10, 10, 0, 0]} fill="#1de9b6">
                  <LabelList dataKey="horas" content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
          </>
          }
        </div>
      </div>
    );
  }
}

export default ClientDataTab;
