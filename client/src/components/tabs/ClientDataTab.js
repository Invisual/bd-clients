import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, LabelList, XAxis, YAxis, Cell, Tooltip } from 'recharts';
const axios = require('axios');

class ClientDataTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualData: [],
      yearSelect: new Date().getFullYear(),
      isLoading: true,
      hasNoHours: true
    };
  }

  getAnnualData = () => {
    var token = JSON.parse(localStorage.getItem('token'));
    var AuthStr = 'Bearer ' + token;
    axios
      .get(`/api/clients/annual/${this.props.clientContent.details[0].id_client}/${this.state.yearSelect}`, {
        headers: { Authorization: AuthStr }
      })
      .then(res => {
        this.setState({ annualData: res.data, isLoading:false })
        var hasNoHours = true
        res.data.map(hora => {
          if(hora.horas !== 0){
            hasNoHours = false
          }
        })
        if(hasNoHours === false){ this.setState({hasNoHours: false}) }
      });
  };

  changeYear = e => {
    this.setState({ yearSelect: e.target.value, hasNoHours: true, isLoading: true }, () => this.getAnnualData());
  };
  componentDidMount() {
    this.getAnnualData();
  }

  render() {
    const data = this.state.annualData;
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
            <div>
              {Number(this.props.clientContent.details[0].monthly_hours_client) !== 0 ? (
                <h3>
                  Este cliente tem uma bolsa mensal de {this.props.clientContent.details[0].monthly_hours_client} horas.
                </h3>
              ) : (
                <h3>Este cliente não tem uma bolsa de horas mensal.</h3>
              )}
            </div>
            <div className="client-data-year">
              <select onChange={this.changeYear} defaultValue={currentYear}>
                {years.map(year => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
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
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                

                <YAxis type="number" domain={[0, 100]} allowDataOverflow={false} axisLine={false} tickLine={false} hide={true} />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="horas" radius={[5, 5, 0, 0]}>
                  {data.map((entry, index) => (
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
                  ))}
                  <LabelList dataKey="horas" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5
                }}
              >
                <XAxis dataKey="mesAbrev" />
                <YAxis type="number" domain={[0, 100]} allowDataOverflow={false} axisLine={false} tickLine={false} hide={true} />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="horas" radius={[5, 5, 0, 0]} fill="#1de9b6">
                  <LabelList dataKey="horas" position="top" />
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
