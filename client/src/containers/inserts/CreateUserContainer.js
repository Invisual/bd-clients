import React, {Component} from 'react';
import {CreateUser} from '../../components/inserts/CreateUser';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios');

class CreateUserContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameInput: '',
            usernameInput: '',
            emailInput: '',
            passwordInput: '',
            rePasswordInput: '',
            phoneInput: '',
            avatarInput: '',
            positionInput: '',
            positionsData: [],
            userData: [],
            redirect: false,
            isLoading: true,
            error: false,
            errorMsg: '',
            lastInsertedId: ''
        }
    }

    changeNameInput = (e) => this.setState({nameInput: e.target.value})
    changeUsernameInput = (e) => this.setState({usernameInput: e.target.value})
    changeEmailInput = (e) => this.setState({emailInput: e.target.value})
    changePasswordInput = (e) => this.setState({passwordInput: e.target.value})
    changeRePasswordInput = (e) => this.setState({rePasswordInput: e.target.value})
    changeAvatarInput = (e) => this.setState({avatarInput: e.target.value})
    changePhoneInput = (e) => this.setState({phoneInput: e.target.value})
    changePositionInput = (e) => this.setState({positionInput: e.target.value})

    getPositionsData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.get('/api/misc/positions', { headers: { Authorization: AuthStr } })
        .then(res => {
            this.setState({positionsData: res.data})
        })
    }

    getUserData = () => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        var id = this.props.match.params.id;
        axios.get(`/api/users/${id}`, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data === 'nodata'){
                Swal.fire({
                    type: 'error',
                    title: 'ID não existente',
                    text: `O Utilizador que está a tentar editar não existe.`
                  })
                  .then(click => {
                      this.setState({redirect: true})
                  })
            }
            else{
                this.setState({
                    userData: res.data[0],
                    nameInput: res.data[0].name_user,
                    usernameInput:res.data[0].username_user,
                    emailInput:res.data[0].email_user,
                    phoneInput:res.data[0].phone_user,
                    avatarInput:res.data[0].avatar_user,
                    positionInput:res.data[0].ref_id_position
                })
            }
        })
    }


    insertUser = (e) => {
        e.preventDefault();
        if(this.state.passwordInput !== this.state.rePasswordInput){
            this.setState({error: true, errorMsg: 'As passwords não coincidem!'})
        }
        else{
            this.setState({error: false, errorMsg: ''})
            var data = {
                name: this.state.nameInput,
                username: this.state.usernameInput,
                email: this.state.emailInput,
                password: this.state.passwordInput,
                phone: this.state.phoneInput,
                position: this.state.positionInput,
                avatar: this.state.avatarInput,
            }
            
            var token = JSON.parse(localStorage.getItem('token'));
            var AuthStr = 'Bearer ' + token;
            axios.post('/api/users/', data, { headers: { Authorization: AuthStr } })
            .then(res => {
                if(res.data.affectedRows){
                    Swal.fire({
                        type: 'success',
                        title: 'Novo Utilizador Inserido',
                        text: `O Utilizador '${data.name}' foi inserido com sucesso!`
                      })
                      .then(click => this.setState({redirect: true, lastInsertedId:res.data.insertId}))
                }
            })
        }
    }


   editUser = (e) => {
        e.preventDefault();
        if(this.state.passwordInput === ''){

            var data = {
                name: this.state.nameInput,
                username: this.state.usernameInput,
                email: this.state.emailInput,
                phone: this.state.phoneInput,
                position: this.state.positionInput,
                avatar: this.state.avatarInput,
                changePassword:false
            }      
            var token = JSON.parse(localStorage.getItem('token'));
            var AuthStr = 'Bearer ' + token;
            axios.put(`/api/users/${this.state.userData.id_user}`, data, { headers: { Authorization: AuthStr } })
            .then(res => {
                if(res.data.affectedRows){
                    Swal.fire({
                        type: 'success',
                        title: 'Utilizador Editado',
                        text: `O Utilizador '${data.name}' foi editado com sucesso!`
                      })
                      .then(click => this.setState({redirect: true, lastInsertedId:this.state.userData.id_user}))
                }
            })
        }

        else{
            if(this.state.passwordInput !== this.state.rePasswordInput){
                this.setState({error: true, errorMsg: 'As passwords não coincidem!'})
            }
            else{
                this.setState({error: false, errorMsg: ''})
                var data = {
                    name: this.state.nameInput,
                    username: this.state.usernameInput,
                    password: this.state.passwordInput,
                    email: this.state.emailInput,
                    phone: this.state.phoneInput,
                    position: this.state.positionInput,
                    avatar: this.state.avatarInput,
                    changePassword:true
                }      
                var token = JSON.parse(localStorage.getItem('token'));
                var AuthStr = 'Bearer ' + token;
                axios.put(`/api/users/${this.state.userData.id_user}`, data, { headers: { Authorization: AuthStr } })
                .then(res => {
                    if(res.data.affectedRows){
                        Swal.fire({
                            type: 'success',
                            title: 'Utilizador Editado',
                            text: `O Utilizador '${data.name}' foi editado com sucesso!`
                          })
                          .then(click => this.setState({redirect: true, lastInsertedId:this.state.userData.id_user}))
                    }
                })
            }

        }
    }

    
    componentDidMount(){
        if(this.props.type === 'edit'){ this.getUserData();}
        this.getPositionsData();
    }

    render(){
        return <CreateUser
                title={this.props.title}
                nameInput={this.state.nameInput}
                usernameInput={this.state.usernameInput}
                emailInput={this.state.emailInput}
                passwordInput={this.state.passwordInput}
                rePasswordInput={this.state.rePasswordInput}
                phoneInput={this.state.phoneInput}
                positionInput={this.state.positionInput}
                avatarInput={this.state.avatarInput}
                changeNameInput={this.changeNameInput}
                changeUsernameInput={this.changeUsernameInput}
                changeEmailInput={this.changeEmailInput}
                changePasswordInput={this.changePasswordInput}
                changeRePasswordInput={this.changeRePasswordInput}
                changePhoneInput={this.changePhoneInput}
                changePositionInput={this.changePositionInput}
                changeAvatarInput={this.changeAvatarInput}
                positionsData={this.state.positionsData}
                insertUser={this.insertUser}
                editUser={this.editUser}
                redirect={this.state.redirect}
                isLoading={this.state.isLoading}
                type={this.props.type}
                error={this.state.error}
                errorMsg={this.state.errorMsg}
                lastInsertedId={this.state.lastInsertedId}
                />;
    }
}

export default CreateUserContainer;
