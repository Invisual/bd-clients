import React, {Component} from 'react';
import {CreateProject} from '../../components/inserts/CreateProject';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

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
            projectData: [],
            redirect: false,
            lastInsertedId:''
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

    getProjectData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/projects/basic/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'noproject'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `O Projecto que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                this.setState({
                    projectData: res.data[0],
                    titleInput: res.data[0].title_project,
                    briefingInput:res.data[0].briefing_project,
                    deadlineInput:res.data[0].deadline_project,
                    billingInput:res.data[0].ref_id_billing_mode,
                    clientInput:res.data[0].ref_id_client,
                    accountInput:res.data[0].ref_id_user_account,
                    categoriesArr:res.data[0].categories ? res.data[0].categories.split(',') : []
                })
            }
        })
    }

    insertProject = (e) => {
        e.preventDefault();
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var data = {
            title: this.state.titleInput,
            briefing: this.state.briefingInput,
            deadline: moment(this.state.deadlineInput).format('YYYY-MM-DD'),
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
                      this.setState({redirect: true, lastInsertedId:res.data.insertId})
                  })
            }
        })
    }

    editProject = (e) => {
        e.preventDefault();
        var data = {
            id: this.props.match.params.id,
            title: this.state.titleInput,
            briefing: this.state.briefingInput,
            deadline: moment(this.state.deadlineInput).format('YYYY-MM-DD'),
            client: this.state.clientInput,
            billing: this.state.billingInput,
            account: this.state.accountInput,
            categories: this.state.categoriesArr
        }
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/projects/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Tarefa Editada',
                    text: `A Tarefa '${data.title}' foi editada com sucesso!`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
        })
    }

    componentDidMount(){
        if(this.props.type === 'edit'){ this.getProjectData();}
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
                titleInput={this.state.titleInput}
                briefingInput={this.state.briefingInput}
                deadlineInput={this.state.deadlineInput}
                billingInput={this.state.billingInput}
                clientInput={this.state.clientInput}
                accountInput={this.state.accountInput}
                categoriesArr={this.state.categoriesArr}
                billingData={this.state.billingData}
                clientsData={this.state.clientsData}
                accountsData={this.state.accountsData}
                categoriesData={this.state.categoriesData}
                insertProject={this.insertProject}
                editProject={this.editProject}
                type={this.props.type}
                redirect={this.state.redirect}
                lastInsertedId={this.state.lastInsertedId}
                projectData={this.state.projectData}
                />;
    }
}

export default CreateProjectContainer;