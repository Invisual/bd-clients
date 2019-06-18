import React from 'react'
import { CostsModalDiv } from '../../styles/modals'
import { FiX } from 'react-icons/fi';

export const ConcludeModal = props => {
    if(props.type === 'task' || props.type === 'project'){
        return (
            <CostsModalDiv className="conclude-modal cards-container">
                <div className="modal-close" onClick={props.closeConcludeModal}><FiX /></div>
                <h2>Concluír Tarefa</h2>
                <form onSubmit={props.type === 'task' ? props.submitConcludeTask : props.submitConcludeProject}>
                <div className="inputwrapper">
                                    <fieldset>
                                        <legend>Enviar para aprovação</legend>
                                            <div className="send-approval">
                                                        <div>
                                                            <label className="label-container">
                                                                    <input type="checkbox" onClick={props.changeApprovalInput} />
                                                            </label>
                                                        </div>
                                            </div>
                                    </fieldset>
                </div>
                { props.type === 'task' ?
                    Number(props.taskContent.details[0].ref_id_billing_mode) === 2 || Number(props.taskContent.details[0].ref_id_billing_mode) === 4 ?
                        <div className="inputwrapper">
                            <fieldset>
                                <legend>Enviar para Faturação</legend>
                                    <div className="send-billing">
                                        <div>
                                            <label className="label-container">
                                                    <input type="checkbox" value="1" onClick={props.changeBillingInput} />
                                            </label>
                                        </div>
                                    </div>
                            </fieldset>
                        </div>
                    : 
                        null
                : 
                    Number(props.projectContent.details[0].ref_id_billing_mode) == 2 || Number(props.projectContent.details[0].ref_id_billing_mode) == 4 ?
                        <div className="inputwrapper">
                            <fieldset>
                                <legend>Enviar para Faturação</legend>
                                    <div className="send-billing">
                                        <div>
                                            <label className="label-container">
                                                    <input type="checkbox" value="1" onClick={props.changeBillingInput} />
                                            </label>
                                        </div>
                                    </div>
                            </fieldset>
                        </div>
                    : 
                        null
                }
                

                <div className="inputwrapper">
                                    <fieldset>
                                        <legend>Observações</legend>
                                            <div className="send-billing">
                                                        <div>
                                                            <label className="label-container">
                                                            <textarea id="billing-obs" onChange={props.changeObsInput} placeholder="Escrever"></textarea>
                                                            </label>
                                                        </div>
                                            </div>
                                    </fieldset>
                </div>
                <div className="costs-form-buttons form-buttons">
                            <button type="button" className="btn secondary-btn" onClick={props.closeConcludeModal}>Cancelar</button>
                            <button className="btn main-btn">Enviar</button>
                </div>
                </form>
                
            </CostsModalDiv>
        )
    }
    else{
        return null
    }
}