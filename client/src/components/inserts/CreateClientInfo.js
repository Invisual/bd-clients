import React from 'react'
import { InsertFormDiv } from '../../styles/inserts'
import { Redirect, withRouter } from 'react-router'

const CreateClientInfo = props => {
  if (props.redirect) {
    return <Redirect to="/" />
  }

  var userRole = JSON.parse(localStorage.getItem('user')).ref_id_role

  return (
    <InsertFormDiv>
      {props.clientInfo.hasOwnProperty('id_client') ? (
        <div className="cards-container form-container">
          <div className="form-title">
            <h4 className="widget-title">
              {props.title}
              {props.clientInfo.name_client}
            </h4>
          </div>
          <form onSubmit={props.editClientInfo}>
            {userRole === 0 && (
              <>
                <div className="grid33-33-33 form-grid">
                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Link cPanel</legend>
                        <input
                          type="text"
                          onChange={props.changeCpanelLinkInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit'
                              ? props.cpanelLinkInput || ''
                              : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Username cPanel</legend>
                        <input
                          type="text"
                          onChange={props.changeCpanelUserInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit'
                              ? props.cpanelUserInput || ''
                              : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Password cPanel</legend>
                        <input
                          type="text"
                          onChange={props.changeCpanelPassInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit'
                              ? props.cpanelPassInput || ''
                              : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="grid33-33-33 form-grid mt10">
                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Link WordPress</legend>
                        <input
                          type="text"
                          onChange={props.changeWpLinkInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit' ? props.wpLinkInput || '' : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Username WordPress</legend>
                        <input
                          type="text"
                          onChange={props.changeWpUserInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit' ? props.wpUserInput || '' : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Password WordPress</legend>
                        <input
                          type="text"
                          onChange={props.changeWpPassInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit' ? props.wpPassInput || '' : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="grid50-50 form-grid mt10">
                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>NicHandle DNS</legend>
                        <input
                          type="text"
                          onChange={props.changeDnsNicInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit' ? props.dnsNicInput || '' : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Password DNS</legend>
                        <input
                          type="text"
                          onChange={props.changeDnsPassInput}
                          placeholder="Escrever"
                          value={
                            props.type === 'edit'
                              ? props.dnsPassInput || ''
                              : ''
                          }
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid50-50 form-grid mt10">
              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Google Username</legend>
                    <input
                      type="text"
                      onChange={props.changeGoogleUserInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit' ? props.googleUserInput || '' : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Google Password</legend>
                    <input
                      type="text"
                      onChange={props.changeGooglePassInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit' ? props.googlePassInput || '' : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="grid50-50 form-grid mt10">
              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Facebook Username</legend>
                    <input
                      type="text"
                      onChange={props.changeFacebookUserInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit'
                          ? props.facebookUserInput || ''
                          : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Facebook Password</legend>
                    <input
                      type="text"
                      onChange={props.changeFacebookPassInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit'
                          ? props.facebookPassInput || ''
                          : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="grid50-50 form-grid mt10">
              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Instagram Username | E-mail</legend>
                    <input
                      type="text"
                      onChange={props.changeInstagramUserInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit'
                          ? props.instagramUserInput || ''
                          : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>

              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Instagram Password</legend>
                    <input
                      type="text"
                      onChange={props.changeInstagramPassInput}
                      placeholder="Escrever"
                      value={
                        props.type === 'edit'
                          ? props.instagramPassInput || ''
                          : ''
                      }
                    />
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="grid33-33-33 form-grid mt10">
              <div className="grid-item">
                <div className="input-wrapper">
                  <fieldset>
                    <legend>Outros Marketing</legend>
                    <textarea
                      id="outros-marketing"
                      onChange={props.changeOthersMarketingInput}
                      placeholder="exemplo de conta - password,"
                      value={
                        props.type === 'edit'
                          ? props.othersMarketingInput || ''
                          : ''
                      }
                    ></textarea>
                  </fieldset>
                </div>
              </div>

              {userRole === 0 && (
                <>
                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Emails</legend>
                        <textarea
                          onChange={props.changeEmailsInput}
                          placeholder="ex@exemplo.pt - password,"
                          value={
                            props.type === 'edit' ? props.emailsInput || '' : ''
                          }
                        ></textarea>
                      </fieldset>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="input-wrapper">
                      <fieldset>
                        <legend>Outros</legend>
                        <textarea
                          onChange={props.changeOthersInput}
                          placeholder="exemplo de conta - password,"
                          value={
                            props.type === 'edit' ? props.othersInput || '' : ''
                          }
                        ></textarea>
                      </fieldset>
                    </div>
                  </div>
                </>
              )}
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
      ) : (
        <img src="/img/loading.svg" alt="Loading" className="loading-spinner" />
      )}
    </InsertFormDiv>
  )
}

export default withRouter(CreateClientInfo)
