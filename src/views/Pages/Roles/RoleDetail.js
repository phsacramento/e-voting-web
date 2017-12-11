import React, { Component }                                 from 'react';

// Services
import ResourcesService                                     from '../../../lib/api/ResourcesService';

// Components
import FormInput                                            from '../../../components/Common/FormInput';
import LoadingSpinner                                       from '../../../components/Common/LoadingSpinner';

// Helpers
import {formRequestSuccess, formRequestError, requestError} from '../../../helpers/Utils';

class RoleDetail extends Component {

  state = {
    role: {title: ''},
    formErrors: {},
    large: false,
    disableSubmit: false,
    submittingForm: false,
    loaded: false
  }

  mode = null; 
  serv = new ResourcesService('roles', 'role');

  goBack = (evt) => {
    if(!!evt)
      evt.preventDefault();
    window.location.href="/dashboard/cargos/";
  }



  /// Input Handlers
  handleInputChange = (evt) => {
    const field         = evt.target.name;
    const role   = this.state.role;
    role[field]  = evt.target.value;
    return this.setState({role: role});
  }
  //////////////////

  handleDestroy = (evt) => {
    evt.preventDefault();
    this.serv.destroy(this.props.params.id).then(response => {
      formRequestSuccess('Item removido com sucesso');
      this.goBack();
    }).catch(err => {
      requestError(err, "Erro. Não foi possível remover esse item!");
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const method = this.mode === 'edit' ? 'put' : 'post';

    this.serv[method](this.state.role).then(role => {
      this.setState({ disableSubmit: true })
      formRequestSuccess();
    }).catch(err => {
      formRequestError(err, this);
    })
  }

  componentWillMount() {
    if(!!this.props.params.id){ // We're editing a role
      this.mode = 'edit';
      this.serv.get(this.props.params.id).then(role => {
        this.setState({
          role: role,
          loaded: true
        })
      }).catch(error => {
          requestError(error);
        });
    } else
      this.mode = 'create';
  }

  render() {
    return (
      <div>{this.mode === 'edit' && !this.state.loaded ? <LoadingSpinner/> : this.viewToRender()}</div>
    )
  }

  viewToRender() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12 col-lg-12">

            <div className="card">
              <div className="card-header">
                <strong>Cargo</strong> <small>Formulário</small>
                {this.mode === 'edit' && <button className="btn btn-danger btn-right" onClick={this.handleDestroy}>Remover</button>}
              </div>
              <div className="card-block">

                <form onSubmit={this.handleSubmit}>
                  <FormInput state_obj={this.state} attr_name="title" attr_label="Título" resource_name="role" change_handler={this.handleInputChange.bind(this)} placeholder="ex: Presidente"/>
 
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={this.state.disableSubmit}>Salvar</button>&nbsp;
                    <button type="button" className="btn btn-default" onClick={this.goBack}>Voltar</button>&nbsp;
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }

}

export default RoleDetail
