import React from 'react'
import { ConcludeModalDiv } from '../../styles/modals'
import { FiX } from 'react-icons/fi';

export const ConcludeModal = props => {
    if(props.type === 'task' || props.type === 'project'){
        return (
            <ConcludeModalDiv className="conclude-modal cards-container">
                <div className="modal-close" onClick={props.closeConcludeModal}><FiX /></div>
                <h2>Concluír Tarefa</h2>
                <form onSubmit={props.type === 'task' ? props.submitConcludeTask : props.submitConcludeProject}>

                <div className="inputs-grid">
                    <div className="inputwrapper">
                        <fieldset>
                            <label class="container">Enviar para Aprovação
                                <input type="checkbox" onClick={props.changeApprovalInput}/>
                                <span class="checkmark"></span>
                            </label>
                        </fieldset>
                    </div>
                    { props.type === 'task' ?
                        Number(props.taskContent.details[0].ref_id_billing_mode) === 2 || Number(props.taskContent.details[0].ref_id_billing_mode) === 4 ?
                            <div className="inputwrapper">
                                <fieldset>
                                    <label class="container">Enviar para Faturação
                                        <input type="checkbox" value="1" onClick={props.changeBillingInput}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </fieldset>
                            </div>
                        : 
                            null
                    : 
                        Number(props.projectContent.details[0].ref_id_billing_mode) == 2 || Number(props.projectContent.details[0].ref_id_billing_mode) == 4 ?
                            <div className="inputwrapper">
                                <fieldset>
                                    <label class="container">Enviar para Faturação
                                        <input type="checkbox" value="1" onClick={props.changeBillingInput}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </fieldset>
                            </div>
                        : 
                            null
                    }
                </div>

                <div className="inputwrapper observations-input">
                    <fieldset>
                        <legend>Observações</legend>
                            <textarea id="billing-obs" onChange={props.changeObsInput} placeholder="Escrever"></textarea>
                    </fieldset>
                </div>
                <div className="costs-form-buttons form-buttons">
                            <button type="button" className="btn secondary-btn" onClick={props.closeConcludeModal}>Cancelar</button>
                            <button className="btn main-btn">Enviar</button>
                </div>
                </form>
                
            </ConcludeModalDiv>
        )
    }
    else{
        return null
    }
}