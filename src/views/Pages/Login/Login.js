import React, { Component }                           from 'react';
import TextInput                                      from '../../../components/Common/TextInput';
import {bindActionCreators}                           from 'redux';
import {connect}                                      from 'react-redux';
import * as sessionActions                            from '../../../actions/sessionActions';
import Alert                                          from 'react-s-alert';

class Login extends Component {

  state = {
    credentials: {
      login: '',
      password: ''
    }
  };

  showTempMessage = (msg) => {
    this.setState({message: msg});
    setTimeout(() => this.setState({message: ''}), 2500);
  };

  handleEmptySubmit = (evt) =>{
    evt.preventDefault();
    this.setState({
      errorMessage: 'Todos os campos são obrigatórios'
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.actions.loginUser(this.state.credentials)
      .then()
      .catch(error => {
        Alert.error(`<p>${error}</p>`, {
            position: 'top',
            effect: 'stackslide',
            beep: false,
            timeout: 2000
        });
      });
  };

  handleInputChange = (evt) => {
    const field         = evt.target.name;
    const credentials   = this.state.credentials;
    credentials[field]  = evt.target.value;
    credentials[field] = evt.target.value;
    return this.setState({credentials: credentials});
  };

  render() {
    const submitHandler = this.state.credentials.login && this.state.credentials.password ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-2">
                <div className="card-block">
                  <h1>Login</h1>
                  <form onSubmit={submitHandler}>
                    {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
                    <p className="text-muted">Acesse sua conta</p>
                    <div className="input-group mb-1">
                      <span className="input-group-addon"><i className="icon-user"></i></span>

                      <TextInput
                        name="login"
                        type="text"
                        placeholder="Usuário"
                        value={this.state.credentials.login}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>

                      <TextInput
                        name="password"
                        type="password"
                        placeholder="Senha"
                        value={this.state.credentials.password}
                        onChange={this.handleInputChange}
                      />

                    </div>
                    <div className="row">
                      <div className="col-6">
                        <input
                        type="submit"
                        className="btn btn-primary px-2"
                        value="Login"/>
                        {" "}
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Esqueceu a senha?</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card card-inverse card-primary py-3 hidden-md-down" style={{ width: 44 + '%' }}>
                <div className="card-block text-center">
                  <div>
                    <h2>Cadastro</h2>
                    <p>Para realizar um cadastro clique aqui.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(Login);
