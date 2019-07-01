import React, {Component} from 'react'
import {CostsModal} from '../../components/inserts/CostsModal'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const axios = require('axios')

class CostsModalContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputs: [
                { id: 0,
                  content: [
                                {   
                                    legend: 'Serviço',
                                    name: 'service',
                                    type: 'text',
                                    placeholder: 'Serviço/Produto',
                                    onChange:this.changeServiceInput
                                },
                                {
                                    legend: 'Fornecedor',
                                    name: 'provider',
                                    type: 'text',
                                    placeholder: 'Nome do Fornecedor',
                                    onChange:this.changeProviderInput
                                },
                                {
                                    legend: 'Custo Fornecedor',
                                    name: 'price-provider',
                                    type: 'number',
                                    placeholder: 'Preço',
                                    onChange:this.changeProviderPriceInput
                                },
                                {
                                    legend: 'Custo Venda',
                                    name: 'price-sell',
                                    type: 'number',
                                    placeholder: 'Preço',
                                    onChange:this.changeSellPriceInput
                                }/*,
                                {
                                    legend: 'Tipo de Custo',
                                    name: 'cost-type',
                                    type: 'select',
                                    placeholder: 'Tipo',
                                    onChange:this.changeTypeInput,
                                    options: ['Externo', 'Interno'],
                                }*/
                            ]
                }
            ],
            serviceInput: [],
            providerInput: [],
            providerPriceInput: [],
            sellPriceInput: [],
            //typeInput: []
        }
    }

    changeServiceInput = (e, id) => {
        var serviceInput = [...this.state.serviceInput]
        if(this.state.serviceInput.filter(obj => obj.id === id).length>0){
            var copy = serviceInput.filter(obj => obj.id==id)
            copy[0].input = e.target.value
            serviceInput = serviceInput.filter(obj => obj.id !== id)
            serviceInput.push(copy[0])
        }
        else{
            var newObj = {id: id, input: e.target.value}
            serviceInput.push(newObj)
        }
        this.setState({serviceInput: serviceInput})
    }

    changeProviderInput = (e, id) => {
        var providerInput = [...this.state.providerInput]
        if(this.state.providerInput.filter(obj => obj.id === id).length>0){
            var copy = providerInput.filter(obj => obj.id==id)
            copy[0].input = e.target.value
            providerInput = providerInput.filter(obj => obj.id !== id)
            providerInput.push(copy[0])
        }
        else{
            var newObj = {id: id, input: e.target.value}
            providerInput.push(newObj)
        }
        this.setState({providerInput: providerInput})
    }

    changeProviderPriceInput = (e, id) => {
        var providerPriceInput = [...this.state.providerPriceInput]
        if(this.state.providerPriceInput.filter(obj => obj.id === id).length>0){
            var copy = providerPriceInput.filter(obj => obj.id==id)
            copy[0].input = e.target.value
            providerPriceInput = providerPriceInput.filter(obj => obj.id !== id)
            providerPriceInput.push(copy[0])
        }
        else{
            var newObj = {id: id, input: e.target.value}
            providerPriceInput.push(newObj)
        }
        this.setState({providerPriceInput: providerPriceInput})
    }

    changeSellPriceInput = (e, id) => {
        var sellPriceInput = [...this.state.sellPriceInput]
        if(this.state.sellPriceInput.filter(obj => obj.id === id).length>0){
            var copy = sellPriceInput.filter(obj => obj.id==id)
            copy[0].input = e.target.value
            sellPriceInput = sellPriceInput.filter(obj => obj.id !== id)
            sellPriceInput.push(copy[0])
        }
        else{
            var newObj = {id: id, input: e.target.value}
            sellPriceInput.push(newObj)
        }
        this.setState({sellPriceInput: sellPriceInput})
    }

    /*changeTypeInput = (e, id) => {
        var typeInput = [...this.state.typeInput]
        if(this.state.typeInput.filter(obj => obj.id === id).length>0){
            var copy = typeInput.filter(obj => obj.id==id)
            copy[0].input = e.target.value
            typeInput = typeInput.filter(obj => obj.id !== id)
            typeInput.push(copy[0])
        }
        else{
            var newObj = {id: id, input: e.target.value}
            typeInput.push(newObj)
        }
        this.setState({typeInput: typeInput})
    }*/

    insertCosts = (e) => {
        e.preventDefault()
        if(this.props.type === 'task'){
            var data = {
                type: this.props.type,
                services: this.state.serviceInput,
                providers: this.state.providerInput,
                providerPrices: this.state.providerPriceInput,
                sellPrices: this.state.sellPriceInput,
                costTypes: 1,
                taskId: this.props.taskId
            }
        }
        else{
            var data = {
                type: this.props.type,
                services: this.state.serviceInput,
                providers: this.state.providerInput,
                providerPrices: this.state.providerPriceInput,
                sellPrices: this.state.sellPriceInput,
                costTypes: 1,
                projId: this.props.projId
            }
        }
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        axios.post('/api/misc/costs', data, { headers: { Authorization: AuthStr } })
        .then(res => {
            console.log(res)
            if(res.data.affectedRows){
                Swal.fire({
                    type: 'success',
                    title: 'Registo de Custos Adicionado',
                    text: `O Registo de Custos foi inserido com sucesso!`
                    })
                    .then(click => {
                        if(this.props.type === 'project'){ this.props.getProjectDetails() }
                        else if(this.props.type === 'task'){ this.props.getTaskDetails() }
                        this.props.closeModal('costs')
                    })
            }
        })
    }

    copyRow = () => {
        var inputRow = [...this.state.inputs[0].content]
        var currId = this.state.inputs[this.state.inputs.length-1].id
        var newRowObj = { id: currId +1, content: inputRow }
        this.setState({inputs: [...this.state.inputs, newRowObj]})
    }

    deleteRow = (id) => {
        var inputs = [...this.state.inputs]
        var newInputs = inputs.filter(inputRow => inputRow.id !== id)
        var serviceInput = [...this.state.serviceInput].filter(obj => obj.id !== id)
        var providerInput = [...this.state.providerInput].filter(obj => obj.id !== id)
        var providerPriceInput = [...this.state.providerPriceInput].filter(obj => obj.id !== id)
        var sellPriceInput = [...this.state.sellPriceInput].filter(obj => obj.id !== id)
        //var typeInput = [...this.state.typeInput].filter(obj => obj.id !== id)
        this.setState({inputs: newInputs, serviceInput: serviceInput, providerInput: providerInput, providerPriceInput: providerPriceInput, sellPriceInput: sellPriceInput})
    }

    deleteCost = (id) => {
        var token = JSON.parse(localStorage.getItem('token'));
        var AuthStr = 'Bearer ' + token;
        Swal.fire({
        title: 'Tem a certeza?',
        text: 'Esta ação é irreversível',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eliminar!',
        cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                axios.delete(`/api/misc/costs/${id}`, { headers: { Authorization: AuthStr } }).then( res => {
                    Swal.fire('Eliminado!', '', 'success').then(click => {
                        if(this.props.type === 'projectlist'){ this.props.getProjectDetails() }
                        else if(this.props.type === 'tasklist'){ this.props.getTaskDetails() }
                        this.props.closeModal('costs')
                    })
                })
            }
        });
    }

    render(){
        return <CostsModal 
                    type={this.props.type}
                    insertCosts={this.insertCosts}
                    copyRow={this.copyRow}
                    deleteRow={this.deleteRow}
                    inputs={this.state.inputs}
                    costs={this.props.costs}
                    deleteCost={this.deleteCost}
                    closeModal={this.props.closeModal}
                />
    }
}

export default CostsModalContainer