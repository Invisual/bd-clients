import React, {Component} from 'react'
import { ConcludeModal } from '../../components/inserts/ConcludeModal'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios')

class ConcludeModalContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            approvalInput:'',
            billingInput:'',
            obsInput:''
        }
    }

    changeApprovalInput = (e) => {
        if (e.target.checked){
            this.setState({approvalInput: '1'})
        } else {
            this.setState({approvalInput: '0'})
        }
    }

    changeBillingInput = (e) => {
        if (e.target.checked){
            this.setState({billingInput: '1'})
        }else {
            this.setState({billingInput: '0'})
        }
    }

    changeObsInput = (e) => { this.setState({obsInput: e.target.value}) }

    submitConcludeTask = (e) => {
        e.preventDefault();
        
        var data = {
            approval: this.state.approvalInput,
            billing: this.state.billingInput,
            obs: this.state.obsInput,
            taskId: this.props.taskId,
            type: 'task'
        }

        if(this.state.approvalInput === '1' && this.state.billingInput === '1'){ data.approval = 1; data.billing = 1 }
        else if(this.state.approvalInput === '1' && (this.state.billingInput === '0' || this.state.billingInput === '' )){ data.approval = 1; data.billing = 0;}
        else if((this.state.approvalInput === '0' || this.state.approvalInput === '' ) && this.state.billingInput === '1'){ data.approval = 2; data.billing = 1;}
        else if((this.state.approvalInput === '0' || this.state.approvalInput === '') && (this.state.billingInput === '0' || this.state.billingInput === '')){ data.approval = 2; data.billing = 0;}

        console.log(data)
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/misc/conclude', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Novo Orçamento Inserido',
                    text: `Cheirinho dji sucesso!`
                  })
                  .then(click => {
                      console.log('nice')
                  })
            }
        })
    }

    submitConcludeProject = (e) => {
        e.preventDefault();
        
        var data = {
            approval: this.state.approvalInput,
            billing: this.state.billingInput,
            obs: this.state.obsInput,
            projId: this.props.projId,
            type: 'project'
        }

        if(this.state.approvalInput === '1' && this.state.billingInput === '1'){ data.approval = 1; data.billing = 1 }
        else if(this.state.approvalInput === '1' && (this.state.billingInput === '0' || this.state.billingInput === '' )){ data.approval = 1; data.billing = 0;}
        else if((this.state.approvalInput === '0' || this.state.approvalInput === '' ) && this.state.billingInput === '1'){ data.approval = 2; data.billing = 1;}
        else if((this.state.approvalInput === '0' || this.state.approvalInput === '') && (this.state.billingInput === '0' || this.state.billingInput === '')){ data.approval = 2; data.billing = 0;}

        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.put('/api/misc/conclude', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Novo Orçamento Inserido',
                    text: `Cheirinho dji sucesso!`
                  })
                  .then(click => {
                      console.log('nice')
                  })
            }
        })
    }

    render(){
        return <ConcludeModal 
                    type={this.props.type} 
                    closeConcludeModal={this.props.closeConcludeModal}
                    changeApprovalInput={this.changeApprovalInput}
                    changeBillingInput={this.changeBillingInput}
                    changeObsInput={this.changeObsInput}
                    submitConcludeTask={this.submitConcludeTask}
                    submitConcludeProject={this.submitConcludeProject}
                    taskContent={this.props.taskContent}
                    projectContent={this.props.projectContent}
                />
    }
}

export default ConcludeModalContainer