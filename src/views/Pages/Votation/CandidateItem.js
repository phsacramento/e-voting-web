import React                                                from 'react';
import PropTypes                                            from 'prop-types';
import { Link }                                             from 'react-router';
import ResourcesService                                     from '../../../lib/api/ResourcesService';
import {formRequestSuccess, formRequestError, requestError} from '../../../helpers/Utils';
import {Constants}                                          from '../../../constants';
import Alert                                                from 'react-s-alert';

// Assets
import 'react-select/dist/react-select.css';


export const CandidateItem = (props) => {
  
  const serv = new ResourcesService('votes', 'vote');

  const method = "post"

  const vote = {
    vote: {
      role_id: props.role_id,
      candidate_id: props.id
    }
  }

  const handleSubmit = (evt) => {
    
    serv[method](vote).then(vote => {
      const msg = 'Voto computado com sucesso!';

      Alert.success(`<p>${msg}</p>`, {
          position: 'top',
          effect: 'stackslide',
          beep: false,
          timeout: 2000
      });
      
      setTimeout(function() { window.location.href="/dashboard"; }, 1000);
  
      
      
    }).catch(err => {

      Alert.error(`<p>${err[0].message}</p>`, {
          position: 'top',
          effect: 'stackslide',
          beep: false,
          timeout: 5000
      });
    })
  }

  return (

    <div className="col-md-4" id={props.role_id}>
      <div className="card">
        <div className="card-header">
          {props.public_name} 
        </div>
        <div className="card-block">
          <button type="button" onClick={handleSubmit} className="btn btn-primary">Votar</button>
          <br/>
          <br/>
          Quantidade de votos: <strong>{ props.votes_count }</strong>
        </div>
      </div>
    </div>
  )
}

CandidateItem.propTypes = {
  public_name: PropTypes.string,
  id: PropTypes.number.isRequired
}
