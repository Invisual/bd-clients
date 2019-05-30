import React from 'react';
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect } from 'react-router'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()

export const CreateUser = props => {
    if (props.redirect) {
        switch(props.type) {
            case 'edit':
            return <Redirect to={`/team/${props.lastInsertedId}`} />
            case 'add':
            return <Redirect to={`/team/${props.lastInsertedId}`} />
            default:
            return <Redirect to={`/team`} />
        }
    }
    
    
    return (
        <InsertFormDiv>
            
            {props.positionsData.length > 0 ? 

                <div className="cards-container form-container">

                    <div className="form-title"><h4 className="widget-title">{props.title}</h4></div>
                    <form onSubmit={props.type === 'edit' ? props.editUser : props.insertUser}>

                    <div className="grid50-50 form-grid">

                        <div className="grid-item">

                                    <div className="input-wrapper">
                                        <fieldset>
                                            <legend>Nome</legend>
                                            <input required type="text" id="create-user-name" onChange={props.changeNameInput} placeholder="Nome" value={props.type === 'edit' ? props.nameInput : undefined}/>
                                        </fieldset>
                                    </div>

                        </div>

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Username</legend>
                                    <input required type="text" id="create-user-username" onChange={props.changeUsernameInput} placeholder="Username" value={props.type === 'edit' ? props.usernameInput : undefined}/>
                                </fieldset>
                            </div>

                        </div>

                    </div>


                    <div className="grid50-50 form-grid mt10">

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Password</legend>
                                    <input type="password" id="create-user-password" onChange={props.changePasswordInput} placeholder={props.type === 'edit' ? 'Deixe em branco se não quiser alterar' : 'Password'}/>
                                </fieldset>
                            </div>

                        </div>

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Rescreva a Password</legend>
                                    <input type="password" id="create-user-repassword" onChange={props.changeRePasswordInput} placeholder={props.type === 'edit' ? 'Deixe em branco se não quiser alterar' : 'RePassword'}/>
                                </fieldset>
                           </div>

                        </div>

                    </div>


                    <div className="grid50-50 form-grid mt10">

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Email</legend>
                                    <input required type="email" id="create-user-email" onChange={props.changeEmailInput} placeholder="Email" value={props.type === 'edit' ? props.emailInput : undefined}/>
                                </fieldset>
                            </div>

                        </div>

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Telemóvel</legend>
                                    <input required type="number" id="create-user-phone" onChange={props.changePhoneInput} placeholder="Telemóvel" value={props.type === 'edit' ? props.phoneInput : undefined}/>
                                </fieldset>
                            </div>

                        </div>

                    </div>


                    <div className="grid50-50 form-grid mt10">

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Imagem</legend>
                                    <input required type="text" id="create-user-avatar" onChange={props.changeAvatarInput} placeholder="Avatar" value={props.type === 'edit' ? props.avatarInput : undefined}/>
                                </fieldset>
                            </div>

                        </div>

                        <div className="grid-item">

                            <div className="input-wrapper">
                                <fieldset>
                                    <legend>Cargo</legend>
                                    <select required id="user-account" onChange={props.changePositionInput} defaultValue={props.type === 'edit' ? props.positionInput : ''}>
                                        <option value="" disabled>Selecionar</option>
                                        {props.positionsData.map(position => {
                                            return <option key={position.id_position} value={position.id_position}>{position.name_position}</option>
                                        })}
                                    </select>
                                </fieldset>
                            </div>

                        </div>

                    </div>

                    
                    {props.error ? 
                        <div className="form-error">{props.errorMsg}</div>
                    :
                        null
                    }


                    <div className="form-buttons">
                        <button type="button" className="btn secondary-btn" onClick={() => history.goBack()}>Cancelar</button>
                        <button className="btn main-btn">{props.type === 'edit' ? 'Editar' : 'Criar'}</button>
                    </div>
                    </form>
                </div>

            :
                <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />
            }

        </InsertFormDiv>
    );
}