import React, {Component} from 'react';
import {CreateTask} from '../../components/inserts/CreateTask';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const axios = require('axios');

class CreateTaskContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            typeInput: '1',
            titleInput: '',
            clientInput: '',
            nameInput: '',
            descInput: '',
            projectInput: '',
            deadlineInput: new Date(),
            accountInput: '',
            personInput: '',
            billingInput: '',
            typesData: [],
            clientsData: [],
            billingData: [],
            accountsData: [],
            usersData: [],
            projectsData: [],
            taskData: [],
            redirect: false,
            isLoading: true,
            error: false,
            errorMsg: ''
        }
    }

    changeTypeInput = e => this.setState({ typeInput: e.target.value })

    changeTitleInput = (e) => {
        this.setState({ titleInput: e.target.value })
    }

    changeClientInput = (e) => {
        this.setState({ clientInput: e.target.value })
    }

    changeNameInput = (e) => {
        this.setState({ nameInput: e.target.value })
    }

    changeDescInput = (e) => {
        this.setState({ descInput: e.target.value })
    }

    changeProjectInput = (e) => {
        this.setState({ projectInput: e.target.value })
    }

    changeDeadlineInput = (val) => {
        this.setState({ deadlineInput: val })
    }

    changeAccountInput = (e) => {
        this.setState({ accountInput: e.target.value })
    }

    changePersonInput = (e) => {
        this.setState({ personInput: e.target.value })
    }

    changeBillingInput = (e) => {
        this.setState({ billingInput: e.target.value })
    }


    getTypesData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/types', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({typesData: res.data})
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

    getBillingData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/billing', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({billingData: res.data})
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

    getProjectsData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/projects/basic', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({projectsData: res.data})
        })
    }

    getUsersData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/users/', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({usersData: res.data})
        })
    }

    getTaskData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/tasks/basic/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'notask'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `A Tarefa que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                this.setState({
                    taskData: res.data[0],
                    typeInput: res.data[0].ref_id_type_task,
                    titleInput:res.data[0].title_task,
                    clientInput:res.data[0].ref_id_client,
                    descInput:res.data[0].description_task,
                    projectInput:res.data[0].ref_id_project,
                    deadlineInput:res.data[0].deadline_date_task,
                    accountInput:res.data[0].ref_id_user_account,
                    personInput: res.data[0].ref_id_user,
                    billingInput: res.data[0].ref_id_billing_mode
                })
            }
        })
    }

    insertTask = (e) => {
        e.preventDefault();
        var data = {
            title: this.state.titleInput,
            description: this.state.descInput,
            deadline: this.state.deadlineInput,
            client: this.state.clientInput,
            billing: this.state.billingInput,
            project: this.state.projectInput,
            type: this.state.typeInput,
            account: this.state.accountInput,
            user: this.state.personInput
        }

        if(this.state.typeInput === '1'){ data.account = null; data.billing = null; }
        else if(this.state.typeInput === '2' || this.state.typeInput === '4'){ data.project = null;}
        else if(this.state.typeInput === '3'){ data.project = null; data.user = null;}
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/tasks/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Nova Tarefa Inserida',
                    text: `A Tarefa '${data.title}' foi inserida com sucesso!`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
        })
    }


    editTask = (e) => {
        e.preventDefault();
        var data = {
            id: this.props.match.params.id,
            title: this.state.titleInput,
            description: this.state.descInput,
            deadline: this.state.deadlineInput,
            client: this.state.clientInput,
            billing: this.state.billingInput,
            project: this.state.projectInput,
            type: this.state.typeInput,
            account: this.state.accountInput,
            user: this.state.personInput,
            oldUser: this.state.taskData.ref_id_user,
            changeUser: Number(this.state.taskData.ref_id_user) === Number(this.state.personInput) ? false : true
        }

        if(this.state.typeInput === '1'){ data.account = null; data.billing = null; }
        else if(this.state.typeInput === '2' || this.state.typeInput === '4'){ data.project = null;}
        else if(this.state.typeInput === '3'){ data.project = null; data.user = null;}
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/tasks/', data, { headers: { Authorization: AuthStr } })
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
        if(this.props.type === 'edit'){ this.getTaskData();}
        this.getTypesData();
        this.getClientsData();
        this.getAccountsData();
        this.getBillingData();
        this.getProjectsData();
        this.getUsersData();
    }

    render(){
        return <CreateTask
                title={this.props.title}
                changeTypeInput={this.changeTypeInput}
                changeTitleInput={this.changeTitleInput}
                changeClientInput={this.changeClientInput}
                changeNameInput={this.changeNameInput}
                changeDescInput={this.changeDescInput}
                changeProjectInput={this.changeProjectInput}
                changeDeadlineInput={this.changeDeadlineInput}
                changeAccountInput={this.changeAccountInput}
                changePersonInput={this.changePersonInput}
                changeBillingInput={this.changeBillingInput}
                deadlineInput={this.state.deadlineInput}
                clientInput={this.state.clientInput}
                typeInput={this.state.typeInput}
                titleInput={this.state.titleInput}
                descInput={this.state.descInput}
                projectInput={this.state.projectInput}
                accountInput={this.state.accountInput}
                personInput={this.state.personInput}
                billingInput={this.state.billingInput}
                insertTask={this.insertTask}
                editTask={this.editTask}
                typesData={this.state.typesData}
                clientsData={this.state.clientsData}
                accountsData={this.state.accountsData}
                billingData={this.state.billingData}
                projectsData={this.state.projectsData}
                usersData={this.state.usersData}
                taskData={this.state.taskData}
                redirect={this.state.redirect}
                isLoading={this.state.isLoading}
                type={this.props.type}
                error={this.state.error}
                errorMsg={this.state.errorMsg}
                />;
    }
}

export default CreateTaskContainer;
