import React, {Component} from 'react';
import {CreateBudget} from '../../components/inserts/CreateBudget';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment'

const axios = require('axios');

class CreateBudgetContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            clientTypeInput:'2',
            titleInput: '',
            clientInput: '',
            potentialClientInput: '',
            descInput: '',
            startDateInput: new Date(),
            accountInput: '',
            typesData: [],
            clientsData: [],
            billingData: [],
            accountsData: [],
            usersData: [],
            projectsData: [],
            budgetData: [],
            redirect: false,
            isLoading: true,
            error: false,
            errorMsg: '',
            lastInsertedId:''
        }
    }

    changeClientTypeInput = e => this.setState({ clientTypeInput: e.target.value })

    changeTitleInput = (e) => {
        this.setState({ titleInput: e.target.value })
    }

    changeClientInput = (e) => {
        this.setState({ clientInput: e.target.value })
    }

    changePotentialClientInput = (e) => {
        this.setState({ potentialClientInput: e.target.value })
    }

    changeDescInput = (e) => {
        this.setState({ descInput: e.target.value })
    }

    changeStartDateInput = (val) => {
        this.setState({ startDateInput: val })
    }

    changeAccountInput = (e) => {
        this.setState({ accountInput: e.target.value })
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

    getBudgetData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/budgets/basic/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'nobudget'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `O Orçamento que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                var clientType
                res.data[0].ref_id_client ? clientType=2 : clientType=1
                this.setState({
                    budgetData: res.data[0],
                    clientTypeInput: clientType,
                    titleInput: res.data[0].title_budget,
                    clientInput: res.data[0].ref_id_client,
                    potentialClientInput: res.data[0].name_potential_client,
                    descInput: res.data[0].description_budget,
                    startDateInput: res.data[0].creation_date_budget,
                    accountInput: res.data[0].ref_id_user
                })
            }
        })
    }

    insertBudget = (e) => {
        e.preventDefault();
        var data = {
            title: this.state.titleInput,
            description: this.state.descInput,
            client: this.state.clientInput,
            potentialClient: this.state.potentialClientInput,
            account: this.state.accountInput,
        }
        
        if(this.state.clientTypeInput === '1'){ data.client = null }
        else if(this.state.clientTypeInput === '2'){ data.potentialClient = null;}

        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/budgets/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Novo Orçamento Inserido',
                    text: `O Orçamento '${data.title}' foi inserido com sucesso!`
                  })
                  .then(click => {
                      this.setState({redirect: true, lastInsertedId:res.data.insertId})
                  })
            }
        })
    }


    editBudget = (e) => {
        e.preventDefault();
        var data = {
            id: this.props.match.params.id,
            title: this.state.titleInput,
            description: this.state.descInput,
            client: this.state.clientInput,
            potentialClient: this.state.potentialClientInput,
            potentialClientId: this.state.budgetData.ref_id_potential_client,
            account: Number(this.state.accountInput),
            oldAccount: this.state.budgetData.ref_id_user,
            changeAccount: Number(this.state.budgetData.ref_id_user) === Number(this.state.accountInput) ? false : true,
            changePotentialClient: this.state.budgetData.name_potential_client === this.state.potentialClientInput ? false : true
        }

        if(this.state.clientTypeInput === '1'){ data.client = null }
        else if(this.state.clientTypeInput === '2'){ data.potentialClient = null;}
        
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/budgets/', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Orçamento Editado',
                    text: `O Orçamento '${data.title}' foi editado com sucesso!`
                  })
                  .then(click => {
                    this.setState({redirect: true})
                })
            }
        })
    }

    
    componentDidMount(){
        if(this.props.type === 'edit'){ this.getBudgetData();}
        this.getClientsData();
        this.getAccountsData();
    }

    render(){
        return <CreateBudget
                title={this.props.title}
                changeClientTypeInput={this.changeClientTypeInput}
                changeTitleInput={this.changeTitleInput}
                changeClientInput={this.changeClientInput}
                changePotentialClientInput={this.changePotentialClientInput}
                changeDescInput={this.changeDescInput}
                changeStartDateInput={this.changeStartDateInput}
                changeAccountInput={this.changeAccountInput}
                clientTypeInput={this.state.clientTypeInput}
                startDateInput={this.state.startDateInput}
                clientInput={this.state.clientInput}
                potentialClientInput={this.state.potentialClientInput}
                titleInput={this.state.titleInput}
                descInput={this.state.descInput}
                accountInput={this.state.accountInput}
                insertBudget={this.insertBudget}
                editBudget={this.editBudget}
                typesData={this.state.typesData}
                clientsData={this.state.clientsData}
                accountsData={this.state.accountsData}
                billingData={this.state.billingData}
                projectsData={this.state.projectsData}
                usersData={this.state.usersData}
                budgetData={this.state.budgetData}
                redirect={this.state.redirect}
                isLoading={this.state.isLoading}
                type={this.props.type}
                error={this.state.error}
                errorMsg={this.state.errorMsg}
                lastInsertedId={this.state.lastInsertedId}
                />;
    }
}

export default CreateBudgetContainer;
