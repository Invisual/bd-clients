import React from 'react'
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect, withRouter } from 'react-router'

const CreateClient = props => {
  if (props.redirect) {
    return <Redirect to="/" />
  }

  return (
    <InsertFormDiv className="insert-edit-form">
      <div className="cards-container form-container">
        <div className="form-title">
          <h4 className="widget-title">{props.title}</h4>
        </div>
        <form
          onSubmit={
            props.type === 'edit' ? props.editClient : props.insertClient
          }
        >
          <div className="grid50-50 form-grid">
            <div className="grid-item">
              <div className="input-wrapper">
                <fieldset>
                  <legend>Nome do Cliente</legend>
                  <input
                    required
                    type="text"
                    onChange={props.changeNameInput}
                    placeholder="Escrever"
                    value={props.type === 'edit' ? props.nameInput : undefined}
                  />
                </fieldset>
              </div>
            </div>

            <div className="grid-item">
              <div className="input-wrapper">
                <fieldset>
                  <legend>Bolsa de Horas Mensal</legend>
                  <input
                    type="number"
                    onChange={props.changeHoursInput}
                    placeholder="Inserir"
                    value={props.type === 'edit' ? props.hoursInput : undefined}
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn secondary-btn"
              onClick={() => props.history.goBack()}
            >
              Cancelar
            </button>
            <button className="btn main-btn">
              {props.type === 'edit' ? 'Editar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </InsertFormDiv>
  )
}

export default withRouter(CreateClient)
