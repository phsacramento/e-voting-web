import React, { Component }                                 from 'react';

// Services
import ResourcesService                                     from '../../../lib/api/ResourcesService';

// Components
import FormInput                                            from '../../../components/Common/FormInput';
import LoadingSpinner                                       from '../../../components/Common/LoadingSpinner';
import Alert                                                from 'react-s-alert';
import Select                                               from 'react-select';

// Assets
import 'react-select/dist/react-select.css';

// Helpers
import {formRequestSuccess, formRequestError, requestError} from '../../../helpers/Utils';

class CandidateDetail extends Component {

  state = {
    candidate: {name: '', last_name: '', public_name: '', role_id: '', role: { value: '', label: ''}},
    formErrors: {},
    roles: [],
    disableSubmit: false,
    submittingForm: false,
    loaded: false,
    selectedOption: ''
  }

  mode = null; 
  rolesServ = new ResourcesService('roles');
  service   = new ResourcesService('candidates', 'candidate');

  goBack = (evt) => {
    if(!!evt)
      evt.preventDefault();
    window.location.href="/dashboard/candidatos/";
  }

  handleChange = (selectedOption) => {

    const candidate         = this.state.candidate;
    
    if (typeof selectedOption != 'undefined' && selectedOption) {
      candidate["role"]       = selectedOption;
      candidate["role_id"]    = selectedOption.value;
      console.log(`Selected: ${selectedOption.label}`);
    }

    

    this.setState({candidate: candidate});
    
    
  }




  /// Input Handlers
  handleInputChange = (evt) => {
    const field         = evt.target.name;
    const candidate   = this.state.candidate;
    candidate[field]  = evt.target.value;
    return this.setState({candidate: candidate});
  }
  //////////////////

  handleDestroy = (evt) => {
    evt.preventDefault();
    this.service.destroy(this.props.params.id).then(response => {
      formRequestSuccess(response, 'Item removido com sucesso');
      this.goBack();
    }).catch(err => {
      requestError(err, "Erro. Não foi possível remover esse item!");
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const method = this.mode === 'edit' ? 'put' : 'post';

    this.service[method](this.state.candidate).then(candidate => {
      this.setState({ disableSubmit: true })
      formRequestSuccess();
      console.log(this.state)
    }).catch(err => {
      formRequestError(err, this);
    })
  }

  loadRoles = (page = 1, query = null) => {
    this.rolesServ.load(page, query).then(response => {
      this.setState({
        roles: response.roles,
        loaded: true
      });
      
    }).catch(error => {
      Alert.error(`<p>${error}</p>`, {
          position: 'top',
          effect: 'stackslide',
          beep: false,
          timeout: 5000
      });
    });
  };

  componentWillMount() {
    if(!!this.props.params.id){ // We're editing a role
      this.mode = 'edit';
        
      this.service.get(this.props.params.id).then(candidate => {
        this.setState({
          candidate: candidate,
          loaded: true
        })
      }).catch(error => {
          requestError(error);
      });
    } else {
      this.mode = 'create';
    }
      
    this.loadRoles(); 
    
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
                <strong>Candidatos</strong> <small>Formulário</small>
                {this.mode === 'edit' && <button className="btn btn-danger btn-right" onClick={this.handleDestroy}>Remover</button>}
              </div>
              <div className="card-block">

                <form onSubmit={this.handleSubmit}>
                  <FormInput state_obj={this.state} attr_name="name" attr_label="Nome" resource_name="candidate" change_handler={this.handleInputChange.bind(this)} placeholder="ex: João"/>
                  <FormInput state_obj={this.state} attr_name="last_name" attr_label="Sobrenome" resource_name="candidate" change_handler={this.handleInputChange.bind(this)} placeholder="ex: Silva"/>
                  <FormInput state_obj={this.state} attr_name="public_name" attr_label="Nome Público" resource_name="candidate" change_handler={this.handleInputChange.bind(this)} placeholder="ex: João do Povo"/>
                  
                  <div className={"form-group" + (this.state.formErrors.role_id ? 'has-danger has-feedback' : '') }>
                    <label htmlFor="role_id">Cargo</label>

                    <Select
                      name="role_id"
                      value={this.state.candidate.role.value}
                      onChange={this.handleChange.bind(this)}
                      options={this.state.roles}
                    />
                    
                  </div>

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

export default CandidateDetail
