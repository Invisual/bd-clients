import React from 'react'
import { CostsModalDiv } from '../../styles/modals'
import { FiX, FiPlus, FiTrash2, FiEdit2, FiSave } from 'react-icons/fi';


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
                    (
                            <div className="modal-costs-listing">
                                <div className="costs-list-header">
                                    <h5>Serviço</h5>
                                    <h5>Fornecedor</h5>
                                    <h5>Custo Fornecedor</h5>
                                    <h5>Preço Venda</h5>
                                    <h5>Diferença</h5>
                                </div>
                                {props.costs.map(cost => {
                                    return (
                                        <div className="costs-list-row" key={cost.id_cost}>
                                            {
                                                props.editLine === cost.id_cost ?
                                                    <>
                                                        <input type="text" value={props.editInputs.service === '' ? cost.service : props.editInputs.service} onChange={(e) => props.changeEditServiceInput(e.target.value)} />
                                                        <input type="text" value={props.editInputs.supplier === '' ? cost.provider : props.editInputs.supplier} onChange={(e) => props.changeEditSupplierInput(e.target.value)} />
                                                        <input type="number" value={props.editInputs.supplierCost === 0 ? cost.cost_provider : props.editInputs.supplierCost} onChange={(e) => props.changeEditSupplierCostInput(e.target.value)} />
                                                        <input type="number" value={props.editInputs.sellCost === 0 ? cost.price_sale : props.editInputs.sellCost} onChange={(e) => props.changeEditSellCostInput(e.target.value)} />
                                                        <p>{cost.price_difference}</p>
                                                        <p>
                                                            <span><FiEdit2 onClick={() => props.changeEditLine(0)}/></span>
                                                            <span><FiSave onClick={() => props.updateCost(cost.id_cost, cost.service, cost.provider, cost.cost_provider, cost.price_sale)}/></span>
                                                        </p>
                                                    </>
                                                :  
                                                    <>      
                                                        <p>{cost.service}</p>
                                                        <p>{cost.provider}</p>
                                                        <p>{cost.cost_provider}</p>
                                                        <p>{cost.price_sale}</p>
                                                        <p>{cost.price_difference}</p>
                                                        <p>
                                                            <span><FiEdit2 onClick={() => props.changeEditLine(cost.id_cost)}/></span>
                                                            <span><FiTrash2 onClick={() => props.deleteCost(cost.id_cost)}/></span>
                                                        </p>
                                                    </>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                    )
                :
                    <p>Deve ter ocorrido um erro. Por favor tente de novo dando um reload à página.</p>
                }
            </CostsModalDiv>
        )
    }
}