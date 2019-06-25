import React, {Component} from 'react'
import {MyUsers} from '../../components/tables/MyUsers'

const axios = require('axios')

class MyUsersContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoading: true
        }
    }

    getUsers = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get(`/api/users/withtasks`, { headers: { Authorization: AuthStr } }).then(res => {
          if (res.data === 'nodata') {
            this.setState({ data: null, isLoading: false})
          } else {
            this.setState({ data: res.data, isLoading: false}, () => console.log(this.state.data));
          }
        })
    }

    componentDidMount(){
        this.getUsers()
    }

    render(){
        return <MyUsers 
                    data={this.state.data}
                    isLoading={this.state.isLoading}
                    title={this.props.title}
                />
    }
}

export default MyUsersContainer