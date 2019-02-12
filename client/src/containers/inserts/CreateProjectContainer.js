import React, {Component} from 'react';
import {CreateProject} from '../../components/inserts/CreateProject';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class CreateProjectContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            titleInput: '',
            briefingInput: '',
            deadlineInput: new Date(),
            billingInput: '',
            clientInput: '',
            accountInput: '',
            categoriesArr: [],
            billingData: [],
            clientsData: [],
            accountsData: [],
            categoriesData: [],
            redirect: false
        }
    }

    changeTitleInput = (e) => {
        this.setState({ titleInput: e.target.value })
    }

    changeBriefingInput = (e) => {
        this.setState({ briefingInput: e.target.value })
    }

    changeDeadlineInput = (val) => {
        this.setState({ deadlineInput: val })
    }

    changeBillingInput = (e) => {
        this.setState({ billingInput: e.target.value })
    }

    changeClientInput = (e) => {
        this.setState({ clientInput: e.target.value })
    }

    changeAccountInput = (e) => {
        this.setState({ accountInput: e.target.value })
    }

    changeCategoriesArr = (e) =>{
        var catArr = [...this.state.categoriesArr];
        const value = e.target.value
        const index = catArr.findIndex(cat => cat === value);
        if(index > -1) {
            catArr = [...catArr.slice(0, index), ...catArr.slice(index + 1)]
        } else {
            catArr.push(value);
        }
        this.setState({categoriesArr: catArr});
    }

    getBillingData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/billing', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({billingData: res.data})
        })
    }

    getClientsData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/clients/basic', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({clientsData: res.data})
        })
    }

    getAccountsData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/users/accounts', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({accountsData: res.data})
        })
    }

    getCategoriesData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/categories', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({categoriesData: res.data})
        })
    }

    insertProject = (e) => {
        e.preventDefault();
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var data = {
            title: this.state.titleInput,
            briefing: this.state.briefingInput,
            deadline: this.state.deadlineInput,
            billing: this.state.billingInput,
            client: this.state.clientInput,
            account: this.state.accountInput,
            categories: this.state.categoriesArr
        }
        axios.post('/api/projects/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Novo Projecto Inserido',
                    text: `O Projecto '${data.title}' foi inserido com sucesso e já podem começar a trabalhar nele!`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
        })
    }

    componentDidMount(){
        this.getBillingData();
        this.getClientsData();
        this.getAccountsData();
        this.getCategoriesData();
    }

    render(){
        return <CreateProject
                title={this.props.title}
                changeTitleInput={this.changeTitleInput}
                changeBriefingInput={this.changeBriefingInput}
                changeDeadlineInput={this.changeDeadlineInput}
                changeBillingInput={this.changeBillingInput}
                changeClientInput={this.changeClientInput}
                changeAccountInput={this.changeAccountInput}
                changeCategoriesArr={this.changeCategoriesArr}
                billingData={this.state.billingData}
                clientsData={this.state.clientsData}
                accountsData={this.state.accountsData}
                categoriesData={this.state.categoriesData}
                insertProject={this.insertProject}
                deadlineInput={this.state.deadlineInput}
                redirect={this.state.redirect}
                />;
    }
}

export default CreateProjectContainer;