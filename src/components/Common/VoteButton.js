import React                                  from 'react';
import PropTypes                              from 'prop-types';
import axios 																	from 'axios';
import {Constants}                            from '../../constants';
import {append}                               from '../../helpers/Utils';
import Profile                                from '../../lib/api/Profile';
import Alert                                  from 'react-s-alert';

// Assets
import 'react-select/dist/react-select.css';

// Helpers
import {formRequestSuccess, formRequestError, requestError} from '../../helpers/Utils';

const networkErrorMsg = "Falha na comunicação com o servidor: você está conectado à Internet?";

const apiUrl = `${Constants.SERVER_URL}/${Constants.API_URL}`;

const VoteButton = ({candidate_id, is_voted_by_current_userm, role_id}) => {

	let user_id = null;

	Profile.getUser(sessionStorage.jwt).then(currentUser => {
		user_id = currentUser.id;
	  sessionStorage.user_id = currentUser.id;
	});

	axios.get(`${apiUrl}`+ '/votes/check/', {
    params: {
      role_id: role_id,
      user_id: user_id
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

	const handleSubmit = (evt) => {
		axios.post(`${apiUrl}`+ '/votes', {
	    candidate_id: candidate_id,
	    user_id:  user_id
	  })
	  .then(function (response) {
	    formRequestSuccess('Voto computado com sucesso!');
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	}

	const button = (
		
  	 <button type="button" onClick={handleSubmit} className="btn btn-primary">Votar</button>
  	
	)

  return (
    <div>
    	
    </div>
  );
};

VoteButton.propTypes = {
  // candidate: PropTypes.object.isRequired
};

export default VoteButton;

