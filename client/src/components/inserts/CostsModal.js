import React from 'react'
import { CostsModalDiv } from '../../styles/modals'
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

export const CostsModal = props => {
    if(props.type === 'task' || props.type === 'project'){
        return (
            <CostsModalDiv className="costs-modal cards-container">
                <div className="modal-close" onClick={() => props.closeModal('costs')}><FiX /></div>
                <div className={props.type === 'task' ? 'task-costs' : 'project-costs'}>
                    <h2>Adicionar Registo de Custos {props.type === 'task' ? 'à Tarefa' : 'ao Projeto'}</h2>
                    <form onSubmit={props.insertCosts} id="costs-form">

                        {props.inputs.map((obj, i) => {
                            return (
                                <div key={obj.id} className="costs-grid costs-row" id={obj.id}>
                                    {obj.content.map((input, index) => {
                                        return (
                                            input.type === 'select' ?
                                                <div key={index} className="input-wrapper">
                                                    <fieldset>
                                                        <legend>{input.legend}</legend>
                                                        <select required onChange={(e) => input.onChange(e, i)} defaultValue={''}>
                                                            <option value="" disabled>{input.placeholder}</option>
                                                            {input.options.map((option, i) => {
                                                                return <option key={i} value={i+1}>{option}</option>
                                                            })}
                                                        </select>
                                                    </fieldset>
                                                </div>
                                            :
                                                input.type === 'textarea' ?
                                                    <div key={index} className="input-wrapper">
                                                        <fieldset>
                                                            <legend>{input.legend}</legend>
                                                            <textarea required onChange={(e) => input.onChange(e, obj.id)} placeholder={input.placeholder}></textarea>
                                                        </fieldset>
                                                    </div>
                                                :
                                                <div key={index} className="input-wrapper">
                                                    <fieldset>
                                                        <legend>{input.legend}</legend>
                                                        <input required type={input.type} step={input.type === 'number' ? '0.01' : null} onChange={(e) => input.onChange(e, obj.id)} placeholder={input.placeholder} />
                                                    </fieldset>
                                                </div>
                                        )
                                    })}

                                    {i>0 || props.inputs.length > 1 ?
                                        <div className="costs-form-copy"> 
                                            <FiX className="costs-remove-icon" onClick={() => props.deleteRow(obj.id)}/>
                                        </div>
                                    :
                                        null
                                    }   
                                </div>
                            )
                        })}
                        
                        <div className="costs-form-buttons form-buttons">
                            <button type="button" className="btn secondary-btn" onClick={() => props.closeModal('costs')}>Cancelar</button>
                            <button className="btn main-btn">{props.type === 'edit' ? 'Editar' : 'Criar'}</button>
                            <FiPlus className="costs-add-icon" onClick={props.copyRow}/>
                        </div>

                    </form>
                </div>
            </CostsModalDiv>
        )
    }
    else if(props.type === 'tasklist' || props.type === 'projectlist'){
        return (
            <CostsModalDiv className="costs-modal cards-container">
                <div className="modal-close" onClick={() => props.closeModal('costs')}><FiX /></div>
                <h2>Registo de Custos</h2>
                {props.costs ? 
                    <div className="modal-costs-listing">
                        <div className="costs-list-header">
                            <h5>Serviço</h5>
                            <h5>Fornecedor</h5>
                            <h5>Custo Fornecedor</h5>
                            <h5>Preço Venda</h5>
                            <h5>Diferença</h5>
                            {/*<h5>Tipo de Custo</h5>*/}
                        </div>
                        {props.costs.map(cost => {
                            /*var type = ''
                            switch(cost.type_cost){
                                case 1: type = 'Externo'
                                break;
                                case 2: type = 'Interno'
                                break;
                                default: type ='Externo' 
                            }*/
                            return (
                                <div className="costs-list-row" key={cost.id_cost}>
                                    <p>{cost.service}</p>
                                    <p>{cost.provider}</p>
                                    <p>{cost.cost_provider}</p>
                                    <p>{cost.price_sale}</p>
                                    <p>{cost.price_difference}</p>
                                    {/*<p>{type}</p>*/}
                                    <p><FiTrash2 onClick={() => props.deleteCost(cost.id_cost)}/></p>
                                </div>
                            )
                        })}
                    </div>
                :
                    <p>Deve ter ocorrido um erro. Por favor tente de novo dando um reload à página.</p>
                }
            </CostsModalDiv>
        )
    }
}